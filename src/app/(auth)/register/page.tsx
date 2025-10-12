
import RegisterForm from "@/components/Auth/registerForm"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full register-bg px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">
        <RegisterForm />
        <p className="mt-6 text-center text-muted-foreground">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Entre aqui
          </Link>
        </p>
      </div>
    </div>
  )
}
