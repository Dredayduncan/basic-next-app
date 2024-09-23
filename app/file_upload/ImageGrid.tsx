import { utapi } from "@/server/uploadthing";
import React from "react";
import Image from "next/image";

export default async function ImageGrid() {
	const uploadedFiles = await utapi.listFiles();

	return (
		<div className="grid grid-cols-3 gap-4">
			{uploadedFiles.files.map((image, index) => (
				<div key={index} className="relative h-[200px]">
					<Image
						src={`https://utfs.io/f/${image.key}`}
						alt={image.name}
						fill
						className="object-cover"
					/>
				</div>
			))}
		</div>
	);
}
