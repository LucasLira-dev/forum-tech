"use client"

import type React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { registerUser } from "./registerAction";

export function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError ] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const result = await registerUser(username, email, password, confirmPassword);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    //limpa os campos
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);

    router.push("/topics");
  };

  return (
    <div className="w-full max-w-md min-h-80 mx-auto bg-[var(--card)] border border-[var(--border)] rounded-md p-8 flex flex-col gap-3">
      <header className="mb-4 text-center">
        <h2 className="text-2xl font-bold">Criar Conta</h2>
        <p className="text-sm text-[var(--muted-foreground)]">Crie sua conta para participar do fórum</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded-md text-sm text-center">
            {error}
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm font-medium text-[var(--foreground)]">Nome de usuário</label>
          <input
            id="username"
            type="text"
            placeholder="seuusuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-md bg-[var(--input)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-[var(--foreground)]">Email</label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-md bg-[var(--input)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
          />
        </div>

        <div className="flex flex-col gap-1 relative">
          <label htmlFor="password" className="text-sm font-medium text-[var(--foreground)]">Senha</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md bg-[var(--input)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1 relative">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-[var(--foreground)]">Confirmar senha</label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md bg-[var(--input)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
              aria-label={showConfirm ? 'Ocultar confirmar senha' : 'Mostrar confirmar senha'}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md mt-4 px-4 py-2 font-bold hover:brightness-105 transition disabled:opacity-60"
        >
          {loading ? "Criando conta..." : "Criar conta"}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
