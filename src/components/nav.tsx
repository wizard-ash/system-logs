"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/config";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-wrap gap-x-3 sm:gap-x-6 gap-y-2 text-xs sm:text-sm">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <li key={link.href} className="relative group">
              <Link
                href={link.href}
                className={`transition-colors duration-150 ${
                  isActive
                    ? "text-terminal-red text-glow-red"
                    : "text-terminal-cyan hover:text-terminal-green"
                }`}
              >
                [{link.label}]
              </Link>
              <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 bg-black/95 border border-terminal-green/30 text-terminal-green/60 text-[0.65rem] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                {link.hint}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
