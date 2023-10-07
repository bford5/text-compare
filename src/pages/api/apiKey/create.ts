import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { CreateApiData } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import { z } from "zod";
import { methodsHelper } from "@/lib/apiMiddlewares/methodsHelper";

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<CreateApiData>
) => {
	try {
		const user = await getServerSession(req, res, authOptions).then(
			(res) => res?.user
		);

		if (!user) {
			return res.status(401).json({
				error: "not authorized to make request",
				createdApiKey: null,
			});
		}

		const existingApiKey = await db.apiKey.findFirst({
			where: { userId: user.id, enabled: true },
		});

		if (existingApiKey) {
			return res.status(400).json({
				error: "api key already generated for user",
				createdApiKey: null,
			});
		}

		const createdApiKey = await db.apiKey.create({
			data: {
				userId: user.id,
				key: nanoid(),
			},
		});

		return res.status(200).json({ error: null, createdApiKey });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({ error: error.issues, createdApiKey: null });
		}

		return res
			.status(500)
			.json({ error: "Generic Server Error", createdApiKey: null });
	}
};

// export default handler;
// below using middleware helper
export default methodsHelper(["GET"], handler);
