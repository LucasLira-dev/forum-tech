"use client"

import React from 'react';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: "/topics"
      });

      if (result?.error) {
        setError("Email ou senha inválidos");
        setPassword(""); 
      } else if (result?.ok || result?.url) {
        router.push("/topics");
      }

    } catch (err) {
        setError("Erro ao fazer login. Tente novamente.");
        console.error("Erro ao fazer login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md min-h-80 mx-auto bg-[var(--card)] border border-[var(--border)] rounded-md p-8 flex flex-col gap-3">
      <header className="mb-4 text-center">
        <h2 className="text-2xl font-bold">Entrar</h2>
        <p className="text-sm text-[var(--muted-foreground)]">Faça login para acessar sua conta</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[var(--foreground)]">Email</label>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(null); }}
            required
            className="w-full px-3 py-2 rounded-md bg-[var(--input)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
          />
        </div>

        <div className="flex flex-col gap-1 relative">
          <label className="text-sm font-medium text-[var(--foreground)]">Senha</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md bg-[var(--input)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] rounded-md mt-4 px-4 py-2 font-bold hover:brightness-105 transition disabled:opacity-60"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
