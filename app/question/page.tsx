"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


import Link from "next/link";

export default function Question() {

  const router = useRouter();

  const questionData = [
    {
      "title": "麵包師傅要你「靜置 30 分鐘」，你會怎麼做？",
      "options": [
        {
          text: "選項一：乖乖待著… 然後偷偷膨脹三倍大",
          value: 1
        },
        {
          text: "選項二：等個屁！我已經開始發酵狂飆了",
          value: 2
        },
        {
          text: "選項三：發…什麼？我忘記了，我睡著了",
          value: 3
        }]
    },
    {
      "title": "當你被放進烤箱時，溫度突然升高，你的反應是？",
      "options": [
        {
          text: "選項一：啊啊啊啊啊啊！（冒泡炸裂）",
          value: 1
        },
        {
          text: "選項二：熱熱熱快翻面！我要烤出最酥脆的皮！",
          value: 2
        },
        {
          text: "選項三：我已經放棄掙扎，來吧命運……",
          value: 3
        }]
    },
    {
      "title": "如果你被顧客挑選時被放回去了，你會？",
      "options": [
        {
          text: "選項一：立刻乾癟五公分，氣到扁掉",
          value: 1
        },
        {
          text: "選項二：更用力散發麵包香，讓他後悔！",
          value: 2
        },
        {
          text: "選項三：裝死，假裝自己是牛角麵包",
          value: 3
        }]
    },
  ];


  const [questionIndex, setQuestionIndex] = useState(0);
  function nextQuestion(optionIndex: number) {
    console.log("使用者選擇：" + optionIndex);
    
    if(questionIndex == questionData.length-1) {
      console.log("答題結束準備看結果");
      router.push("/prepare");
    }
    else{
      console.log("下一題");
      setQuestionIndex(questionIndex + 1);
    }
  }

  
  return (
    <>
    
    <div className="flex flex-col justify-center items-center gap-4">
        <div>答題</div>
        <div>
          <div>{"Q" + (questionIndex + 1) + "：" + questionData[questionIndex].title}</div>
          {/* 帶參數 */}
          <div onClick={ () => nextQuestion(0)} className="bg-white/50 p-2 rounded-lg mt-2 border border-white/50 hover:bg-gray-200 transition-all hover:border hover:border-gray-300 duration-300">{questionData[questionIndex].options[0].text}</div>
          <div onClick={ () => nextQuestion(1)} className="bg-white/50 p-2 rounded-lg mt-2 border border-white/50 hover:bg-gray-200 transition-all hover:border hover:border-gray-300 duration-300">{questionData[questionIndex].options[1].text}</div>
          <div onClick={ () => nextQuestion(2)} className="bg-white/50 p-2 rounded-lg mt-2 border border-white/50 hover:bg-gray-200 transition-all hover:border hover:border-gray-300 duration-300">{questionData[questionIndex].options[2].text}</div>
        </div>

        <Link href="/prepare" className="text-white font-bold bg-gray-400 px-3 py-2 rounded-md">選項</Link>

    </div>



    </>
  );
}
