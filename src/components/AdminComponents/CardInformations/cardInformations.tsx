import { FaUsers, FaUserSlash } from "react-icons/fa"
import { LuShield } from "react-icons/lu"
import { Card } from "../Card/card"

interface CardInfosProps {
    mappedCount: number;
    bannedCount: number;
    adminsCount: number;
}

export const getCardsInfos = (mappedCount: number, bannedCount: number, adminsCount: number) => [
      {
          title: 'Total de Usúarios',
          icon: <FaUsers className="w-6 h-6 text-blue-500"/>,
          value: mappedCount
      },
      {
          title: 'Usúarios Banidos',
          icon: <FaUserSlash className="w-6 h-6 text-red-500"/>,
          value: bannedCount
      },
      {
          title: 'Administradores',
          icon: <LuShield className="w-6 h-6 text-purple-500"/>,
          value: adminsCount
      }
  ];

export const CardInformations = ({ mappedCount, bannedCount, adminsCount }: CardInfosProps) => {

    const cardsInfos = getCardsInfos(mappedCount, bannedCount, adminsCount);
    return(
        <article
        className="w-full flex flex-col gap-4 lg:flex-row">
            {cardsInfos.map((card, index) => (
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