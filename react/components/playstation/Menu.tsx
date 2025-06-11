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
        <div className="flex flex-1 flex-row w-full px-[5%]">
            {listInfo.map((info, idx) => (
                <div key={idx} className="flex flex-1 w-full flex-col gap-[1px]">
                    <div className="flex-4 h-[20vh]">
                        <Items 
                            chosen={chosen} 
                            src={idx} 
                            chosenIcon={chosenIcon} 
                            setChosenIcon={setChosenIcon} 
                            up={true} 
                        />
                    </div>

                    <div className="flex-10">
                        <Icon 
                            src={idx} 
                            text={info.text} 
                            chosen={chosen} 
                            setChosen={setChosen} 
                        />
                        <div>
                            <Items 
                                chosen={chosen} 
                                src={idx} 
                                chosenIcon={chosenIcon} 
                                setChosenIcon={setChosenIcon} 
                                up={false} 
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Menu;
