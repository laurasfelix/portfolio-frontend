import colors from "@/utils/colors";

export interface StarProps {
    color: "green" | "red" | "yellow";
};

const Star = ({color}: StarProps) => {
    const starColor = colors[color].shadow;

    return (
        <div>
            <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 110 96" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M55 0L67.7973 36.6221H109.21L75.7065 59.2558L88.5038 95.8779L55 73.2442L21.4962 95.8779L34.2935 59.2558L0.78978 36.6221H42.2027L55 0Z" 
                    fill={starColor}
                />
            </svg>
        </div>
    );
};

export default Star;