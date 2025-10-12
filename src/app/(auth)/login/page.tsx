
import LoginForm from "@/components/Auth/loginForm"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full register-bg px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">
        <LoginForm />
        <p className="mt-6 text-center text-muted-foreground">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </div>
  )
}
