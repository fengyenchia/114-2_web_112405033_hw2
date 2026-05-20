"use client"

import { useEffect, useState } from "react";


export default function Emoticons({children, faceIndex}: {children: React.ReactNode, faceIndex: number}) {

    const emoticons = ["(๑•́ ₃ •̀๑)", "(๑╹◡╹๑)"];
    const [currentEmoticon, setcurrentEmoticon] = useState(0);
    
    const faces = ["o_o", "-_-"];
    const [currentFace, setCurrentFace] = useState(0);


    const [counter, setCounter] = useState(0);
    

    useEffect(() => {
        setTimeout(() => {
            // console.log("1s");
        }, 1000);
        
        setInterval(() => {
            setCounter(counter + 1);
            console.log(counter);
            
            if (counter % 2 == 0) {
                setCurrentFace(1);
                setcurrentEmoticon(1);
            }
            else if (counter % 2 == 1) {
                setCurrentFace(0);
                setcurrentEmoticon(0);
            }

            // console.log("1s");
        }, 2000);
    },[counter]);

    return (
        <>      
            {children}

            {emoticons[currentEmoticon]}
            
            {faces[currentFace]}
        </>
    );
}
