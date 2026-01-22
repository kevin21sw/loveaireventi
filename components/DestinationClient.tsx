"use client";

import { useMemo, useState } from "react";
import HotelCard from "@/components/HotelCard";
import type { HotelDTO } from "@/lib/types";

export default function DestinationClient({
  hotels,
  destinationLabel
}: {
  hotels: HotelDTO[];
  destinationLabel: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return hotels;
    }
    const lower = query.toLowerCase();
    return hotels.filter((hotel) => hotel.name.toLowerCase().includes(lower));
  }, [hotels, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-sm font-medium text-gray-700">
          Kerko hotel
          <input
            aria-label="Kerko hotel"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Kerko ne ${destinationLabel}`}
            className="mt-2 w-full rounded-full border border-gray-200 px-4 py-2 text-sm focus:border-brand focus:outline-none sm:w-72"
          />
        </label>
        <span className="text-xs text-gray-500">
          {filtered.length} hotele te disponueshme
        </span>
      </div>
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
          Nuk ka hotele per kete destinacion. Provo nje tjeter.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}
