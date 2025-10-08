import { FaSearch } from "react-icons/fa"
import { TopicsCards } from "../TopicsCards/topicsCards"

export const topics = [
    {
        id: "assjkssjssdns",    
        title: "Dicas para otimizar perfomance em React",
        description: "Estou enfrentando problemas de performance em uma aplicação React com muitos componentes. Gostaria de compartilhar algumas técnicas que descobri recentemente: uso de React.memo, useMemo e useCallback para evitar re-renders desnecessários. Também implementei lazy loading com Suspense e code splitting para reduzir o bundle inicial. Alguém tem outras sugestões para otimização? Principalmente para listas grandes e componentes pesados que fazem muitas requisições à API.",
        user: {
            name: 'Gustavo guanabara',
            avatar: 'https://github.com/gustavoguanabara.png'
        },
        time: "2",
        answers: 45,
        comments: [
            {
                id: "1",
                userName: "Ana Silva",
                avatar: "https://github.com/anasilva.png",
                description: "Excelente post! Além das técnicas que você mencionou, recomendo também usar React DevTools Profiler para identificar exatamente onde estão os gargalos. Tenho usado muito windowing com react-window para listas grandes.",
                time: "1h"
            },
            {
                id: "2",
                userName: "Lucas mndes",
                avatar: "https://github.com/LucasLira-dev.png",
                description: "Uma dica que salvou meu projeto foi implementar debounce nos inputs de busca. Também descobri que mover estado para baixo na árvore de componentes reduz drasticamente re-renders desnecessários.",
                time: "3h"
            },
            {
                id: "3",
                userName: "Julia Costa",
                avatar: "https://github.com/juliacosta.png",
                description: "Para APIs, recomendo muito React Query ou SWR. Eles fazem cache inteligente e reduzem requisições duplicadas. Combinado com Suspense, a UX fica muito melhor.",
                time: "5h"
            }
        ]
    },
    {
        id: "ash2gwqvvsw22ww",
        title: "Dicas para criar um design responsivo com Tailwind CSS",
        description: "Recentemente migrei um projeto para Tailwind CSS e quero compartilhar minha experiência criando layouts verdadeiramente responsivos. Descobri que usar as classes sm:, md:, lg: e xl: de forma estratégica faz toda diferença. Além disso, aprendi a trabalhar com containers responsivos, grid layouts que se adaptam automaticamente e como criar componentes que funcionam bem tanto em mobile quanto desktop. O sistema de breakpoints do Tailwind é muito mais intuitivo que media queries tradicionais. Vou mostrar alguns exemplos práticos de como estruturei cards, navegação e formulários que ficaram perfeitos em todas as telas.",
        user: {
            name: "Pelé",
            avatar: "https://github.com/shadcn.png"
        },
        time: "4",
        answers: 2,
        comments: [
            {
                id: "1",
                userName: "Lucas mndes",
                avatar: "https://github.com/LucasLira-dev.png",
                description: "Tailwind realmente mudou minha forma de trabalhar com CSS! Uma dica: use o plugin container queries para responsividade baseada no container, não apenas na viewport.",
                time: "2h"
            },
            {
                id: "2",
                userName: "Marina Oliveira",
                avatar: "https://github.com/marinaoliveira.png",
                description: "Concordo totalmente! O sistema de grid do Tailwind é muito mais intuitivo. Tenho usado muito as classes aspect-ratio também para manter proporções em diferentes telas.",
                time: "6h"
            }
        ]
    },
    {
        id: "jknahkhshkwbqqss",
        title: "Melhores práticas para otimização de SEO em sites estáticos",
        description: "Trabalho com Next.js e Gatsby há alguns anos e quero compartilhar estratégias de SEO que realmente funcionam para sites estáticos. Primeiro, a estrutura de meta tags deve ser impecável - Open Graph, Twitter Cards, structured data com JSON-LD. Segundo, otimização de imagens é crucial: WebP, lazy loading e responsive images. Terceiro, performance é fator de ranking: Core Web Vitals, lighthouse scores acima de 90. Também descobri que sitemaps dinâmicos e URLs semânticas fazem diferença significativa. Preciso de feedback sobre robots.txt e como configurar corretamente canonical URLs em SPAs.",
        user: {
            name: "Lucas Mendes",
            avatar: "https://github.com/LucasLira-dev.png"
        },
        time: "4",
        answers: 6,
        comments: [
            {
                id: "1",
                userName: "Roberto Ferreira",
                avatar: "https://github.com/robertoferreira.png",
                description: "Sobre robots.txt, é importante ter cuidado com SPAs. Recomendo usar prerendering ou SSG para páginas importantes. O Google Bot consegue executar JS, mas nem sempre indexa corretamente.",
                time: "1h"
            },
            {
                id: "2",
                userName: "Fernanda Alves",
                avatar: "https://github.com/fernandaalves.png",
                description: "Para canonical URLs em SPAs, uso sempre tags canonical dinâmicas que se atualizam com as rotas. Também implementei breadcrumbs com structured data - fez diferença no ranking!",
                time: "3h"
            },
            {
                id: "3",
                userName: "Diego Martins",
                avatar: "https://github.com/diegomartins.png",
                description: "Core Web Vitals são cruciais mesmo! Consegui melhorar CLS usando dimensões fixas em imagens e LCP otimizando fontes. Lighthouse CI no pipeline ajuda muito a manter as métricas.",
                time: "4h"
            },
            {
                id: "4",
                userName: "Camila Rocha",
                avatar: "https://github.com/camilarocha.png",
                description: "JSON-LD é subestimado! Implementei para artigos e eventos, aumentou muito a visibilidade nos rich snippets. Google Search Console mostra o impacto claramente.",
                time: "7h"
            },
            {
                id: "5",
                userName: "Bruno Souza",
                avatar: "https://github.com/brunosouza.png",
                description: "Uma dica para Next.js: usar next/image com priority nas imagens above-the-fold melhorou muito meu LCP. Também configurei headers de cache no next.config.js.",
                time: "8h"
            },
            {
                id: "6",
                userName: "Isabela Santos",
                avatar: "https://github.com/isabelasantos.png",
                description: "Para sitemaps dinâmicos, criei um script que gera automaticamente baseado nas rotas do projeto. Integrei com o build process e nunca mais esqueci de atualizar!",
                time: "12h"
            }
        ]
    },
    {
        id: "asjjsjsjsjsjs",
        title: "Como gerenciar estado global em aplicações React complexas",
        description: "Tenho trabalhado em aplicações React cada vez mais complexas e a gestão de estado global se tornou um desafio. Inicialmente usei Context API, mas com o crescimento da aplicação, percebi que precisava de algo mais robusto. Migrei para Redux, o que ajudou bastante, mas a verbosidade do código e a curva de aprendizado para novos desenvolvedores foram pontos negativos. Recentemente, comecei a explorar Recoil e Zustand como alternativas mais leves e modernas. Alguém tem experiência com essas bibliotecas? Quais são as melhores práticas para escolher a solução de estado global certa dependendo do tamanho e complexidade da aplicação?",
        user: {
            name: "Marcos Paulo",
            avatar: "https://github.com/marcospaulo.png"
        },
        time: "1h",
        answers: 0,
        comments: []
    }
];

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
                        id={topic.id}
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