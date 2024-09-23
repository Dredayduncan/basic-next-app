"use client";

import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
	error: Error;
	reset: () => void;
}

export default function ErrorPage({ error, reset }: Props) {
	console.log(error);
	
	return (
		<div>
			<h1>An unexpected error occurred.</h1>
			<Button onClick={reset}>Try again</Button>
		</div>
	);
}
