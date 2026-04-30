"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Result() {


  return (
    <> 
      <div className="flex flex-col justify-center items-center gap-4">
        <div>結果</div>
        <Link href="/" className="text-white font-bold bg-gray-400 px-3 py-2 rounded-md">再玩一次</Link>
      </div>
    </>
  );
}
