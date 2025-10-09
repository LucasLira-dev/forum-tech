import { FaUsers, FaUserSlash } from "react-icons/fa"
import { LuShield } from "react-icons/lu"
import { Card } from "../Card/card"

const CardsInfos = [
    {
        title: 'Total de Usúarios',
        icon: <FaUsers className="w-6 h-6 text-blue-500"/>,
        value: 12
    },
    {
        title: 'Usúarios Banidos',
        icon: <FaUserSlash className="w-6 h-6 text-red-500"/>,
        value: 5
    },
    {
        title: 'Administradores',
        icon: <LuShield className="w-6 h-6 text-purple-500"/>,
        value: 3
    }
]

export const CardInformations = () => {
    return(
        <article
        className="w-full flex flex-col gap-4 lg:flex-row">
            {CardsInfos.map((card, index) => (
                <Card 
                key={index}
                title={card.title}
                icon={card.icon}
                value={card.value}
                />
            ))}
        </article>
    )
}