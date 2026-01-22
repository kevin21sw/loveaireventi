import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { hotelSchema } from "@/lib/validation";
import { uploadImage } from "@/lib/upload";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.hotel.findUnique({
    where: { id: params.id }
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const formData = await request.formData();
  const name = String(formData.get("name") || "");
  const driveUrl = String(formData.get("driveUrl") || "");
  const destination = String(formData.get("destination") || "");
  const coverImage = formData.get("coverImage");

  const parsed = hotelSchema.safeParse({ name, driveUrl, destination });
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  let coverImageUrl = existing.coverImageUrl;
  if (coverImage instanceof File && coverImage.size > 0) {
    coverImageUrl = await uploadImage(coverImage);
  }

  const hotel = await prisma.hotel.update({
    where: { id: params.id },
    data: {
      ...parsed.data,
      coverImageUrl
    }
  });

  return NextResponse.json(hotel);
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.hotel.delete({
    where: { id: params.id }
  });

  return NextResponse.json({ ok: true });
}
