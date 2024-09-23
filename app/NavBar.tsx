"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
	HomeIcon,
	BoxIcon,
	UserIcon,
	XIcon,
	MenuIcon,
	UserCog,
	File,
	LogIn,
	UserCircle,
	LogOutIcon,
	UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function NavBar() {
	const router = usePathname();

	const [isOpen, setIsOpen] = useState(false);
	const [activeItem, setActiveItem] = useState(router.split('/')[1].toLowerCase());
	const [isMobile, setIsMobile] = useState(false);

	const { status, data: session } = useSession();

	const toggleSidebar = () => setIsOpen(!isOpen);

	const menuItems = [
		{ name: "Home", icon: HomeIcon, url: "/" },
		{ name: "Users", icon: UserIcon, url: "/users" },
		{ name: "Products", icon: BoxIcon, url: "/products" },
		{ name: "File Upload", icon: File, url: "/file_upload" },
		// { name: "Admin", icon: UserCog, url: '/admin' },
	];

	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 768);
			if (window.innerWidth >= 768) {
				setIsOpen(true);
			} else {
				setIsOpen(false);
			}
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);

		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	return (
		<div>
			<Button
				variant="outline"
				size="icon"
				className={cn(
					"absolute top-2 z-50 transition-all duration-300 ease-in-out",
					isOpen ? "left-[216px]" : "left-4"
				)}
				onClick={toggleSidebar}
			>
				{isOpen ? (
					<XIcon className="h-4 w-4" />
				) : (
					<MenuIcon className="h-4 w-4" />
				)}
			</Button>
			<div
				className={cn(
					"h-screen transform transition-all duration-300 ease-in-out",
					isOpen ? "translate-x-0 w-64" : "-translate-x-full"
				)}
			>
				<div className={`${!isOpen && 'hidden'} flex h-full flex-col bg-background`}>
					<div className="flex h-14 items-center border-b px-3">
						<h2 className="text-lg font-semibold">Menu</h2>
					</div>

					<div className="flex flex-col justify-between h-full">
						<div>
							{menuItems.map((item) => (
								<Link key={item.name} href={item.url}>
									<Button
										variant={activeItem === item.name.toLowerCase() ? "secondary" : "ghost"}
										className="w-full justify-start"
										onClick={() => setActiveItem(item.name.toLowerCase())}
									>
										<item.icon className="mr-2 h-4 w-4" />
										{item.name}
									</Button>
								</Link>
							))}
						</div>
						{status === "authenticated" ? (
							<div className="pb-4">
								<Link key={session?.user?.name ?? 'N/A'} href="">
									<Button
										variant={
											activeItem === (session?.user?.name ?? 'N/A')
												? "secondary"
												: "ghost"
										}
										className="w-full justify-start"
										onClick={() => setActiveItem(session.user?.name ?? 'N/A')}
									>
										<UserCircle className="mr-2 h-4 w-4" />
										{session?.user?.name ?? 'N/A'}
									</Button>
								</Link>

								<Link key="Logout" href="/api/auth/signout">
									<Button
										variant={"ghost"}
										className="w-full justify-start text-red-600"
										onClick={() => setActiveItem("logout")}
									>
										<LogOutIcon className="mr-2 h-4 w-4" />
										Logout
									</Button>
								</Link>
							</div>
						) : (
							<div className="pb-4">
							<Link key="Login" href="/api/auth/signin">
								<Button
									variant={activeItem === "login" ? "secondary" : "ghost"}
									className="w-full justify-start"
									onClick={() => setActiveItem("login")}
								>
									<UserCog className="mr-2 h-4 w-4" />
									Login
								</Button>
							</Link>

							<Link key="Register" href="/register">
								<Button
									variant={activeItem === "register" ? "secondary" : "ghost"}
									className="w-full justify-start"
									onClick={() => setActiveItem("register")}
								>
									<UserPlus className="mr-2 h-4 w-4" />
									Create new account
								</Button>
							</Link>
						</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
