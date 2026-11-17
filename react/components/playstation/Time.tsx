import { useEffect, useState } from "react";
import Clock from "@/components/playstation/Clock";

const Time = () => {
    const [day, setDay] = useState(new Date().getDate());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [hour, setHour] = useState(new Date().getHours());
    const [minutes, setMinutes] = useState(new Date().getMinutes());

    useEffect(() => {
        const updateTime = () => {
            const date = new Date();
            setDay(date.getDate());
            setMonth(date.getMonth() + 1);
            setHour(date.getHours());
            setMinutes(date.getMinutes());
        }

        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute z-50 top-20 @3xl:top-[15%] right-3 @3xl:right-0 flex w-auto @3xl:w-1/4 h-9 @3xl:h-[4%] px-3 @3xl:px-0 items-center justify-center
                      bg-[rgba(87,87,87,0.3)] border border-[rgba(249,248,248,0.51)] flex-row gap-2.5">
            <p className="text-white text-base @3xl:text-xl font-normal text-shadow-[0_2px_2px_rgba(53,53,53,0.81)]">
                {month}/{day} {hour}:{minutes < 10 ? "0" + minutes : minutes}
            </p>

            <Clock hour={hour} minute={minutes} />
        </div>
    );
};

export default Time;
