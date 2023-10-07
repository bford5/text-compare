"use client";

import { ButtonHTMLAttributes, FC } from "react";
import Button from "./ui/btn.cmp";
import { Copy } from "lucide-react";
import { toast } from "@/ui/toastNotification.cmp";

interface CopyBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	valueToCopy: string;
}

const CopyBtn: FC<CopyBtnProps> = ({ className, valueToCopy, ...props }) => {
	return (
		<Button
			{...props}
			onClick={() => {
				navigator.clipboard.writeText(valueToCopy);
				toast({
					title: "Copied!",
					message: "Content copied to clipboard",
					type: "success",
				});
			}}
			variant='ghost'
			className={className}
		>
			<Copy className='h-5 w-5' />
		</Button>
	);
};

export default CopyBtn;
