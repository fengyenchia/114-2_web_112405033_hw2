"use client"
import { useState } from "react";
import { usePsyStore } from "@/store/store";
import { useRouter } from "next/navigation";

import ActionButton from '@/component/ActionButton';




export default function Result() {
  const router = useRouter();
  const [isBlurred, setIsBlurred] = useState(true);

  const psyData = usePsyStore((state) => state.psyData);
  const finalData = usePsyStore((state) => state.finalData);
  // const score = psyData.score;
  // const setPsyScore = usePsyStore((state) => state.setScore);
  const resetPsy = usePsyStore((state) => state.reset);


  // 計算 RGB 平均值並顯示
  const colorSum = psyData.colorSum || [0,0,0];
  const questionCount = psyData.quizData ? psyData.quizData.length : 5;
  const avgR = Math.round((colorSum[0] || 0) / questionCount);
  const avgG = Math.round((colorSum[1] || 0) / questionCount);
  const avgB = Math.round((colorSum[2] || 0) / questionCount);
  const toHex = (v: number) => v.toString(16).padStart(2, '0');
  const hex = `#${toHex(avgR)}${toHex(avgG)}${toHex(avgB)}`.toUpperCase();


  function playAgain(){
    resetPsy();
    router.push("/");
  }


  return (
    <> 
      <div className="flex flex-col justify-center items-center overflow-hidden">

        <div className="mainTitle flex mb-3 justify-center">你的靈魂色票是</div>
        
        <div className="custom-scrollbar max-w-xl w-full rounded-xl overflow-y-scroll bg-white/20">
          <div className="p-6 flex">
            <div>
              {(() => {
                const isPurple = Math.abs(avgR - avgB) < 20 && Math.abs(avgR - avgG) > 40 && Math.abs(avgB - avgG) > 40;
                // const avg = Math.round((avgR + avgG + avgB) / 3);
                // const isPurple = Math.abs(avg - avgR) < 40 && Math.abs(avg - avgG) < 40 && Math.abs(avg - avgB) < 40;
                let typeKey = '';
                if (isPurple) typeKey = 'purple';
                else if (avgB >= avgR && avgB >= avgG) typeKey = 'blue';
                else if (avgG >= avgR && avgG >= avgB) typeKey = 'green';
                else typeKey = 'red';
                
                type Soul = { title: string; intro: string; analysis: { label: string; text: string }[]; tags: string[] };
                const data = finalData as Record<string, Soul>;
                const payload = data[typeKey];
                
                return (
                  <>
                  <div className="flex flex-col gap-4">
                    <h1 className="mainTitle text-gray-700! flex justify-center">{payload.title}</h1>
                      <p className="text-gray-700 text-sm leading-relaxed">{payload.intro}</p>
                      
                      <div className="">
                        <div className="font-semibold text-gray-800">深度分析</div>

                        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
             
                          <ul className="mt-2 list-none list-inside text-sm text-gray-700 space-y-3">
                            {payload.analysis.map((a, i) => (
                              <li key={i}><span className="font-medium"><b>{a.label}：</b></span>{a.text}</li>
                            ))}
                          </ul>


                          {/* 色票 */}
                          <button
                            onClick={() => setIsBlurred((current) => !current)}
                            className={`w-full h-8 md:w-24 md:h-32 text-white text-xs italic font-mono flex items-center justify-center cursor-pointer select-none transition-all duration-500 ${isBlurred ? "blur-xs" : "blur-none"}`}
                            style={{ backgroundColor: hex }}
                          >
                            {hex}
                          </button>
                        </div>
                        
                        {/* 標籤 */}
                        <div className="w-full mt-4 flex gap-4 flex-wrap justify-center md:justify-start">
                          {payload.tags.map((t: string, i: number) => (
                            <span key={i} className="text-xs bg-white/50 px-4 py-1 text-gray-700 border border-gray-700">{t}</span>
                          ))}
                        </div>

                      </div>

                    </div>
                  </>
                );
              })()}

            </div>

          </div>
        </div>

        <div className="mt-4 w-full mx-auto flex gap-4 justify-evenly">
          <ActionButton text="分享我的靈魂色彩" onClick={playAgain} />
          <ActionButton text="再測一次" onClick={playAgain} />
        </div>

      </div>
    </>
  );
}
