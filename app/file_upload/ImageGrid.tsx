import { utapi } from "@/server/uploadthing";
import React from "react";
import Image from "next/image";

export default async function ImageGrid() {
	const uploadedFiles = await utapi.listFiles();
	return (
		<div className="grid grid-cols-3 gap-4">
			{uploadedFiles.files.map((image, index) => (
				<div key={index} className="relative aspect-square">
					<Image
						src={`https://utfs.io/f/${image.key}`}
						alt={image.name}
						width={200}
						height={200}
						objectFit="cover"
					/>
				</div>
			))}
		</div>
	);
}
