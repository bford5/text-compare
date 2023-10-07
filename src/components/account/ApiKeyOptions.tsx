"use client";

import { FC, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/ui/dropDownMenu.cmp";
import Button from "@/ui/btn.cmp";
import { Loader2 } from "lucide-react";
import { toast } from "@/ui/toastNotification.cmp";
// import { type } from "os";
import { useRouter } from "next/navigation";
import { createApiKey } from "@/helpers/createApiKey";
import { revokeApiKey } from "@/helpers/revokeApiKey";

interface ApiKeyOptionsProps {
	apiKeyId: string;
	apiKeyValue: string;
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apiKeyId, apiKeyValue }) => {
	const router = useRouter();
	const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
	const [isRevokingKey, setIsRevokingKey] = useState<boolean>(false);

	const createNewApiKey = async () => {
		setIsCreatingNew(true);

		try {
			await revokeApiKey({ keyId: apiKeyId });
			await createApiKey();
			router.refresh();
		} catch (error) {
			toast({
				title: "error creating api key",
				message: "please try again",
				type: "error",
			});
		} finally {
			setIsCreatingNew(false);
		}
	};

	const revokeCurrentApiKey = async () => {
		setIsRevokingKey(true);
		try {
			await revokeApiKey({ keyId: apiKeyId });
			// await createApiKey();
			router.refresh;
		} catch (error) {
			toast({
				title: "error revoking api key",
				message: "please try again",
				type: "error",
			});
		} finally {
			setIsRevokingKey(false);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger disabled={isCreatingNew || isRevokingKey}>
				<p
					// variant='ghost'
					className='flex p-2 rounded-md gap-2 items-center dark:bg-slate-700 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent transition-all text-sm'
				>
					<p>
						{isCreatingNew
							? "Creating new key"
							: isRevokingKey
							? "Revoking key"
							: "Options"}
						{/* ^^ done for ease despite not 'technically' being a best practice */}
					</p>
					{isCreatingNew || isRevokingKey ? (
						<Loader2 className='animate-spin h-4 w-4' />
					) : null}
				</p>
				{/* NOTE: the above <p> was a <Button> but it caused a hydration error, converting to a <p> removed issue ;; could also implement hydration middleware? */}
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					onClick={() => {
						navigator.clipboard.writeText(apiKeyValue);
						toast({
							title: "Copied!",
							message: "Content copied to clipboard",
							type: "success",
						});
					}}
				>
					Copy
				</DropdownMenuItem>
				<DropdownMenuItem onClick={createNewApiKey}>
					Create new key
				</DropdownMenuItem>
				<DropdownMenuItem onClick={revokeCurrentApiKey}>
					Revoke api key
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ApiKeyOptions;
