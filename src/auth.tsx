// src/auth.tsx
import { createContext, useContext, useState } from "react";
import { useAuthStore } from "./features/auth-slice";
import { redirect, useRouter } from "@tanstack/react-router";

export interface User {
	id: string;
	username: string;
	email: string;
	roles: string[];
	permissions: string[];
}

export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	hasRole: (role: string) => boolean;
	hasAnyRole: (roles: string[]) => boolean;
	hasPermission: (permission: string) => boolean;
	hasAnyPermission: (permissions: string[]) => boolean;
	signin: (username: string, password: string) => Promise<void>;
	signout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { user, isAuthenticated, login, logout } = useAuthStore();
	const hasRole = (role: string) => {
		return user?.roles.includes(role) ?? false;
	};
	const hasAnyRole = (roles: string[]) => {
		return roles.some((role) => user?.roles.includes(role)) ?? false;
	};

	const hasPermission = (permission: string) => {
		return user?.permissions.includes(permission) ?? false;
	};

	const hasAnyPermission = (permissions: string[]) => {
		return (
			permissions.some((permission) =>
				user?.permissions.includes(permission),
			) ?? false
		);
	};

	const handleLogin = async (username: string, password: string) => {
		// TODO: implement login
		const user = {
			id: "1",
			username: "admin",
			email: "admin@example.com",
			roles: ["admin"],
			permissions: [
				"user:read",
				"user:write",
				"user:delete",
				"user:manage",
				"posts:read",
				"posts:write",
				"posts:delete",
				"posts:manage",
			],
		};
		login(user);
	};

	const handleLogout = () => {
		logout();
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				hasRole,
				hasAnyRole,
				hasPermission,
				hasAnyPermission,
				signin: handleLogin,
				signout: handleLogout,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
