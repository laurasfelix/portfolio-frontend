import { useState } from "react";
import Body from "@/components/furby/Body";
import InputBox from "@/components/furby/InputBox";

export default function Furby() {
    const [inputInteract, setInputInteract] = useState(false);
    const [isTalking, setIsTalking] = useState(false);
    const [isThinking, setIsThinking] = useState(false);

    return (
        <div className="w-full h-screen flex flex-row p-5 bg-black">
            {/* Left column */}
            <div className="flex-1">
                {/* Empty side column */}
            </div>
            
            {/* Main column */}
            <div className="flex-3 flex flex-col">
                {/* Furby body component */}
                <Body 
                    isTalking={isTalking} 
                    isThinking={isThinking} 
                    interact={inputInteract}
                />

                {/* Input box */}
                <div className="w-full mt-6 flex items-center">
                    <InputBox 
                        setIsTalking={setIsTalking} 
                        isThinking={isThinking} 
                        setIsThinking={setIsThinking} 
                        setInteract={setInputInteract} 
                    />
                </div>
            </div>
            
            {/* Right column */}
            <div className="flex-1">
                {/* Empty side column */}
            </div>
        </div>
    );
}
