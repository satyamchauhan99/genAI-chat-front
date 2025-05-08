"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-700">
          Welcome to DocAI
        </h1>
        <p className="text-gray-700 mb-8 text-lg">
          Upload your documents and ask questions powered by AI. Secure, simple, and smart.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="border border-blue-600 text-blue-600 hover:bg-blue-100 font-semibold px-6 py-2 rounded-md"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
