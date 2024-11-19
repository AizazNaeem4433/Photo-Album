"use server";
import cloudinary from "cloudinary";
import { SearchResult } from "./page";

export async function addImageToAlbum(image: SearchResult, albumName: string) {
  console.log(`Adding image ${image.id} to album ${albumName}`);
  // Implement your logic here (e.g., API calls or database updates)
}

export async function setAsFavoriteAction(
  publicId: string,
  isFavorite: boolean
) {
  if (isFavorite) {
    await cloudinary.v2.uploader.add_tag("favorite", [publicId]);
  } else {
    await cloudinary.v2.uploader.remove_tag("favorite", [publicId]);
  }
}