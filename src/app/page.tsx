// eslint-disable
"use client";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { useState } from "react";

export type UploadResult = {
  info: {
    public_id: string;
    // eslint-disable-next-line
    [key: string]: any;
  };
};

export default function Home() {
  const [imageId, setImageid] = useState("");
  return (
    <main className="flex flex-col items-center justify-items-center p-5">
      <CldUploadButton
      // eslint-disable-next-line
        onUploadAdded={(result: any) => {
          setImageid(result.info.public_id);
        }}
        uploadPreset="az_pr09"
      />
      {imageId && (
        <CldImage
          width="400"
          height="400"
          src={imageId}
          sizes="100vw"
          alt="Description of the image"
        />
      )}
    </main>
  );
}
