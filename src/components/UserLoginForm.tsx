"use client";

import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { classNameHelper } from "@/lib/utils";
import Button from "@/ui/btn.cmp";
import { toast } from "@/ui/toastNotification.cmp";

const UserLoginForm: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const loginWithGoogle = async () => {
		setIsLoading(true);

		try {
			await signIn("google");
		} catch (error) {
			toast({
				title: "error",
				message: "error with logging in",
				type: "error",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={classNameHelper("flex justify-center")}>
			<Button
				isLoading={isLoading}
				className='max-w-sm w-full'
				onClick={loginWithGoogle}
			>
				Login w/ Google
				{/* {isLoading ? null : <p>Login with Google</p>} */}
			</Button>
		</div>
	);
};

export default UserLoginForm;
