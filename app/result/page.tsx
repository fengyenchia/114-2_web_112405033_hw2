"use client"
import { useRef, useState } from "react";
import { usePsyStore } from "@/store/store";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas-pro";

import ActionButton from '@/component/ActionButton';




export default function Result() {
  const router = useRouter();
  const [isBlurred, setIsBlurred] = useState(true);
  const [isCapturing, setIsCapturing] = useState(false);
  const resultCardRef = useRef<HTMLDivElement>(null);

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

  async function captureResult() {
  if (!resultCardRef.current || isCapturing) return;

  try {
    setIsCapturing(true);
    await document.fonts.ready;
    const isDesktop = window.innerWidth >= 768;

    const canvas = await html2canvas(resultCardRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      
      // 移除或保持原樣，但重點在下方的 onclone
      onclone: (clonedDocument) => {
        // 1. 找到克隆後的目標卡片
        const clonedCard = clonedDocument.getElementById("result-capture-root");
        if (!clonedCard) return;

        // 2. 強制固定截圖時的寬度，避免文字因寬度縮放而亂換行
        // 建議固定成你理想中的寬度（例如桌機版 576px，或直接依據當前裝置固定）
        const targetWidth = isDesktop ? 500 : window.innerWidth;
        clonedCard.style.width = `${targetWidth}px`;
        clonedCard.style.maxWidth = "none";
      
        // 3. 背景與其他設定
        clonedCard.style.backgroundImage = "url('/images/bg3.png')";
        clonedCard.style.backgroundSize = "cover";
        clonedCard.style.backgroundPosition = "center";
        clonedCard.style.backgroundRepeat = "no-repeat";
        clonedCard.style.backgroundColor = "rgba(255, 255, 255, 0.08)";

        // 4. 精准控制標籤與色票排版（移除 RWD 類別的干擾，改用明確的 style）
        const desktopTags = clonedDocument.querySelector('[data-tags="desktop"]') as HTMLElement | null;
        const mobileTags = clonedDocument.querySelector('[data-tags="mobile"]') as HTMLElement | null;
        
        if (desktopTags && mobileTags) {
          desktopTags.style.display = isDesktop ? "flex" : "none";
          mobileTags.style.display = isDesktop ? "none" : "flex";
        }
      },
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "尋找你的靈魂色票.png";
    link.click();
    } catch (error) {
      console.error("Capture failed:", error);
      alert("截圖失敗，請再試一次。");
    } finally {
      setIsCapturing(false);
    }
  }



  return (
    <> 
      <div className="flex flex-col justify-center items-center overflow-hidden">

        <div className="mainTitle flex mb-3 justify-center text-[24px]!">你的靈魂色票是</div>
        
        <div id="result-capture-root" ref={resultCardRef} className="custom-scrollbar max-w-xl w-full rounded-xl overflow-y-scroll bg-white/20">
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
                      <div className="w-full h-full text-gray-700 text-sm leading-relaxed tracking-wide text-justify">{payload.intro}</div>
                      
                      <div>
                        <div className="font-semibold text-gray-800">深度分析</div>

                        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                          <div className="w-full tracking-wide text-justify">
                            <ul className="mt-2 list-none list-inside text-sm text-gray-700 space-y-3">
                              {payload.analysis.map((a, i) => (
                                <li key={i}><span className="font-bold">{a.label}：</span>{a.text}</li>
                              ))}
                            </ul>
                            {/* 標籤 */}
                            <div data-tags="desktop" className="hidden md:flex w-full mt-4 gap-4 flex-wrap justify-start items-center">
                                {payload.tags.map((t: string, i: number) => (
                                  <span key={i} data-capture-chip="true" className="leading-none flex justify-center items-center text-xs bg-white/50 hover:bg-gray-700 hover:text-white transition-all duration-500 px-3 py-2 text-gray-700 border border-gray-700">{t}</span>
                                ))}
                            </div>
                          </div>

                          
                          <div data-tags="mobile" className="md:hidden w-full flex flex-col gap-2 flex-wrap items-center">
                            {/* 標籤 */}
                            <div data-tags="mobile" className="md:hidden w-full my-2 flex gap-2 flex-wrap justify-between">
                              {payload.tags.map((t: string, i: number) => (
                                  <span key={i} data-capture-chip="true" className="text-xs bg-white/50 hover:bg-black hover:text-white transition-all duration-500 w-[31%] py-1 text-gray-700 text-center border border-gray-700">{t}</span>
                                ))}
                            </div>
                            {/* 色票 */}
                            <div data-tags="mobile" className="md:hidden w-full flex items-end overflow-hidden">
                              <button
                                onClick={() => setIsBlurred((current) => !current)}
                                className={`w-full h-8 text-white/80 text-xs italic font-mono flex items-center justify-center cursor-pointer select-none transition-all duration-500 ${isBlurred ? "blur-xs" : "blur-none"}`}
                                style={{ backgroundColor: hex }}
                              >
                                {hex}
                              </button>
                            </div>
                          </div>

                          {/* 色票 */}
                          <div data-tags="desktop" className="hidden md:h-auto md:w-16 md:flex md:flex-col items-center md:items-center bg-white/60 rounded-md overflow-hidden">
                            <button
                              onClick={() => setIsBlurred((current) => !current)}
                              className={`md:w-16 md:h-32 text-white/80 text-xs italic font-mono text-center flex items-center justify-center cursor-pointer select-none transition-all duration-500 ${isBlurred ? "blur-xs" : "blur-none"}`}
                              style={{ backgroundColor: hex }}
                            >
                              {hex}
                            </button>
                          </div>


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
          <ActionButton text={isCapturing ? "等待等待再等待..." : "分享我的靈魂色票"} onClick={captureResult} disabled={isCapturing} />
          <ActionButton text="再測一次" onClick={playAgain} />
        </div>

      </div>
    </>
  );
}
