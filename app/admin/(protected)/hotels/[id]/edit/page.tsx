import { notFound } from "next/navigation";
import AdminHotelForm from "@/components/AdminHotelForm";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditHotelPage({
  params
}: {
  params: { id: string };
}) {
  const hotel = await prisma.hotel.findUnique({
    where: { id: params.id }
  });

  if (!hotel) {
    notFound();
  }

  const initialData = {
    id: hotel.id,
    name: hotel.name,
    destination: hotel.destination,
    driveUrl: hotel.driveUrl,
    coverImageUrl: hotel.coverImageUrl
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl text-gray-900">Ndrysho hotel</h1>
      <p className="mt-2 text-sm text-gray-600">
        Perditeso detajet e hotelit.
      </p>
      <AdminHotelForm
        mode="edit"
        hotelId={hotel.id}
        initialData={initialData}
      />
    </div>
  );
}
