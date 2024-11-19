"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchForm({ initialSearch }: { initialSearch: string }) {
  const [tagName, setTagName] = useState(initialSearch ?? "");
  const router = useRouter();

  useEffect(() => {
    if (tagName !== initialSearch) {
      setTagName(initialSearch);
    }
  }, [initialSearch, tagName]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (tagName.trim() === "") return; // Prevent empty searches
        router.replace(`/gallery?search=${encodeURIComponent(tagName)}`);
        router.refresh();
      }}
      className="flex flex-col gap-3"
    >
      <Label htmlFor="tag-name" className="text-right font-medium">
        Search by Tag
      </Label>
      <div className="flex gap-2 items-center">
        <Input
          id="tag-name"
          value={tagName}
          onChange={(e) => setTagName(e.currentTarget.value)}
          aria-label="Enter tag to search"
          placeholder="Enter tag (e.g., 'nature', 'food')"
          className="flex-1"
        />
        <Button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Search
        </Button>
      </div>
    </form>
  );
}
