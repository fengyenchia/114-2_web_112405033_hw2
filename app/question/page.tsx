"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePsyStore } from "../../store/store";

import ActionButton from '@/component/ActionButton';
import { ProgressBar } from '@heroui/react';


export default function Question() {

  const psyData = usePsyStore((state) => state.psyData);
  const setPsyAnswer = usePsyStore((state) => state.setAnswer);

  const router = useRouter();


  // 把 quizData, score 從 store 中取出來
  // console.log(psyData);
  const quizData = psyData.quizData;
  const score = psyData.score;

  const [questionIndex, setQuestionIndex] = useState(0);
  const questionPercent = ((questionIndex + 1) / quizData.length) * 100;
  const [warning, setWarning] = useState("");


  useEffect(() => {
    console.log("目前分數：" + score);
  }, [score]);

  function nextQuestion(optionIndex: number) {
    console.log("使用者選擇：" + optionIndex);
    // update store with selected answer (handles RGB sums and score delta)
    setPsyAnswer(questionIndex, optionIndex);
    setWarning("");
    console.log("score after select:", psyData.score);
    
    
    if(questionIndex == quizData.length-1) {
      console.log("答題結束準備看結果");
      router.push("/prepare");
    }
    else{
      console.log("下一題");
      setQuestionIndex(questionIndex + 1);
    }

  }
  
  function prevQuestionButton() {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
    setWarning("");
  }

  function nextQuestionButton() {
    if (psyData.answers[questionIndex] === null) {
      setWarning("請先選擇答案再進入下一題。");
      return;
    }

    if (questionIndex == quizData.length - 1) {
      router.push("/prepare");
    } else {
      setQuestionIndex(questionIndex + 1);
    }

  }

  return (
    <>
    <div className="flex flex-col justify-center items-center gap-4">
        <ProgressBar value={questionPercent} className="progress-bar--sm">
          {/* <Label>第 {questionIndex + 1} 題</Label> */}
          {/* <ProgressBar.Output /> */}
          <ProgressBar.Track className="bg-[#fcf8fb]">
            <ProgressBar.Fill className="bg-[#f8ddf3]"/>
          </ProgressBar.Track>
        </ProgressBar>
        
        <div className="font-bold text-gray-600 text-xl">{ quizData[questionIndex].mainTitle }</div>
        <div className="text-gray-600 text-center">
          <div className="font-bold">{quizData[questionIndex].title}</div>

          {/* 帶參數 */}
          {/* <div onClick={ () => nextQuestion(0)} className="bg-white/50 p-2 rounded-lg mt-4 border border-white/50 hover:bg-gray-200 transition-all hover:border hover:border-gray-300 duration-300">{quizData[questionIndex].options[0].text}</div>
          <div onClick={ () => nextQuestion(1)} className="bg-white/50 p-2 rounded-lg mt-4 border border-white/50 hover:bg-gray-200 transition-all hover:border hover:border-gray-300 duration-300">{quizData[questionIndex].options[1].text}</div>
          <div onClick={ () => nextQuestion(2)} className="bg-white/50 p-2 rounded-lg mt-4 border border-white/50 hover:bg-gray-200 transition-all hover:border hover:border-gray-300 duration-300">{quizData[questionIndex].options[2].text}</div> */}

          {
            quizData[questionIndex].options.map(
              (option: { text: string, color?: number[] }, index: number) => {
                  const selected = psyData.answers && psyData.answers[questionIndex] === index;
                  const selectedClass = selected ? 'shadow-lg scale-101' : '';

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => nextQuestion(index)}
                      aria-pressed={selected}
                      className={`w-full p-2 text-sm md:text-md rounded-lg mt-4 border border-transparent transition-all duration-500 ${selected ? 'bg-gray-700 text-white' : 'bg-white/50 text-gray-700 hover:border hover:border-gray-300'} ${selectedClass}`}
                    >
                      { option.text }
                    </button>
                  )
                }
              )
            }
        </div>


        {warning && <div className="text-xs font-bold text-red-700">{warning}</div>}
        <div className="w-full flex justify-evenly mt-4">
          <ActionButton text="上一題" onClick={prevQuestionButton} disabled={questionIndex === 0} />
          <ActionButton text="下一題" onClick={nextQuestionButton} disabled={questionIndex === quizData.length - 1} />
        </div>

    </div>


    </>
  );
}