"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { destinations } from "@/lib/destinations";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname === "/") {
    return null;
  }

  return (
    <nav className="border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <Link href="/" className="flex items-center">
          <Image
            src="/uploads/loveair.png"
            alt="Loveair"
            width={140}
            height={60}
            className="h-auto w-28 sm:w-32"
            priority
          />
        </Link>
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 sm:text-sm md:flex-nowrap md:gap-4">
          {destinations.map((destination) => (
            <Link
              key={destination.slug}
              href={`/destinacioni/${destination.slug}`}
              className="hover:text-gray-900"
            >
              {destination.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
