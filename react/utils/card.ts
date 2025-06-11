export interface CardProps {
  color: "green" | "red" | "yellow";
  role: string;
  company: string;
  text: string[][];
  pictures?: string[];
  icon: string;
};
