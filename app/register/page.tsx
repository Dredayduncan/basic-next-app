"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const schema = z.object({
	email: z.string().email("Invalid email address"),
	name: z.string().min(1, "Name must be at least 1 character long"),
	password: z.string().min(5, "Password must be at least 5 characters long"),
});

type FormData = z.infer<typeof schema>;

const registerUser = async (data: FormData) => {
	const response = await fetch("/api/register", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.detail || "Registration failed");
	}

	return response.json();
};

export default function RegisterPage() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const mutation = useMutation({
		mutationFn: registerUser,
		onError: (error) => {
			console.error("Registration error:", error);
		},
	});

	const onSubmit = (data: FormData) => {
		mutation.mutate(data);
	};

	useEffect(() => {
		if (mutation.isSuccess) {
			const timer = setTimeout(() => {
				router.push("/api/auth/signin");
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, [mutation.isSuccess]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-full max-w-md space-y-8 rounded-xl bg-white p-4 shadow-md">
				<h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
					Create Your Account
				</h2>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col space-y-4 rounded-md shadow-sm">
						<div>
							<Input
								id="name"
								type="text"
								{...register("name")}
								// className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Name"
							/>

							{errors.name && (
								<p className="mt-2 text-sm text-red-600">
									{errors.name.message}
								</p>
							)}
						</div>
						<div>
							<Input
								id="email"
								type="email"
								{...register("email")}
								// className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
							/>

							{errors.email && (
								<p className="mt-2 text-sm text-red-600">
									{errors.email.message}
								</p>
							)}
						</div>
						<div>
							<Input
								id="password"
								type="password"
								{...register("password")}
								// className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
							/>
							{errors.password && (
								<p className="mt-2 text-sm text-red-600">
									{errors.password.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<Button
							type="submit"
							disabled={mutation.isPending}
							className="w-full"
						>
							{mutation.isPending ? "Registering..." : "Register"}
						</Button>
					</div>
				</form>

				{mutation.isError && (
					<Alert variant="destructive">
						<AlertDescription>{mutation.error.message}</AlertDescription>
					</Alert>
				)}

				{mutation.isSuccess && (
					<Alert>
						<AlertDescription>
							Registration successful! Redirecting to login page...
						</AlertDescription>
					</Alert>
				)}
			</div>
		</div>
	);
}
