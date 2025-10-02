interface CardsProps {
    icone: React.ReactNode;
    title: string;
    description: string;
}

export const Cards = ({ icone, title, description }: CardsProps) => {
    return(
        <div
        className="flex flex-col items-center text-center gap-4 p-6 bg-[var(--card)] rounded-lg border border-[var(--border)]">
            <div
            className="rounded-md bg-[var(--secondary)] text-[var(--secondary-foreground)] p-3">
                {icone}
            </div>
            <h3 className="text-xl font-semibold">
                {title}
            </h3>
            <p className="text-sm text-[var(--muted-foreground)]">
                {description}
            </p>
        </div>
    )
}