import { RevokeApiData } from "@/types/api";

export async function revokeApiKey({ keyId }: { keyId: string }) {
	const res = await fetch("/api/apiKey/revoke", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ keyId }),
	});

	const data = (await res.json()) as { error?: string };
	// ^^ inline typing the (await...) to cast as an optional error of type string ;; avoids ts-linter where (...) is cast as type:any
	if (data.error) {
		throw new Error(data.error);
	}
}
