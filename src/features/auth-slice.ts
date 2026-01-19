import { User } from "@/auth";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand/react";

interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	login: (user: User) => Promise<void>;
	logout: () => void;
	isHydrated: boolean;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			isAuthenticated: false,
			user: null,
			isHydrated: false,
			login: async (user: User) => {
				set({ isAuthenticated: true, user, isHydrated: true });
			},
			logout: () =>
				set({ isAuthenticated: false, user: null, isHydrated: true }),
		}),
		{
			name: "auth",
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: () => (state) => {
				state.isHydrated = true;
				return state;
			},
		},
	),
);
