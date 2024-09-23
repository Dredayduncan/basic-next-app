import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/authOptions";

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<main className="flex w-full min-h-screen flex-col items-center justify-between">
			<h1>Hello {session && <span>{session.user?.name}</span>}</h1>
		</main>
	);
}
