import { FC } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "text-compare API | Dashboard",
	description:
		"Account dashboard for text-compare, the open source and free-use text comparison API",
};

const page: FC = () => {
	return (
		<div>
			<h2>DASHBOARD</h2>
		</div>
	);
};

export default page;
