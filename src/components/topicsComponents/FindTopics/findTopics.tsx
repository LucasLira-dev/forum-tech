import { FaSearch } from "react-icons/fa"
import { TopicsCards } from "../TopicsCards/topicsCards"

const topics = [
    {
        title: "Dicas para otimizar perfomance em React",
        description: "Aprenda técnicas avançadas para melhorar a performance de suas aplicações React.",
        user: {
            name: 'Gustavo guanabara',
            avatar: 'https://github.com/gustavoguanabara.png'
        },
        time: "2",
        answers: 45
    },
    {
        title: "Dicas para criar um design responsivo com Tailwind CSS",
        description: "Descubra como utilizar as utilidades do Tailwind CSS para criar layouts que se adaptam a qualquer tela.",
        user: {
            name: "Pelé",
            avatar: "https://github.com/shadcn.png"
        },
        time: "4",
        answers: 2
    },
    {
        title: "Melhores práticas para otimização de SEO em sites estáticos",
        description: "Saiba como melhorar o posicionamento do seu site nos motores de busca com técnicas de SEO específicas para sites estáticos.",
        user: {
            name: "Lucas Mendes",
            avatar: "https://github.com/LucasLira-dev.png"
            },
        time: "4",
        answers: 6 
    }
]

export const FindTopics = () => {
    return(
        <article
        className="flex flex-col">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-[var(--muted-foreground)] text-sm" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Buscar tópicos..." 
                        className="w-full pl-10 pr-4 py-2 border border-[var(--border)] rounded-md bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors" 
                    />
                </div>
                <button className="px-4 py-2 bg-transparent border-1 border-[var(--border)] text-[var(--muted-foreground)] rounded-md hover:bg-[var(--connectSection)] hover:text-[var(--foreground)] transition whitespace-nowrap cursor-pointer">
                    Buscar  
                </button>
            </div>

            <div
            className="flex flex-col mt-4">
                {
                    topics.map((topic, index) => (
                        <TopicsCards 
                        key={index}
                        title={topic.title}
                        description={topic.description}
                        user={topic.user}
                        time={topic.time}
                        answers={topic.answers}
                         />
                    ))
                }
            </div>
        </article>
    )
}