"use client";

import { FC, useState } from "react";
import Button from "@/ui/btn.cmp";
import { signIn } from "next-auth/react";
import { toast } from "@/ui/toastNotification.cmp";

interface SignInBtnProps {}

const SignInBtn: FC<SignInBtnProps> = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const signInWithGoogle = async () => {
		try {
			setIsLoading(true);
			await signIn("google");
		} catch (error) {
			toast({
				title: "Error with login",
				message: "please try again",
				type: "error",
			});
		}

		// BELOW FOR TESTING
		// try {
		// 	toast({
		// 		title: "Error with login",
		// 		message: "please try again",
		// 		type: "error",
		// 	});
		// } catch (error) {
		// 	await signIn("google");
		// }
	};

	return (
		<Button onClick={signInWithGoogle} isLoading={isLoading}>
			Sign In
		</Button>
	);
};

export default SignInBtn;
