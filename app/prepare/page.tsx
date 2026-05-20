"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import ActionButton from '@/component/ActionButton';
import {Label, ProgressBar} from "@heroui/react";

export default function Prepare() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/result");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>      
    <div className="flex flex-col justify-center items-center gap-4">

<div className="mainTitle">正在調配你的靈魂色票...</div>
      <ProgressBar isIndeterminate className="w-full max-w-xs">
        {/* <Label>正在調配你的靈魂色票...</Label> */}
        <ProgressBar.Track className="bg-[#fcf8fb]">
        <ProgressBar.Fill className="bg-[#f8ddf3]"/>
        </ProgressBar.Track>
      </ProgressBar>

      {/* <ActionButton text="正在調配你的靈魂色票..." href="/result" /> */}

    </div>
    </>
  );
}
