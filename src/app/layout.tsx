import { classNameHelper } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toastNotification.cmp";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			className={classNameHelper(
				"bg-white text-slate-900 antialiased",
				inter.className
			)}
		>
			<body className='min-h-screen bg-slate-50 dark:bg-slate-800'>
				<Providers>
					<Navbar />
					<main>{children}</main>
					<Toaster position='bottom-center' />
					{/* <Footer /> */}
				</Providers>

				{/* allow for more height on mobile */}
				<div className='h-50 md:hidden' />
			</body>
		</html>
	);
}
/*
  bg-[#101010] text-[#d5d5d5f3]
*/
