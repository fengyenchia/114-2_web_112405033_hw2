"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {

  return (
    <>

    <div className="flex flex-col justify-center items-center gap-4">
      <div>歡迎</div>
      <Link href="/question" className="text-white font-bold bg-gray-400 px-3 py-2 rounded-md">START</Link>
    </div>

    </>
  );
}
