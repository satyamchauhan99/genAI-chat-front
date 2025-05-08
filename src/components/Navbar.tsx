"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/upload", label: "Upload" },
  { href: "/documents", label: "Documents" },
  { href: "/ask", label: "Ask" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-700 text-white px-6 py-3 shadow">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <Link href="/" className="text-xl font-semibold">
          DocAI
        </Link>
        <div className="flex gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:underline ${
                pathname === item.href ? "font-bold underline" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
