import UploadButton from "./upload-button";
import cloudinary from "cloudinary";
import GalleryGrid from "./gallery-grid";
import { SearchForm } from "./search-form";

export type SearchResult = {
  id: any;
  public_id: string;
  tags: string[];
};

export default async function GalleryPage({
  searchParams: initialSearchParams,
}: {
  searchParams: { search?: string };
}) {
  // Await dynamic async access to searchParams
  const searchParams = await Promise.resolve(initialSearchParams);
  const searchQuery = searchParams?.search || ""; // Safely access searchQuery

  // Configure Cloudinary
  cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    // Fetch results from Cloudinary
    const results = (await cloudinary.v2.search
      .expression(
        `resource_type:image${searchQuery ? ` AND tags=${searchQuery}` : ""}`
      )
      .sort_by("created_at", "desc")
      .with_field("tags")
      .max_results(30)
      .execute()) as { resources: SearchResult[] };

    return (
      <section>
        <div className="flex flex-col gap-8">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold text-gray-800">Gallery</h1>
            <UploadButton />
          </div>

          {/* Search Form */}
          <SearchForm initialSearch={searchQuery} />
          <GalleryGrid images={results.resources} />
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return (
      <section className="container mx-auto p-4">
        <p className="text-red-600">Error loading gallery. Please try again later.</p>
      </section>
    );
  }
}
