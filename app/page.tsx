"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <main>
      <div className="h-screen w-full flex justify-center items-center bg-gray-950">
        <button
          onClick={() => router.push("/api/webhook")}
          className="bg-gray-700 text-white p-3 rounded-lg"
        >
          Make Payment
        </button>
      </div>
    </main>
  );
};

export default Home;
