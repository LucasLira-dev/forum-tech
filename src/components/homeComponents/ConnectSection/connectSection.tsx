import { BsArrowRight } from "react-icons/bs"

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
            
            {/* Color Overlay */}
            <div 
                className="absolute inset-0"
                style={{ 
                    backgroundColor: 'var(--connectSection)', 
                    opacity: 0.85 
                }}
            />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col gap-6 items-center justify-center w-full">
            <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:6xl font-bold text-[var(--secondary)] text-center ">
                Conecte-se com a comunidade <span className="text-[var(--destructive)]"> tech </span>
            </h2>
            <p
            className="text-[var(--secondary)] text-[24px] text-center mt-4 max-w-xl mb-4">
                Compartilhe conhecimento, tire dúvidas e construa o futuro da tecnologia junto com milhares de desenvolvedores.
            </p>

            <div
            className="flex flex-col justify-center items-center sm:flex-row gap-2 w-full">
                <button
                className="flex bg-[var(--background)] gap-2 text-[var(--primary)] text-[16px] font-semibold rounded-md px-4 py-2 hover:bg-[var(--ring)] hover:text-[var(--foreground)] transition-colors border-1 border-[var(--background)] cursor-pointer w-full sm:max-w-[300px] justify-center items-center">
                    <p>
                        Explorar Discussões
                    </p>
                    <BsArrowRight size={20} className="ml-2" />
                </button>
                <button
                className="flex bg-transparent gap-2 text-[var(--secondary)] text-[16px] font-semibold rounded-md px-4 py-2 hover:bg-[var(--foreground)]/20 transition-colors border-1 border-[var(--border)] cursor-pointer w-full sm:max-w-[300px] justify-center">
                    Criar Tópico
                </button>
            </div>
            </div>
        </section>
    )
}