import { createFileRoute, Link, redirect } from "@tanstack/react-router";

import FormFields from "@/components/form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const schema = yup.object({
	name: yup.string().min(3).required(),
	email: yup.string().email().required(),
	password: yup.string().min(6).required(),
	confirmPassword: yup
		.string()
		.min(6)
		.oneOf([yup.ref("password")], "Passwords must match")
		.required(),
});

type Schema = yup.InferType<typeof schema>;

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
	const form = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: "admin",
			email: "admin@gmail.com",
			password: "admin@1234",
			confirmPassword: "admin@1234",
		},
	});

	const mutation = useMutation({
		mutationFn: (values: Schema) => {
			return axiosInstance.post("/auth/register", values);
		},
		onError: (error) => {
			const { response } = error as AxiosError<any>;
			const errors = response?.data?.data?.errors as {
				field: keyof Schema;
				message: string;
			}[];
			if (!errors) return;
			errors.forEach((error) => {
				form.setError(error.field, {
					message: error.message,
				});
			});
		},
		onSuccess: () => {
			form.reset();
		},
	});

	const handleSubmit = (values: Schema) => {
		mutation.mutate(values);
	};

	const error = mutation.error as AxiosError<any>;

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
					<FormProvider {...form}>
						<form onSubmit={form.handleSubmit(handleSubmit)}>
							<FieldGroup className="gap-y-4">
								<FormFields.TextInput
									name="name"
									label="Name"
									type="text"
									placeholder="John Doe"
									required
								/>
								<FormFields.TextInput
									name="email"
									label="Email"
									type="email"
									placeholder="m@example.com"
									required
								/>
								<FormFields.TextInput
									name="password"
									label="Password"
									type="password"
									placeholder="********"
									required
								/>
								<FormFields.TextInput
									name="confirmPassword"
									label="Confirm Password"
									type="password"
									placeholder="********"
									description="Please confirm your password."
									required
								/>
								{error && error?.status !== 401 && (
									<Alert variant="destructive">
										<AlertCircleIcon />
										<AlertTitle>
											{error?.response?.data?.message}
										</AlertTitle>
									</Alert>
								)}
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
					</FormProvider>
				</CardContent>
			</Card>
		</div>
	);
}
