import { z } from "zod";
import { methodsHelper } from "@/lib/apiMiddlewares/methodsHelper";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { RevokeApiData } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<RevokeApiData>
) => {
	try {
		const user = await getServerSession(req, res, authOptions).then(
			(res) => res?.user
		);

		if (!user) {
			return res.status(401).json({
				error: "not authorized",
				success: false,
			});
		}

		const validApiKey = await db.apiKey.findFirst({
			where: { userId: user.id, enabled: true },
		});
		if (!validApiKey) {
			return res.status(500).json({
				error: "api key could not be revoked",
				success: false,
			});
		}

		await db.apiKey.update({
			where: { id: validApiKey.id },
			data: {
				enabled: false,
			},
		});

		return res.status(200).json({
			error: null,
			success: true,
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({ error: error.issues, success: false });
		}
		return res
			.status(500)
			.json({ error: "internal server error", success: false });
	}
};

export default methodsHelper(["POST"], handler);
