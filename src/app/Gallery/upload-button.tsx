"use client";

import { CldUploadButton } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UploadButton() {
  const router = useRouter();

  return (
    <Button asChild>
      <CldUploadButton
        onUploadAdded={(result) => {
          if (typeof result.info === "object" && result.info?.public_id) {
            console.log("Uploaded file public_id:", result.info.public_id);
            setTimeout(() => {
              router.refresh();
            }, 2000);
          } else {
            console.error("Upload result does not contain valid info or public_id.");
          }
        }}
        uploadPreset="giomsr4s"
      >
        <div className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </div>
      </CldUploadButton>
    </Button>
  );
}
