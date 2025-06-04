import { FC } from "react";
import { CardProps } from "@/utils/card";
import Image from "next/image";
import colors from "@/utils/colors";

const TinyCard: FC<CardProps> = ({ pictures = [], color, icon, company, role, text }) => {
    return (
        <div className="rounded-xl overflow-hidden h-full" style={{backgroundColor: colors[color].dark}}>
            <div className="grid grid-cols-3 items-center mb-3 justify-center p-1">
                {icon && (
                    <div className="mr-3">
                        <Image src={icon} alt={`${company} icon`} width={32} height={32} className="rounded-md" />
                    </div>
                )}
                <div className="text-center items-center flex flex-col">
                    <h3 className="text-white text-lg font-medium">{role}</h3>
                    <p className="text-white/80 text-sm">{company}</p>
                </div>
            </div>
            <div className="p-2 h-full">
                <div className="rounded-xl p-4 h-full" style={{ backgroundColor: colors[color].base }}>
                    <div className="text-white/90 text-sm max-h-[5vh] overflow-hidden">
                        {text.map((part: string[], index: number) =>
                            part.map((paragraph: string, idx: number) => (
                                <p key={`${index}-${idx}`} className="text-left mb-1 break-words whitespace-normal">{paragraph}</p>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TinyCard;