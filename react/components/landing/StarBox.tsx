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
            <div className="w-[40vw] z-10 transition-transform duration-300 ease-in-out group-hover:animate-[spin_20s_linear_infinite]">
                <Star color={color}/>
            </div>
            <div 
                style={{ backgroundColor: boxColor }} 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20vw] aspect-square rounded-[80px] p-8 z-20 shadow-lg"
            >
                <img src={boxImg} className="w-[20vw] aspect-square"/>
            </div>
        </div>
    );

};

export default StarBox;