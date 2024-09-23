import React, { cache, use } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { sort } from "fast-sort";
import { dehydrate, QueryClient, HydrationBoundary } from "@tanstack/react-query";

interface User {
	id: number;
	name: string;
	email: string;
}

interface Props {
	sortOrder: string;
}

export default async function UserTable({ sortOrder }: Props) {

	const result = await fetch("http://localhost:3000/api/users", {cache: 'no-cache'});

	const users: User[] = await result.json();

	const sortedUsers = sort(users).asc(
		sortOrder === "email" ? (user) => user.email : (user) => user.name
	);

	return (
		<Table>
			<TableCaption>A list of users.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>
						<Link href="/users?sortOrder=name">Name</Link>
					</TableHead>
					<TableHead>
						<Link href="/users?sortOrder=email">Email</Link>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{sortedUsers.map((user) => (
					<TableRow key={user.id}>
						<TableCell>{user.name ?? 'N/A'}</TableCell>
						<TableCell>{user.email}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
