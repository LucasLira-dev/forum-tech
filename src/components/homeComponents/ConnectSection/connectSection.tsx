import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export const ConnectSection = () => {
    return (
        <section className="w-full h-screen relative flex flex-col gap-6 items-center justify-center p-8 overflow-hidden">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/background.png')",
                    opacity: 1.0,
                }}
            />
            
            {/* Color Overlay + Blur */}
            <div 
                className="absolute inset-0 backdrop-blur-md"
                style={{ 
                    background: 'linear-gradient(120deg, #746cc5 60%, #A855F7 100%)',
                    opacity: 0.85 
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-8 items-center justify-center w-full">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-[var(--primary)] text-center drop-shadow-lg animate-fade-in">
                    Conecte-se com a comunidade <span className="text-[var(--destructive)]">tech</span>
                </h2>
                <p className="text-[var(--secondary)] text-lg sm:text-xl md:text-2xl text-center mt-2 max-w-2xl mb-4 font-medium animate-fade-in">
                    Compartilhe conhecimento, tire dúvidas e construa o futuro da tecnologia junto com milhares de desenvolvedores.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
                    <Link href="/topics"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-lg bg-gradient-to-r from-[var(--primary)] to-[var(--ring)] text-[var(--primary-foreground)] shadow-lg hover:scale-105 hover:brightness-110 transition-all duration-200 border border-[var(--primary)]"
                    >
                        Explorar Discussões
                        <BsArrowRight size={22} className="ml-2" />
                    </Link>
                    <Link href="/topics/create"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-lg bg-[var(--card)] text-[var(--secondary)] border border-[var(--border)] shadow-md hover:bg-[var(--muted)] hover:text-[var(--primary)] hover:scale-105 transition-all duration-200"
                    >
                        Criar Tópico
                    </Link>
                </div>
            </div>
        </section>
    );
};