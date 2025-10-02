import { DiscussionsCards } from "./discussionsCards"

const topics = [
    {
        tecnologies: [
            "nextJs",
            "react",
            "JWT"
        ],
        title: "Como implementar autenticação JWT no Next.js 15?",
        user: {
            name: "João Silva",
            avatar: "https://github.com/rocketseat.png"
        },
        time: "2",
        answers: 45
    },
    {
        tecnologies: [
            "css",
            "tailwindcss",
            "design"
        ],
        title: "Dicas para criar um design responsivo com Tailwind CSS",
        user: {
            name: "Pelé",
            avatar: "https://github.com/shadcn.png"
        },
        time: "4",
        answers: 2
    },
    {
        tecnologies: [
            "html",
            "web",
            "frontend"
        ],
        title: "Melhores práticas para otimização de SEO em sites estáticos",
       user: {
            name: "Lucas Mendes",
            avatar: "https://github.com/shadcn.png"
        },
        time: "4",
        answers: 6 
    },
]

export const FeaturedDiscussions = () => {
    return(
        <article className="min-h-screen py-16 px-6 transition-colors flex flex-col gap-4 justify-center bg-[#0a0811]">
            <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:6xl  text-center font-bold mb-2 text-[var(--foreground)]">
                Discussões em Destaque
            </h2>
            <p
            className="text-[var(--muted-foreground)] text-[16px] text-center">
                Veja as conversas mais interessantes acontecendo agora na nossa comunidade
            </p>

            <div
            className="mt-4 flex flex-col lg:flex-row lg:space-x-4">
                { topics.map((topic, index) => (
                    <DiscussionsCards
                    key={index}
                    tecnologies={topic.tecnologies}
                    title={topic.title}
                    user={topic.user}
                    time={topic.time}
                    answers={topic.answers}
                     />
                ))}
            </div>

            <button
            className="text-center bg-[var-(--background)] rounded-md px-4 py-2 mt-4 mx-auto text-[var(--primary)] font-semibold hover:bg-[var(--ring)] hover:text-[var(--foreground)] transition-colors border-1 border-[var(--background)] cursor-pointer">
                Ver mais assuntos
            </button>
        </article>
    )
}