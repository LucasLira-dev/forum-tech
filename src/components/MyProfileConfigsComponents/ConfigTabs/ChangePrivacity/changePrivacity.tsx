import { FaEye } from "react-icons/fa"
import * as Switch from '@radix-ui/react-switch';
import { useState } from 'react';

export const ChangePrivacity = () => {
    const [isPublic, setIsPublic] = useState<boolean>(true);

    const handleToggle = (checked: boolean) => {
        setIsPublic(checked);
        // Aqui você pode chamar a API para salvar a preferência de privacidade.
        // Exemplo: fetch('/api/profile', { method: 'PATCH', body: JSON.stringify({ isPublic: checked }) })
        console.log('Perfil público:', checked);
    }

    return (
      <div className="w-full bg-[var(--card)] border border-[var(--border)] rounded-md p-6">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center text-lg font-bold">
            <FaEye />
            <span> Privacidade </span>
          </div>
          <p className="text-[var(--muted-foreground)]">
            Controle a visibilidade do seu perfil e informações pessoais
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-col">
                <p className="font-semibold text-[var(--foreground)]">Perfil público</p>
                <p className="text-[var(--muted-foreground)] text-sm">Permitir que outros usuários vejam meu perfil</p>
            </div>

            <Switch.Root
                className="relative inline-flex h-5 w-9 items-center rounded-full bg-[var(--muted)] focus:outline-none data-[state=checked]:bg-[var(--primary)]"
                id="profile-public-switch"
                checked={isPublic}
                onCheckedChange={handleToggle}
                aria-label="Perfil público"
            >
                <Switch.Thumb className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform data-[state=checked]:translate-x-5" />
            </Switch.Root>
        </div>
      </div>
    );
}