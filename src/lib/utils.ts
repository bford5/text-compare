import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function classNameHelper(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/*

    used with tailwind-merge dep to take inputs like:
        "py-2 mb-1 px-2 mt-3" -> "p-2 mb-1 mt-3"

*/
