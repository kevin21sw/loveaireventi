"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { destinations } from "@/lib/destinations";
import type { Destination, HotelFormData } from "@/lib/types";

export default function AdminHotelForm({
  mode,
  hotelId,
  initialData
}: {
  mode: "create" | "edit";
  hotelId?: string;
  initialData?: HotelFormData;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState(initialData?.name ?? "");
  const [driveUrl, setDriveUrl] = useState(initialData?.driveUrl ?? "");
  const [destination, setDestination] = useState<Destination>(
    initialData?.destination ?? "ANTALYA"
  );
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("driveUrl", driveUrl);
    formData.append("destination", destination);
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    const response = await fetch(
      mode === "create" ? "/api/hotels" : `/api/hotels/${hotelId}`,
      {
        method: mode === "create" ? "POST" : "PATCH",
        body: formData
      }
    );

    if (!response.ok) {
      setError("Ka ndodhur nje gabim. Provo perseri.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <form
      className="mt-6 space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <label className="block text-sm font-medium text-gray-700">
        Emri i hotelit
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand focus:outline-none"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Google Drive link
        <input
          value={driveUrl}
          onChange={(event) => setDriveUrl(event.target.value)}
          required
          type="url"
          placeholder="https://drive.google.com/..."
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand focus:outline-none"
        />
      </label>
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-gray-700">
          Destinacioni
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {destinations.map((item) => (
            <label
              key={item.enum}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <input
                type="radio"
                name="destination"
                value={item.enum}
                checked={destination === item.enum}
                onChange={() => setDestination(item.enum)}
              />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block text-sm font-medium text-gray-700">
        Foto cover
        <input
          type="file"
          accept="image/*"
          onChange={(event) =>
            setCoverImage(event.target.files ? event.target.files[0] : null)
          }
          required={mode === "create"}
          className="mt-2 w-full rounded-lg border border-dashed border-gray-200 px-3 py-2 text-sm"
        />
        {mode === "edit" && initialData?.coverImageUrl ? (
          <span className="mt-2 block text-xs text-gray-500">
            Aktualisht: {initialData.coverImageUrl}
          </span>
        ) : null}
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading
          ? "Duke ruajtur..."
          : mode === "create"
          ? "Ruaj hotelin"
          : "Ruaj ndryshimet"}
      </button>
    </form>
  );
}
