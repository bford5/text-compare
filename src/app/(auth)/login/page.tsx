import Icons from "@/components/Icons";
import UserLoginForm from "@/components/UserLoginForm";
import { buttonVariants } from "@/components/ui/btn.cmp";
import Heading from "@/components/ui/heading.cmp";
import Paragraph from "@/components/ui/paragraph.cmp";
import Link from "next/link";
// import { FC } from "react";

const page = () => {
	return (
		<div className='container mx-auto absolute inset-0 flex h-screen flex-col items-center justify-center'>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 max-w-lg'>
				<div className='flex flex-col items-center gap-6 text-center'>
					<Link
						className={buttonVariants({
							variant: "ghost",
							className: "w-fit",
						})}
						href={"/"}
					>
						<Icons.ChevronLeft className='mr-2 h-4 w-4' />
						Back home
					</Link>

					<Heading>Welcome!</Heading>
					<Paragraph>Sign in using Google.</Paragraph>
					<UserLoginForm />
				</div>
			</div>
		</div>
	);
};

export default page;
