import { FC } from "react";
import { CardProps } from "@/utils/card";
import SmallCard from "@/components/landing/SmallCard";
import Image from "next/image";

const LargeCard: FC<CardProps> = ({ pictures = [], ...rest }) => {
    return (
        <div className="rounded-xl overflow-hidden shadow-xl bg-white">
            {pictures && pictures.length > 0 && (
                <div className="w-full h-48 relative">
                    <Image 
                        src={pictures[0]} 
                        alt={`${rest.company} image`}
                        fill
                        style={{ objectFit: 'cover' }} 
                        className="rounded-t-xl"
                    />
                </div>
            )}
            <div className="p-2">
                <SmallCard {...rest} />
            </div>
        </div>
    );
};

export default LargeCard;