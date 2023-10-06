"use client";

import { FC, useState } from "react";
import { signOut } from "next-auth/react";
import Button from "@/ui/btn.cmp";
import { toast } from "@/ui/toastNotification.cmp";

interface SignOutBtnProps {}

const SignOutBtn: FC<SignOutBtnProps> = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const signOutFromAcc = async () => {
		setIsLoading(true);

		try {
			await signOut();
		} catch (error) {
			toast({
				title: "Error with logout",
				message: "please try again",
				type: "error",
			});
		}
	};

	return (
		<Button onClick={signOutFromAcc} isLoading={isLoading}>
			Sign Out
		</Button>
	);
};

export default SignOutBtn;
