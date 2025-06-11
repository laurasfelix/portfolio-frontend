const Clock = ({ hour, minute }: { hour: number, minute: number }) => {
    const hourAngle = (hour % 12) * 30 + minute * 0.5;
    const minuteAngle = minute * 6;

    return (
        <div className="rounded-lg w-5 h-5 bg-[rgba(57,57,57,0.64)] border border-white 
                      shadow-md flex justify-center items-center relative">
            <div 
                className="absolute bottom-1/2 w-[1.5px] rounded-sm bg-white z-50 h-[5px] origin-bottom"
                style={{ transform: `rotate(${hourAngle}deg)` }}
            ></div>
            <div 
                className="absolute bottom-1/2 w-[1.5px] rounded-sm bg-white z-50 h-[7px] origin-bottom"
                style={{ transform: `rotate(${minuteAngle}deg)` }}
            ></div>
        </div>
    );
};

export default Clock;
