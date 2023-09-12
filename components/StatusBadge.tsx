import { FC, ReactNode } from "react";

interface Props {
  color: "red" | "yellow" | "green" | "blue" | "orange";
  children: ReactNode;
  className?: string;
}
const StatusBadge: FC<Props> = ({ color, children, className }) => {
  return (
    <div
      className={`
 ${color === "red" && "bg-red-500/30 text-red-500"}
 ${color === "yellow" && "bg-yellow-500/30 text-yellow-500"}
 ${color === "green" && "bg-green-500/30 text-green-500"}
 ${color === "blue" && "bg-blue-500/30 text-blue-500"}
 ${color === "orange" && "bg-orange-500/30 text-orange-500"}
    w-fit px-3 font-semibold py-1 rounded-full ${className}`}
    >
      {children}
    </div>
  );
};

export default StatusBadge;
