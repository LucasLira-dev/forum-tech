import React from "react";

interface CardProps {
    title: string;
    icon: string | React.JSX.Element;
    value: number;
}

export const Card = ({ title, icon, value }: CardProps) => {
    return(
        <div
        className="bg-[var(--card)] p-6 rounded-lg shadow-md flex flex-col gap-2 w-full md:min-w-sm lg:min-w-[310px]">
            <div
            className="flex justify-between">
                <p
                className="text-sm text-[var(--muted-foreground)]">
                    {title}
                </p>
                {icon}
            </div>
            <span>
                {value}
            </span>
        </div>
    )
}