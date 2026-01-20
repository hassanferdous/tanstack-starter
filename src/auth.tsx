// src/auth.tsx
import { createContext, useContext } from "react";
import { useAuthStore } from "./features/auth-slice";

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
	signin: (user: User) => void;
	signout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { user, isAuthenticated, login, logout } = useAuthStore();
	const hasRole = (role: string) => {
		return user?.roles?.includes(role) ?? false;
	};
	const hasAnyRole = (roles: string[]) => {
		return roles.some((role) => user?.roles.includes(role)) ?? false;
	};

	const hasPermission = (permission: string) => {
		return user?.permissions?.includes(permission) ?? false;
	};

	const hasAnyPermission = (permissions: string[]) => {
		return (
			permissions.some((permission) =>
				user?.permissions.includes(permission),
			) ?? false
		);
	};

	const handleLogin = (user: User) => {
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
