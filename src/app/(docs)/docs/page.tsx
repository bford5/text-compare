import { FC } from "react";
import type { Metadata } from "next";
import Heading from "@/ui/heading.cmp";
import Paragraph from "@/ui/paragraph.cmp";
import DocTabs from "@/components/DocTabs";

export const metadata: Metadata = {
	title: "text-compare API | Docs",
	description:
		"Documentation page for text-compare, the open source and free-use text comparison API",
};

const DocumentationPage: FC = () => {
	return (
		<section>
			<div className='container max-w-7xl mx-auto mt-12 pt-16'>
				<div className='flex flex-col items-center gap-6'>
					<Heading>Making a request</Heading>
					<Paragraph>api/v1/text-compare-api</Paragraph>
					<DocTabs />
				</div>
			</div>
		</section>
	);
};

export default DocumentationPage;
