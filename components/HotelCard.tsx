import Image from "next/image";
import type { HotelDTO } from "@/lib/types";

export default function HotelCard({ hotel }: { hotel: HotelDTO }) {
  return (
    <a
      href={hotel.driveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg md:flex-row"
    >
      <div className="relative h-40 w-full md:h-36 md:w-1/4">
        <Image
          src={hotel.coverImageUrl}
          alt={hotel.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-3 p-5">
        <div>
          <h3 className="font-display text-xl text-gray-900">{hotel.name}</h3>
          <p className="mt-2 text-sm text-gray-600">
            Galeria e plote me foto dhe detaje
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 transition group-hover:border-brand group-hover:text-brand">
          Me shume
        </span>
      </div>
    </a>
  );
}
