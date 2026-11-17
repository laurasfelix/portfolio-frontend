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
                    className="absolute top-[57%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44%] aspect-square overflow-hidden md:rounded-[3vw] rounded-[5vw] z-20 shadow-lg"
                >
                    <img src={boxImg} alt="" className="absolute inset-[12%] w-[76%] h-[76%] object-contain"/>
                </div>
            </div>
        </div>
    );

};

export default StarBox;
