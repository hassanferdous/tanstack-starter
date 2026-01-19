import { Header } from "@/components/layout/header";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
	component: AppLayoutComponent,
});

export default function AppLayoutComponent() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}
