"use client";

import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { myProfileService } from "@/services/myProfileService";
import { ToastContainer, useToast } from "@/components/Alerts/toast";

export const UpdateEmail = () => {
    const { data: session, update: refreshSession } = useSession();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { toasts, removeToast, success: showSuccessToast, error: showErrorToast } = useToast();

    useEffect(() => {
        if (session?.user?.email) {
            setEmail(session.user.email);
        }
    }, [session?.user?.email]);

    const handleUpdateEmail = async () => {
        if (!session?.accessToken) {
            showErrorToast("Sessão expirada. Faça login novamente.");
            return;
        }

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            showErrorToast("Informe o novo e-mail e sua senha atual.");
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await myProfileService.updateEmail(
                session.accessToken,
                trimmedEmail,
                trimmedPassword
            );

            const newEmail = response?.data?.newEmail;
            if (!newEmail) {
                throw new Error("Resposta inesperada do servidor");
            }

            const signInResult = await signIn("credentials", {
                redirect: false,
                email: newEmail,
                password: trimmedPassword,
            });

            if (signInResult?.error) {
                showErrorToast("Email trocado, mas não foi possível renovar a sessão. Faça login novamente.");
                return;
            }

            await refreshSession?.();
            setEmail(newEmail);
            setPassword("");
            showSuccessToast("Email atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar email:", error);
            showErrorToast("Não foi possível atualizar o email.");
        } finally {
            setIsSubmitting(false);
        }
    };
 
    return(
        <>
            <ToastContainer toasts={toasts} onRemoveToast={removeToast} position="top-center" />
            <div className="w-full bg-[var(--card)] border border-[var(--border)] rounded-md p-6 flex flex-col">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center text-lg font-bold">
                        <FaEnvelope />
                        <span>Email</span>
                    </div>
                    <p className="text-[var(--muted-foreground)]">Atualize seu endereço de email</p>
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[var(--muted-foreground)] mt-4"
                    >
                        Endereço de Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        className="w-full mt-1 p-2 rounded-md border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
                        placeholder="Digite seu novo endereço de email"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />

                    <label
                        htmlFor="current-password"
                        className="block text-sm font-medium text-[var(--muted-foreground)] mt-4"
                    >
                        Senha atual
                    </label>
                    <input
                        type="password"
                        value={password}
                        className="w-full mt-1 p-2 rounded-md border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
                        placeholder="Digite sua senha"
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>

                <button
                    type="button"
                    className="mt-4 flex justify-center items-center gap-2 bg-[var(--muted)] text-[var(--primary-foreground)] rounded-md px-4 py-2 w-full sm:w-fit hover:brightness-110 transition font-bold text-center cursor-pointer disabled:opacity-60"
                    onClick={handleUpdateEmail}
                    disabled={isSubmitting}
                >
                    <FaEnvelope />
                    {isSubmitting ? "Atualizando..." : "Atualizar Email"}
                </button>
            </div>
        </>
    );
};