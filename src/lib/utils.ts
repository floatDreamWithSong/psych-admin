import { env } from "@/env";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createAxiosInstance } from "./request";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const tokenKey = "token";
export const tokenStore = {
	get: () => {
		return localStorage.getItem(tokenKey);
	},
	set: (token: string) => {
		localStorage.setItem(tokenKey, token);
	},
	remove: () => {
		localStorage.removeItem(tokenKey);
	},
};

export const axiosClient = createAxiosInstance({
	baseURL: env.VITE_API_BASE_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
	onTokenGet: tokenStore.get,
	onTokenRemove: tokenStore.remove,
});
