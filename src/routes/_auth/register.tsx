import { createFileRoute, Link, redirect } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Route = createFileRoute("/_auth/register")({
	head: () => ({
		meta: [
			{
				title: "Register",
			},
			{
				name: "description",
				content: "Register to your account",
			},
		],
	}),
	validateSearch: (search: { redirect?: string }) => search,
	beforeLoad: ({ context, search }) => {
		// Redirect if already authenticated
		if (context.auth.isAuthenticated) {
			throw redirect({ to: search.redirect || "/admin" });
		}
	},
	component: RegisterComponent,
});

function RegisterComponent({ ...props }: React.ComponentProps<typeof Card>) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Registration logic here
	};

	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<Card className="w-full max-w-lg" {...props}>
				<CardHeader>
					<CardTitle>Create an account</CardTitle>
					<CardDescription>
						Enter your information below to create your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="name">Full Name</FieldLabel>
								<Input
									id="name"
									type="text"
									placeholder="John Doe"
									required
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
								/>
								<FieldDescription>
									We&apos;ll use this to contact you. We will not share
									your email with anyone else.
								</FieldDescription>
							</Field>
							<Field>
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<Input id="password" type="password" required />
								<FieldDescription>
									Must be at least 8 characters long.
								</FieldDescription>
							</Field>
							<Field>
								<FieldLabel htmlFor="confirm-password">
									Confirm Password
								</FieldLabel>
								<Input id="confirm-password" type="password" required />
								<FieldDescription>
									Please confirm your password.
								</FieldDescription>
							</Field>
							<FieldGroup>
								<Field>
									<Button type="submit">Create Account</Button>
									<Button variant="outline" type="button">
										Sign up with Google
									</Button>
									<FieldDescription className="px-6 text-center">
										Already have an account?{" "}
										<Link to="/login">Sign in</Link>
									</FieldDescription>
								</Field>
							</FieldGroup>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
