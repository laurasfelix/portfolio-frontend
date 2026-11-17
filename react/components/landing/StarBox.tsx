import Star from "@/components/landing/Star";
import colors from "@/utils/colors";

interface StarBoxProps {
    color: "green" | "red" | "yellow";
};

const StarBox = ({color}: StarBoxProps) => {
    const boxColor = colors[color].base;
    const boxImg = colors[color].img;

    return (
        <div className="relative flex flex-col items-center group w-full">
            {/* The star sets the size; the box is a fixed fraction of it, so every square matches */}
            <div className="relative md:w-[40vw] w-[min(48vw,26dvh)]">
                <div className="z-10 transition-transform duration-300 ease-in-out group-hover:animate-[spin_20s_linear_infinite]">
                    <Star color={color}/>
                </div>
                <div
                    style={{ backgroundColor: boxColor }}
                    className="absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[58%] aspect-square md:rounded-[4vw] rounded-[6vw] p-[10%] z-20 shadow-lg"
                >
                    <img src={boxImg} alt="" className="w-full h-full object-contain"/>
                </div>
            </div>
        </div>
    );

};

export default StarBox;
