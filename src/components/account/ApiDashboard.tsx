import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { formatDistance } from "date-fns";
import Heading from "@/ui/heading.cmp";
import Paragraph from "@/ui/paragraph.cmp";
import { Input } from "@/ui/input.cmp";
import Table from "@/components/Table";
import ApiKeyOptions from "./ApiKeyOptions";

const ApiDashboard = async () => {
	const user = await getServerSession(authOptions);
	if (!user) notFound();

	const apiKeys = await db.apiKey.findMany({
		where: { userId: user.user.id },
	});

	const activeApiKey = apiKeys.find((apiKey) => apiKey.enabled);

	if (!activeApiKey) notFound();

	const userRequests = await db.apiRequest.findMany({
		where: {
			apiKeyId: {
				in: apiKeys.map((key) => key.id),
			},
		},
	});

	const serializeFriendlyRequests = userRequests.map((req) => ({
		...req,
		timestamp: formatDistance(new Date(req.timestamp), new Date()),
	}));

	return (
		<div className='container flex flex-col gap-6 px-10 md:px-20 pt-5'>
			{/* <h2>api dashboard component</h2> */}
			<Heading>Hello {user.user.name}</Heading>
			<div className='flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center'>
				<Paragraph>Your API key:</Paragraph>
				<Input className='w-fit truncate' readOnly value={activeApiKey.key} />
				{/* add feat's for createNew, revoke, copyCreatedKey */}
				<ApiKeyOptions
					apiKeyId={activeApiKey.id}
					apiKeyValue={activeApiKey.key}
				/>
			</div>

			<Paragraph className='text-center md:text-left mt-4 mb-4'>
				API Key History:
			</Paragraph>
			<Table userRequests={serializeFriendlyRequests} />
		</div>
	);
};

export default ApiDashboard;
