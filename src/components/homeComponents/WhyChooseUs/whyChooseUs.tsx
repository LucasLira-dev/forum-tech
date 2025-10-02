import { Cards } from "./cards"
import { FiMessageSquare, FiTrendingUp, FiZap, FiUsers,  } from "react-icons/fi"

const CardInformations = [
    {
        icone: <FiMessageSquare size={32} />,
        title: "Discussões inteligentes",
        description: "Encontre respostas rápidas e precisas para suas dúvidas técnicas com a ajuda da nossa comunidade especializada."
    },
    {
        icone: <FiUsers size={32} />,
        title: "Comunidade ativa",
        description: "Junte-se a uma comunidade vibrante de desenvolvedores que estão sempre prontos para ajudar e compartilhar conhecimento."
    },
    {
        icone: <FiZap size={32} />,
        title: "Fácil de usar",
        description: "Nossa plataforma é intuitiva e fácil de navegar, permitindo que você encontre o que precisa rapidamente."
    },
    {
        icone: <FiTrendingUp size={32} />,
        title: "Sempre Atualizado",
        description: "Discussões sobre as tecnologias mais recentes e tendências do mercado."
    },
]

export const WhyChooseUs = () => {
    return(
        <article
        className="min-h-screen py-16 px-6 transition-colors flex flex-col gap-8 justify-center bg-[#020104]">
            <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:6xl  text-center font-bold mb-2 text-[var(--foreground)]">
                Por que escolher o ForumTech?
            </h2>
            <p
            className="text-[var(--muted-foreground)] text-[16px] text-center">
                Uma plataforma completa para desenvolvedores compartilharem conhecimento e crescerem juntos
            </p>

            <div
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full">
                {CardInformations.map((card, index) => (
                    <Cards
                    key={index}
                    icone={card.icone} 
                    title={card.title} 
                    description={card.description}
                    />
                ))}
            </div>
        </article>
    )
}