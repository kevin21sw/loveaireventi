import AdminHotelForm from "@/components/AdminHotelForm";

export default function NewHotelPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl text-gray-900">Hotel i ri</h1>
      <p className="mt-2 text-sm text-gray-600">
        Ploteso te dhenat dhe ruaj hotelin e ri.
      </p>
      <AdminHotelForm mode="create" />
    </div>
  );
}
