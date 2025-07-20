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

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export const formatCurrency = (value: string): string => {
  const numericValue = value.replace(/[^0-9.]/g, "")
  const parts = numericValue.split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return parts.join(".")
}


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