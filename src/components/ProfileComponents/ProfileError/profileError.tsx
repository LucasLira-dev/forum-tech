import Link from "next/link";
import { FaUserAltSlash } from "react-icons/fa";

export const ProfileError = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-[var(--card)] to-[var(--muted)] rounded-lg border border-[var(--border)] shadow-xl p-8">
    <div className="flex flex-col items-center gap-4">
      <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-6">
        <FaUserAltSlash className="text-red-500 dark:text-red-400 text-5xl" />
      </div>
      <h2 className="text-2xl font-bold text-[var(--foreground)] text-center">Perfil não encontrado</h2>
      <p className="text-[var(--muted-foreground)] text-center text-lg max-w-md">
        Não foi possível encontrar o perfil deste usuário.<br />
        Ele pode ter sido excluído, tornado privado ou nunca existiu.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2 rounded-md bg-[var(--primary)] text-white font-semibold shadow hover:bg-[var(--ring)] transition-colors"
      >
        Voltar para a página inicial
      </Link>
    </div>
  </div>
);