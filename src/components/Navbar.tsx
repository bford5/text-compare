import { getServerSession } from "next-auth";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "@/ui/btn.cmp";
import SignInBtn from "@/components/SignInBtn";
import SignOutBtn from "@/components/SignOutBtn";
import ThemeToggle from "./ThemeToggleBtn";
import { authOptions } from "@/lib/auth";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async () => {
	const session = await getServerSession(authOptions);
	return (
		<header className='fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between'>
			<div className='container max-w-7xl mx-auto w-full flex justify-between items-center'>
				<div className='ml-2'>
					<Link href='/' className={buttonVariants({ variant: "link" })}>
						text-compare
					</Link>
				</div>
				<div className='md:hidden mr-4'>
					<ThemeToggle />
				</div>
				<nav className='hidden md:flex gap-4 mr-2'>
					<ThemeToggle />
					<Link href='/docs' className={buttonVariants({ variant: "ghost" })}>
						Docs
					</Link>
					{session ? (
						<>
							<Link
								className={buttonVariants({ variant: "ghost" })}
								href='/dashboard'
							>
								Dashboard
							</Link>
							<SignOutBtn />
						</>
					) : (
						<SignInBtn />
					)}
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
