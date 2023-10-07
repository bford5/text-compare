"use client";

import { FC, FormEvent, useState } from "react";
import { toast } from "@/ui/toastNotification.cmp";
import { createApiKey } from "@/helpers/createApiKey";
import { Key } from "lucide-react";
import Heading from "@/ui/heading.cmp";
import Paragraph from "@/ui/paragraph.cmp";
import CopyBtn from "@/components/CopyBtn";
import { Input } from "@/ui/input.cmp";
import Button from "@/ui/btn.cmp";

interface RequestApiKeyProps {}

const RequestApiKey: FC<RequestApiKeyProps> = () => {
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const [apiKey, setApiKey] = useState<string | null>(null);

	const generateNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsCreating(true);

		try {
			const generatedApiKey = await createApiKey();
			setApiKey(generatedApiKey);
		} catch (err) {
			if (err instanceof Error) {
				toast({
					title: "Error",
					message: err.message,
					type: "error",
				});
				return;
			}
			toast({
				title: "Error",
				message: "something caused an error",
				type: "error",
			});
		} finally {
			setIsCreating(false);
		}
	};

	return (
		<div className='container md:max-w-2xl mx-auto px-4'>
			<div className='flex flex-col gap-6 items-center'>
				<Key className='mx-auto h-12 w-12 text-gray-400' />
				<Heading size='lg'>Request API key</Heading>
				<Paragraph>No API key requested yet</Paragraph>
			</div>

			<form
				onSubmit={generateNewApiKey}
				className='mt-6 sm:flex sm:items-center'
			>
				<div className='relative rounded-md shadow-md sm:min-w-0 sm:flex-1'>
					{apiKey ? (
						<>
							<CopyBtn
								type='button'
								valueToCopy={apiKey}
								className='absolute inset-y-0 right-0 animate-in fade-in duration-300'
							/>
						</>
					) : null}
					<Input
						readOnly
						value={apiKey ?? ""}
						placeholder='Request an API key to display here'
					/>
				</div>
				<div className='mt-3 flex justify-center sm:mt-1 sm:ml-4 sm:flex-shrink-0'>
					<Button disabled={!!apiKey} isLoading={isCreating}>
						Request Key
					</Button>
					{/* using ! on apiKey converts string to bool, then adding 2nd ! inverts it */}
					{/* apiKey="string" + ! = true -> !!apiKey = false  */}
				</div>
			</form>
		</div>
	);
};

export default RequestApiKey;
