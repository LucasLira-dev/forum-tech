export const BasicInformation = () => {
    return(
        <div className="w-full bg-[var(--card)] border border-[var(--border)] rounded-md p-6">
            <p
            className="text-lg font-semibold">
                Informações Básicas
            </p>

            <div
            className="flex flex-col ">
                <label htmlFor="name" className="block text-sm font-medium text-[var(--muted-foreground)] mt-4">
                    Nome de exibição
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full mt-1 p-2 rounded-md border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
                    placeholder="Seu nome"
                />
                <p
                className="mt-1 text-sm text-[var(--muted-foreground)]">
                    5/50 caracteres
                </p>
            </div>

            <div
            className="flex flex-col ">
                <label htmlFor="bio" className="block text-sm font-medium text-[var(--muted-foreground)] mt-4">
                    Bio
                </label>
                <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    className="w-full mt-1 p-2 rounded-md border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
                    placeholder="Fale um pouco sobre você"
                ></textarea>
                <p
                className="mt-1 text-sm text-[var(--muted-foreground)]">
                    0/160 caracteres
                </p>
            </div>
        </div>
    )
}