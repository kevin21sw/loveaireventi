import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { hotelSchema } from "@/lib/validation";
import { uploadImage } from "@/lib/upload";

export const runtime = "nodejs";

export async function GET() {
  const hotels = await prisma.hotel.findMany({
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(hotels);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  if (!(coverImage instanceof File) || coverImage.size === 0) {
    return NextResponse.json({ error: "Cover image required" }, { status: 400 });
  }

  const coverImageUrl = await uploadImage(coverImage);
  const hotel = await prisma.hotel.create({
    data: {
      ...parsed.data,
      coverImageUrl
    }
  });

  return NextResponse.json(hotel);
}
