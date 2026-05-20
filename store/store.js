import { create } from 'zustand'
import finalData from './final'


let questionData = [
    {
      mainTitle: "[ 甦醒 ]",
      title: "開眼，你發現自己來到了一個奇異的空間，你身處於……",
      options:[
        {
          text: "一片無垠、寧靜且深邃的午夜海面，星光倒映在水中。",
          value: 1,
          color: [30, 100, 220]
        },
        {
          text: "一座正午時分、充滿生機與歡聲笑語的露天市集，陽光灑落。",
          value: 2,
          color: [240, 180, 50]
        },
        {
          text: "一個僅有微弱爐火、沈重且溫暖的石造密室，讓人感到安心。",
          value: 3,
          color: [120, 100, 100]
        },
        {
          text: "一場無法定義邊界、漂浮著螢光粉塵與星雲的虛無夢境。",
          value: 4,
          color: [120, 50, 200]
        }
      ]
    },
    {
      mainTitle: "[ 變數 ]",
      title: "旅途中，地圖突然在手中化為灰燼，前方的道路消失了，你第一時間會……",
      options:[
        {
          text: "留在原地觀察地形，根據邏輯推斷最穩妥的出路。",
          value: 1,
          color: [20, 90, 180]
        },
        {
          text: "隨性地四處走走，憑藉心情漫步，相信路總會出現。",
          value: 2,
          color: [120, 240, 80]
        },
        {
          text: "憤怒地將殘骸拋下，憑藉本能衝向看起來最險峻的未知深處。",
          value: 3,
          color: [230, 50, 30]
        },
        {
          text: "閉上眼睛，試圖感應空氣中細微的震動，連結潛意識的方向。",
          value: 4,
          color: [120, 80, 250]
        }
      ]
    },
    {
      mainTitle: "[ 信號 ]",
      title: "耳邊傳來一陣模糊的聲響，你認為那是誰的呼喚？",
      options:[
        {
          text: "來自遙遠的鐘聲，那是理智對自我嚴格的審視與教導。",
          value: 1,
          color: [20, 80, 170]
        },
        {
          text: "來自親友的笑聲，那是充滿期待與喜悅的生命律動。",
          value: 2,
          color: [255, 230, 100]
        },
        {
          text: "來自激昂的戰鼓，那是催促你必須前進、面對挑戰的節奏。",
          value: 3,
          color: [210, 30, 30]
        },
        {
          text: "來自靈魂的呢喃，那是呼喚你探索未知的秘密低語。",
          value: 4,
          color: [170, 80, 240]
        }
      ]
    },
    {
      mainTitle: "[ 慾望 ]",
      title: "在旅程盡頭，你發現一個古老的寶庫，你最希望能找到什麼？",
      options:[
        {
          text: "一本記載了世界真理與運作法則的古老法典。",
          value: 1,
          color: [10, 60, 180]
        },
        {
          text: "一個能隨身攜帶、溫暖且充滿力量的金色護身符。",
          value: 2,
          color: [210, 220, 40]
        },
        {
          text: "一把象徵絕對力量與榮耀的赤紅寶劍。",
          value: 3,
          color: [200, 20, 50]
        },
        {
          text: "一面能映照出未來無限可能、迷幻的時空鏡子。",
          value: 4,
          color: [130, 180, 210]
        }
      ]
    },
    {
      mainTitle: "[ 歸宿 ]",
      title: "這場夢境即將結束，你只能帶走一樣「禮物」回到現實，你會選擇……",
      options:[
        {
          text: "一副能看清世間真相、冷靜的鏡片。",
          value: 1,
          color: [40, 80, 250]
        },
        {
          text: "一顆種子，播下後能開出永遠溫暖的黃色花朵。",
          value: 2,
          color: [240, 210, 80]
        },
        {
          text: "一點餘燼，能隨時點燃內心那份永不熄滅的熱情。",
          value: 3,
          color: [200, 100, 30]
        },
        {
          text: "一片碎片，隨時能帶你逃離現實、重返維度邊界的裂縫。",
          value: 4,
          color: [180, 60, 220]
        }
      ]
    },
  ];



const usePsyStore = create((set) => ({
  finalData: finalData,
  psyData: {
      score: 0,
      quizData: questionData,
      // per-question selected option index (null = not answered)
      answers: Array(questionData.length).fill(null),
      // cumulative RGB totals [r,g,b]
      colorSum: [0, 0, 0],
    },

    // set numeric score directly (kept for compatibility)
    setScore: (score) => set((state) => ({ psyData: { ...state.psyData, score: score } })),

    // set or change answer for a question index: will update answers, score and colorSum
    setAnswer: (questionIndex, optionIndex) => set((state) => {
      const prevAnswers = state.psyData.answers.slice();
      const prevSelected = prevAnswers[questionIndex];
      const prevColor = prevSelected !== null ? questionData[questionIndex].options[prevSelected].color : [0,0,0];
      const prevValue = prevSelected !== null ? questionData[questionIndex].options[prevSelected].value || 0 : 0;

      const newColor = questionData[questionIndex].options[optionIndex].color || [0,0,0];
      const newValue = questionData[questionIndex].options[optionIndex].value || 0;

      const newColorSum = state.psyData.colorSum.map((v, i) => v - prevColor[i] + newColor[i]);
      const newScore = state.psyData.score - prevValue + newValue;

      prevAnswers[questionIndex] = optionIndex;

      return {
        psyData: {
          ...state.psyData,
          answers: prevAnswers,
          colorSum: newColorSum,
          score: newScore,
        }
      };
    }),
    // reset psyData to initial empty state
    reset: () => set((state) => ({
      psyData: {
        ...state.psyData,
        score: 0,
        answers: Array(questionData.length).fill(null),
        colorSum: [0,0,0],
      }
    })),
    })
);


export { usePsyStore };