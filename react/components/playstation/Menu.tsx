import { useState } from "react";
import Icon from "@/components/playstation/Icon";
import Items from "@/components/playstation/Items";

const Menu = () => {
    const listInfo = [
        {icon: "about", text: "about"}, 
        {icon: "exp", text: "experience"}, 
        {icon: "www", text: "projects"}, 
        {icon: "games", text: "hobbies"}, 
        {icon: "contact", text: "contact"}
    ];
    
    const [chosen, setChosen] = useState(0);
    const [chosenIcon, setChosenIcon] = useState([0, 0, 0, 0, 0]);
    
    return (
        <div className="flex flex-1 flex-row w-full px-[5%] py-2 relative">
            {listInfo.map((info, idx) => (
                <div key={idx} className="flex flex-1 w-full flex-col items-center" style={{ minWidth: "20%" }}>
                    {/* Top items section - fixed height */}
                    <div className="w-full h-[140px] flex items-end justify-center relative">
                        <Items 
                            chosen={chosen} 
                            src={idx} 
                            chosenIcon={chosenIcon} 
                            setChosenIcon={setChosenIcon} 
                            up={true} 
                        />
                    </div>

                    {/* Main icon section - fixed height and position */}
                    <div className="w-full h-[120px] flex items-center justify-center relative z-20">
                        <Icon 
                            src={idx} 
                            text={info.text} 
                            chosen={chosen} 
                            setChosen={setChosen} 
                        />
                    </div>

                    {/* Bottom items section - fixed height */}
                    <div className="w-full h-[200px] flex items-start justify-center relative">
                        <Items 
                            chosen={chosen} 
                            src={idx} 
                            chosenIcon={chosenIcon} 
                            setChosenIcon={setChosenIcon} 
                            up={false} 
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Menu;
