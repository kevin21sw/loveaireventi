import Link from "next/link";
import prisma from "@/lib/prisma";
import AdminHotelsTable from "@/components/AdminHotelsTable";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const hotels = await prisma.hotel.findMany({
    orderBy: { createdAt: "desc" }
  });
  const hotelDtos = hotels.map((hotel) => ({
    ...hotel,
    destination: hotel.destination as "ANTALYA" | "BODRUM" | "FETHIYE" | "CRETE",
    createdAt: hotel.createdAt.toISOString(),
    updatedAt: hotel.updatedAt.toISOString()
  }));

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-gray-900">Paneli Admin</h1>
          <p className="mt-2 text-sm text-gray-600">
            Menaxho hotelet per cdo destinacion.
          </p>
        </div>
        <Link
          href="/admin/hotels/new"
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Shto hotel
        </Link>
      </div>
      <AdminHotelsTable hotels={hotelDtos} />
    </div>
  );
}
