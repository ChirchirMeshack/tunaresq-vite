import { clsx, type ClassValue } from "clsx"
import { enqueueSnackbar } from "notistack";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const handleErrors = async (error: unknown) => {
	if (error) {
		enqueueSnackbar(error as string, { variant: "error" });
	} else {
		enqueueSnackbar("An unexpected error occurred", { variant: "error" });
	}
};


/**
 * @param STRING | NUMBER
 * @return FORMATTED STRING
 */

export const trimText = (text: string, length: number): string => {
	if (text?.length < length) {
		return text;
	}
	if (typeof text !== "string") {
		return "";
	}

	return text?.slice(0, length) + "...";
};