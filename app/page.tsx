"use client"
import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import ActionButton from '@/component/ActionButton';
// import Emoticons from '@/component/Emoticons';

export default function Home() {

  return (
    <>

    <div className="flex flex-col h-full justify-center items-center gap-4">
        <p className="mainTitle animate-keyup">尋找你的靈魂色票</p>
        {/* picture */}
            <div className="relative aspect-video w-full overflow-hidden rounded-sm">
              <Image
                src="/images/0.png"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="bg"
                fill
                loading="eager"
                className="h-full w-full object-cover object-center"
              />
            </div>
          <p className="animate-keyup w-full max-w-md text-center text-gray-700 text-sm md:text-md leading-relaxed">
              世界過於紛擾，讓原本純粹的色彩漸漸失焦<br></br>
              現在請閉上眼，感受意識正凝聚成一道光<br></br>
              你即將進入神秘之境，進入一場關於自我的探索活動<br></br>
              在這裡不需思考太多，只需聽從當下直覺<br></br>
              隨著你每一個決定，靈魂色彩會逐漸交會、成形<br></br>
              當光芒到達終點的那一刻——專屬於你的靈魂色票，就此誕生
          </p>

        {/* <Emoticons 
          faceIndex={0}>
            123
        </Emoticons> */}

        <ActionButton text="進入神秘之境" href="/question" />

    </div>

    </>
  );
}
