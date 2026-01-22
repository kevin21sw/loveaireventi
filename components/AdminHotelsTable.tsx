"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import type { HotelDTO } from "@/lib/types";

export default function AdminHotelsTable({ hotels }: { hotels: HotelDTO[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Doni ta fshini kete hotel?");
    if (!ok) return;

    const response = await fetch(`/api/hotels/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-5 py-4">Destinacioni</th>
            <th className="px-5 py-4">Hotel</th>
            <th className="px-5 py-4">Krijuar</th>
            <th className="px-5 py-4 text-right">Veprime</th>
          </tr>
        </thead>
        <tbody>
          {hotels.length === 0 ? (
            <tr>
              <td className="px-5 py-6 text-sm text-gray-500" colSpan={4}>
                Nuk ka hotele ende.
              </td>
            </tr>
          ) : (
            hotels.map((hotel) => (
              <tr key={hotel.id} className="border-t border-gray-100">
                <td className="px-5 py-4 text-gray-600">{hotel.destination}</td>
                <td className="px-5 py-4 font-medium text-gray-900">
                  {hotel.name}
                </td>
                <td className="px-5 py-4 text-gray-600">
                  {new Date(hotel.createdAt).toLocaleDateString("sq-AL")}
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/hotels/${hotel.id}/edit`}
                      className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                    >
                      Ndrysho
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(hotel.id)}
                      className="text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      Fshi
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
