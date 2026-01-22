export const destinations = [
  {
    slug: "antalya",
    label: "Antalya",
    enum: "ANTALYA",
    gradient: "from-orange-50 via-white to-orange-100",
    image: "/uploads/antalya.jpg"
  },
  {
    slug: "bodrum",
    label: "Bodrum",
    enum: "BODRUM",
    gradient: "from-emerald-50 via-white to-emerald-100",
    image: "/uploads/bodrum.avif"
  },
  {
    slug: "fethiye",
    label: "Fethiye",
    enum: "FETHIYE",
    gradient: "from-sky-50 via-white to-sky-100",
    image: "/uploads/fethiye.jpg"
  },
  {
    slug: "crete",
    label: "Crete",
    enum: "CRETE",
    gradient: "from-amber-50 via-white to-amber-100",
    image: "/uploads/crete.webp"
  }
];

export function getDestinationBySlug(slug: string) {
  return destinations.find((item) => item.slug === slug);
}
