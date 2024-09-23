import ImageGrid from "./ImageGrid";
import FileUploadButton from "./UploadButton";

import { Suspense } from "react";

export default async function FileUploadPage() {
	

	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<ImageGrid  />
			</Suspense>
			<FileUploadButton />
		</div>
	);
}
