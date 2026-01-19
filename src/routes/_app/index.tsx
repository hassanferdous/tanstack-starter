import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { Rocket, Shield, Zap } from "lucide-react";

export const Route = createFileRoute("/_app/")({
	head: () => ({
		meta: [
			{
				title: "TanStack Router Starter - Home",
			},
			{
				name: "description",
				content:
					"A modern starter template using TanStack Router and Shadcn UI",
			},
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.ico",
			},
		],
	}),
	loader: async () => {
		return {
			title: "Home",
		};
	},
	component: Home,
});

function Home() {
	return (
		<div className="flex min-h-[calc(100vh-4rem)] flex-col">
			<section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
				<div className="container flex max-w-5xl flex-col items-center gap-4 text-center mx-auto">
					<a
						href="https://twitter.com/tan_stack"
						className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium hover:bg-muted/80 transition-colors"
						target="_blank"
						rel="noreferrer">
						Follow along on Twitter
					</a>
					<h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
						TanStack Router Starter
					</h1>
					<p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
						A powerful, type-safe router for your React applications.
						Built with performance and developer experience in mind.
					</p>
					<div className="space-x-4">
						<Button size="lg" asChild>
							<Link to="/posts">Get Started</Link>
						</Button>
						<Button variant="outline" size="lg" asChild>
							<a
								href="https://tanstack.com/router/latest/docs/framework/react/overview"
								target="_blank"
								rel="noreferrer">
								Documentation
							</a>
						</Button>
					</div>
				</div>
			</section>
			<section
				id="features"
				className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 mx-auto">
				<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
					<h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
						Features
					</h2>
					<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
						This starter includes everything you need to build a modern
						web application.
					</p>
				</div>
				<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-5xl md:grid-cols-3">
					<Card>
						<CardHeader>
							<Zap className="h-10 w-10 mb-2 text-orange-500" />
							<CardTitle>Fast & Light</CardTitle>
							<CardDescription>
								Optimized for speed and minimal bundle size.
							</CardDescription>
						</CardHeader>
						<CardContent>
							Zero-config optimizations to keep your app running
							smoothly.
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<Shield className="h-10 w-10 mb-2 text-green-500" />
							<CardTitle>Type Safe</CardTitle>
							<CardDescription>
								Built with TypeScript for robust type safety.
							</CardDescription>
						</CardHeader>
						<CardContent>
							Catch errors at compile time with full type inference.
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<Rocket className="h-10 w-10 mb-2 text-blue-500" />
							<CardTitle>Modern Stack</CardTitle>
							<CardDescription>
								Uses the latest React features and patterns.
							</CardDescription>
						</CardHeader>
						<CardContent>
							Ready for the future of web development.
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	);
}
