"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-6 py-6 text-center text-xs text-gray-500 md:px-12 lg:px-20">
        <span>Loveair 2026. All right reserved</span>
      </div>
    </footer>
  );
}
