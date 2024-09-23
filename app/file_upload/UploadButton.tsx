"use client";

import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { UTApi } from "uploadthing/server";

export default async function FileUploadButton() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
          router.refresh();

        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
