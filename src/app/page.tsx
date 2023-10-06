// import Image from "next/image";
import Paragraph from "@/ui/paragraph.cmp";
import Heading from "@/ui/heading.cmp";

export default function Home() {
	return (
		<main className='container mx-auto p-24'>
			<section className='py-24 w-full'>
				<div>
					<Heading className='py-2 mt-4'>Sample Header</Heading>
					<Paragraph className='pb-5 py-2'>
						Sample paragraph words blah blah
					</Paragraph>
				</div>
				<div>
					<Heading className='py-2 mt-4'>Sample Header</Heading>
					<Paragraph className='pb-5 py-2'>
						Sample paragraph words blah blah
					</Paragraph>
				</div>
			</section>
		</main>
	);
}
