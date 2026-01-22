import { notFound } from "next/navigation";
import DestinationClient from "@/components/DestinationClient";
import { getDestinationBySlug } from "@/lib/destinations";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DestinationPage({
  params
}: {
  params: { slug: string };
}) {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) {
    notFound();
  }

  const hotels = await prisma.hotel.findMany({
    where: { destination: destination.enum },
    orderBy: { name: "asc" }
  });
  const hotelDtos = hotels.map((hotel) => ({
    ...hotel,
    createdAt: hotel.createdAt.toISOString(),
    updatedAt: hotel.updatedAt.toISOString()
  }));

  return (
    <section className="px-6 py-12 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            Hotele Ekskluzive
          </p>
          <h1 className="mt-3 font-display text-3xl text-gray-900 md:text-4xl">
            {destination.label}
          </h1>
        </header>
        <DestinationClient
          hotels={hotelDtos}
          destinationLabel={destination.label}
        />
      </div>
    </section>
  );
}
