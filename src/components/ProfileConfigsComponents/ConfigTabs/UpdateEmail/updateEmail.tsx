import { FaEnvelope } from "react-icons/fa"

export const UpdateEmail = () => {
    return(
        <div className="w-full bg-[var(--card)] border border-[var(--border)] rounded-md p-6 flex flex-col">
            <div
            className="flex flex-col gap-2">
                <div
                className="flex gap-2 items-center text-lg font-bold">
                    <FaEnvelope />
                    <span> Email </span>
                </div>
                <p
                className="text-[var(--muted-foreground)]">
                    Atualize seu endereço de email
                </p>
            </div>

            <div
            className="flex flex-col">
                <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--muted-foreground)] mt-4">
                    Endereço de Email
                </label>
                <input
                type="email"
                className="w-full mt-1 p-2 rounded-md border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent pr-10"
                placeholder="Digite seu novo endereço de email"
            />
            </div>

            <button
            type="button"
            className="mt-4 flex justify-center items-center gap-2 bg-[var(--muted)] text-[var(--primary-foreground)] rounded-md px-4 py-2 w-full sm:w-fit hover:brightness-110 transition font-bold text-center cursor-pointer">
                <FaEnvelope />
                Atualizar Email
            </button>
        </div>
    )
}