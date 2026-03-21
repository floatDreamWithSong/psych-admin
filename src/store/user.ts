import type { UserInfo } from "@/apis/common/type";
import { createStore } from "zustand/vanilla";

export const userStore = createStore<{
	user: UserInfo | null;
	setUser: (user: UserInfo) => void;
	clearUser: () => void;
}>((set) => {
	const userString = localStorage.getItem("user");
	const user = userString ? JSON.parse(userString) : null;
	const store = {
		user,
		setUser: (user: UserInfo) => {
			localStorage.setItem("user", JSON.stringify(user));
			set({ user });
		},
		clearUser: () => {
			localStorage.removeItem("user");
			set({ user: null });
		},
	};
	return store;
});
