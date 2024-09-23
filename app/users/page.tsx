import React, { Suspense } from "react";
import UserTable from "./UserTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
	searchParams: { sortOrder: string }
}

export default async function UsersPage({searchParams : { sortOrder }} : Props) {

	
	return (
		<div>
			<div className="flex justify-between items-center">

			<h1>Users</h1>
			<Link href="/users/new"><Button>New User</Button></Link>

			</div>

			<Suspense fallback={<p>Loading...</p>}>
				<UserTable sortOrder={sortOrder} />
			</Suspense>
			
			
		</div>
	);
}
