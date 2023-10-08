import { cosineSimilarity } from "@/helpers/cosineSimilarity";
import { methodsHelper } from "@/lib/apiMiddlewares/methodsHelper";
import { db } from "@/lib/db";
import openAi from "@/lib/openAi";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const reqSchema = z.object({
	text1: z.string().max(1000),
	text2: z.string().max(1000),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const body = req.body as unknown;

	const apiKey = req.headers.authorization;
	if (!apiKey) {
		return res.status(401).json({ error: "not authorized" });
	}

	// const parsedBodyValues = reqSchema.safeParse(body);
	// if (!parsedBodyValues.success) {
	// 	return res.status(400).json({
	// 		error: "bad request",
	// 	});
	// }

	try {
		// const {data} = parsedBodyValues
		// const {text1, text2} = data
		const { text1, text2 } = reqSchema.parse(body);

		const validApiKey = await db.apiKey.findFirst({
			where: {
				key: apiKey,
				enabled: true,
			},
		});
		if (!validApiKey) {
			return res.status(401).json({ error: "not authorized" });
		}

		const start = new Date();
		const embedding = await Promise.all(
			[text1, text2].map(async (text) => {
				const res = await openAi.embeddings.create({
					model: "text-embedding-ada-002",
					input: text,
				});
				// __
				return res.data.data[0].embedding;
				// ^^ the above works despite error on 2nd .data, JSON ref from openai at bottom of file
			})
		);

		const textCompare = cosineSimilarity(embedding[0], embedding[1]);

		const duration = new Date().getTime() - start.getTime();

		// persist request

		await db.apiRequest.create({
			data: {
				duration,
				method: req.method as string,
				path: req.url as string,
				status: 200,
				apiKeyId: validApiKey.id,
				usedApiKey: validApiKey.key,
			},
		});
		return res.status(200).json({ success: true, text1, text2, textCompare });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({ error: error.issues });
		}
		return res.status(500).json({ error: "generic server error" });
	}
};

export default methodsHelper(["POST"], handler);

// using 'as unknown' forces validation with TS of the req.body w/ reqSchema for ex
// safe parse won't throw error if func fails, instead sets success=false allowing custom handling
// --
// using |const {text1, text2} = reqSchema.parse(body)| instead forces an error that needs to be handled in the catch, instead of a data prop for custom handling

/*

-----OPENAI embeddings.create RESPONSE REFERENCE-----
{
  "object": "list",
  "data": [
    {
      "object": "embedding",
      "embedding": [
        0.0023064255,
        -0.009327292,
        .... (1536 floats total for ada-002)
        -0.0028842222,
      ],
      "index": 0
    }
  ],
  "model": "text-embedding-ada-002",
  "usage": {
    "prompt_tokens": 8,
    "total_tokens": 8
  }
}


*/
