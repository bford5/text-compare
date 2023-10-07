// import { FC } from "react";

import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";

import RequestApiKey from "@/components/account/RequestApiKey";
import ApiDashboard from "@/components/account/ApiDashboard";

export const metadata: Metadata = {
	title: "text-compare API | Dashboard",
	description:
		"Account dashboard for text-compare, the open source and free-use text comparison API",
};

const page = async () => {
	const user = await getServerSession(authOptions);

	if (!user) return redirect("/");

	const apiKey = await db.apiKey.findFirst({
		where: {
			userId: user.user.id,
			enabled: true,
		},
	});

	return (
		<section className='max-w-7xl mx-auto mt-16'>
			<h2>DASHBOARD</h2>
			{apiKey ? <ApiDashboard /> : <RequestApiKey />}
		</section>
	);
};

export default page;
