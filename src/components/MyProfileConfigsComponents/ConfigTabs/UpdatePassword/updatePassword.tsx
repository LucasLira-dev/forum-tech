import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import { useState } from "react";
import { myProfileService } from "@/services/myProfileService";
import { ToastContainer, useToast } from "@/components/Alerts";
import { useSession } from 'next-auth/react'

export const UpdatePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [saving, setIsSaving ] = useState(false)

    const { data: session } = useSession();

    const { toasts, removeToast, success: showSuccessToast, error: showErrorToast } = useToast();

    const strongPasswordRegex = /^(?=(?:.*[A-Za-z]){5,})(?=.*[^A-Za-z0-9]).+$/;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!session?.accessToken) {
            showErrorToast("Sessão expirada. Faça login novamente.");
            return;
        }
        if(newPassword.trim() !== confirmPassword.trim()){
            // Aqui você pode adicionar uma notificação de erro para o usuário
            showErrorToast("A nova senha e a confirmação não coincidem.");
            return;
        }

        if(!strongPasswordRegex.test(newPassword.trim())) {
            showErrorToast("A senha deve ter pelo menos 5 letras e 1 caractere especial.");
            return;
        }

        if(!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
            showErrorToast("Por favor, preencha todos os campos.");
            return;
        }

        try {
            setIsSaving(true)
            await myProfileService.updatePassword(session.accessToken, currentPassword, newPassword);
            // Aqui você pode adicionar uma notificação de sucesso para o usuário
            showSuccessToast("Senha atualizada com sucesso!");
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
        catch (error) {
            setIsSaving(false)
            // Aqui você pode adicionar uma notificação de erro para o usuário
            showErrorToast("Não foi possível atualizar a senha.");
            console.error("Erro ao atualizar a senha:", error);
        }
        finally {
            setIsSaving(false)
        }
    }

    return(
        <>
            <ToastContainer toasts={toasts} onRemoveToast={removeToast} position="top-center" />
            <form onSubmit={handleSubmit} className="w-full bg-[var(--card)] border border-[var(--border)] rounded-md p-6">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center text-lg font-bold">
                        <FaLock />
                        <span> Senha </span>
                    </div>
                    <p className="text-[var(--muted-foreground)]">Altere sua senha de acesso</p>

                    {/* Senha atual */}
                    <label htmlFor="current-password" className="block text-sm font-medium text-[var(--muted-foreground)] mt-4">Senha atual</label>
                    <div className="relative">
                        <input
                            id="current-password"
                            type={showCurrent ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full mt-1 p-2 rounded-md border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent pr-10"
                            placeholder="Digite sua senha atual"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrent(v => !v)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                            aria-label={showCurrent ? 'Ocultar senha atual' : 'Mostrar senha atual'}
                        >
                            {showCurrent ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Nova senha */}
                    <label htmlFor="new-password" className="block text-sm font-medium text-[var(--muted-foreground)] mt-4">Nova senha</label>
                    <div className="relative">
                        <input
                            id="new-password"
                            type={showNew ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full mt-1 p-2 rounded-md border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent pr-10"
                            placeholder="Digite sua nova senha"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(v => !v)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                            aria-label={showNew ? 'Ocultar nova senha' : 'Mostrar nova senha'}
                        >
                            {showNew ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Confirmar nova senha */}
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-[var(--muted-foreground)] mt-4">Confirmar senha</label>
                    <div className="relative">
                        <input
                            id="confirm-password"
                            type={showConfirm ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full mt-1 p-2 rounded-md border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent pr-10"
                            placeholder="Confirme sua nova senha"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(v => !v)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                            aria-label={showConfirm ? 'Ocultar confirmar senha' : 'Mostrar confirmar senha'}
                        >
                            {showConfirm ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 flex justify-center items-center gap-2 bg-[var(--muted)] text-[var(--primary-foreground)] rounded-md px-4 py-2 w-full sm:w-fit hover:brightness-110 transition font-bold text-center cursor-pointer"
                    >
                        { saving ? "Atualizando...." : "Atualizar Senha"}
                    </button>
                </div>
            </form>
        </>
    )
}