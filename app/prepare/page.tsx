"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Prepare() {

  return (
    <>      
    <div className="flex flex-col justify-center items-center gap-4">
      <div>準備看結果</div>
      <Link href="/result" className="text-white font-bold bg-gray-400 px-3 py-2 rounded-md">看結果</Link>
    </div>
    </>
  );
}
