// eslint-disable
"use client";

import { SearchResult } from "./page";
import { CloudinaryImage } from "@/components2/cloudinary-image";
export default function GalleryGrid({ images }: { images: SearchResult[] }) {
  const handleUnheart = (image: SearchResult) => {
    console.log(`Unhearted image: ${image.public_id}`);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image) => (
        <CloudinaryImage
          key={image.public_id}
          imagedata={image}
          width="400"
          height="300"
          alt={`Image tagged with ${image.tags.join(", ")}`}
          onUnheart={handleUnheart}
        />
      ))}
    </div>
  );
}
