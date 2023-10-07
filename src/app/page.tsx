import Paragraph from "@/ui/paragraph.cmp";
import Heading from "@/ui/heading.cmp";

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
	title: "text-compare API | Home",
	description: "Open source and free-use text comparison API",
};

export default function Home() {
	return (
		<section className='relative h-screen flex items-center justify-center overflow-x-hidden'>
			<div className='container pt-20 max-w-7xl mx-auto w-full h-full'>
				<div className='h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start'>
					<Heading
						size='lg'
						className='py-2 mt-4 cstmTextEffect text-light-gold dark:text-light-blue'
					>
						Conveniently compare <br /> some text.
					</Heading>
					<Heading size='sm' className='py-2'>
						text-compare
					</Heading>
					<Paragraph className='pb-5 py-2 max-w-xl lg:text-left'>
						Is an easy to use and convenient comparison API, get started with a
						free{" "}
						<Link
							href='/login'
							className='underline underline-offset-2 hover:text-light-blue'
						>
							API key
						</Link>
						! And see our{" "}
						<Link
							href='/docs'
							className='underline underline-offset-2 hover:text-light-blue'
						>
							docs
						</Link>{" "}
						when ready.
					</Paragraph>
					<div className='imgContainer relative mx-auto w-1/2 max-w-lg lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute'>
						<Image
							src='/compare-cstm.png'
							alt='comparison cartoon image'
							priority
							className='image-shadow'
							quality={100}
							style={{ objectFit: "contain" }}
							fill
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

/*

		<section className='container mx-auto p-24'>
			<div className='py-24 w-full'>
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
			</div>
		</section>
*/
