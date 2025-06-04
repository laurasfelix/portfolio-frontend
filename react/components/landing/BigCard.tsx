import { FC } from "react";
import { CardProps } from "@/utils/card";
import Image from "next/image";
import colors from "@/utils/colors";

const BigCard: FC<CardProps> = ({color, role, company, text, icon}) => {
    return (
        <div className="rounded-xl p-4" style={{ backgroundColor: colors[color].base }}>
            <div className="text-white/90 text-sm">
                {text.map((paragraph, index) => (
                    <p key={index} className="mb-2">{paragraph}</p>
                ))}
            </div>
        </div>
    );
};

export default BigCard;