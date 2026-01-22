import Link from "next/link";
import { destinations } from "@/lib/destinations";

export default function HomePage() {
  return (
    <section className="px-4 pb-6 pt-[5dvh] sm:px-6 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-6xl flex-col">
        <div className="min-h-[100dvh] space-y-3 sm:space-y-4">
          {destinations.map((destination) => (
            <Link
              key={destination.slug}
              href={`/destinacioni/${destination.slug}`}
              className="group relative flex h-[22dvh] w-full items-center overflow-hidden rounded-[28px] border border-gray-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.9)), url(${destination.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div className="h-24 w-full sm:h-28 md:h-32" />
              <div className="absolute inset-y-0 right-3 flex items-center sm:right-4">
                <div className="flex items-center gap-6 rounded-[10px] bg-white/95 px-5 py-3 shadow-md backdrop-blur sm:px-6 sm:py-4">
                  <div className="min-w-[120px] sm:min-w-[140px]">
                    <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                      {destination.label}
                    </h2>
                    <p className="text-xs text-gray-600 sm:text-sm">
                      Shiko hotelet
                    </p>
                  </div>
                  <span className="text-2xl text-gray-900">&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center pb-10 pt-12 sm:pt-16">
          <img
            src="/uploads/loveair.png"
            alt="Loveair"
            className="h-auto w-32 sm:w-40"
          />
        </div>
      </div>
    </section>
  );
}
