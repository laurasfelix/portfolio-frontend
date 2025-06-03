import { FC } from "react";
import { CardProps } from "@/utils/card";
import Image from "next/image";

const SmallCard: FC<CardProps> = ({color, role, company, text, icon}) => {
    return (
        <div className="rounded-xl p-4 shadow-lg" style={{ backgroundColor: color }}>
            <div className="flex items-center mb-3">
                {icon && (
                    <div className="mr-3">
                        <Image src={icon} alt={`${company} icon`} width={32} height={32} className="rounded-md" />
                    </div>
                )}
                <div>
                    <h3 className="text-white text-lg font-medium">{role}</h3>
                    <p className="text-white/80 text-sm">{company}</p>
                </div>
            </div>
            <div className="text-white/90 text-sm">
                {text.map((paragraph, index) => (
                    <p key={index} className="mb-2">{paragraph}</p>
                ))}
            </div>
        </div>
    );
};

export default SmallCard;