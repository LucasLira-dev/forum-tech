import { signIn } from "next-auth/react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPasswordRegex = /^(?=(?:.*[A-Za-z]){5,})(?=.*[^A-Za-z0-9]).+$/;

export async function registerUser(username: string, email: string, password: string, confirmPassword: string) {
    try {
    
          const trimmedUsername = username.trim();
          const trimmedEmail = email.trim();
          const trimmedPassword = password.trim();
          const trimmedConfirmPassword = confirmPassword.trim();
    
          if (!trimmedEmail || !trimmedPassword || !trimmedUsername) {
        
            return { error: "Email e senha são obrigatórios" };
          }
    
    
          if(!emailRegex.test(trimmedEmail)) {
            return { error: "Por favor, insira um email válido." };
          }
    
          if(!strongPasswordRegex.test(trimmedPassword)) {
            return { error: "A senha deve ter pelo menos 5 letras e 1 caractere especial." };
          }
    
          if(trimmedPassword !== trimmedConfirmPassword) {
            return { error: "As senhas não coincidem." };
          }
    
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: trimmedUsername,
              email: trimmedEmail,
              password: trimmedPassword,
            }),
          });
    
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Erro ao criar conta');
          }
    
          const loginResult = await signIn('credentials', {
            redirect: false,
            email: trimmedEmail,
            password: trimmedPassword,
          });
    
          if (loginResult?.error) {
            return { error: "Email ou senha inválidos" };
          }

          return { success: true };
          
        } catch (error) {
          console.error("Erro ao criar conta:", error);
          return { error: "Erro ao criar conta. Tente novamente." };
        }
}