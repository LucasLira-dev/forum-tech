"use client"

import Image from 'next/image'
import { FaUser } from 'react-icons/fa'

interface ProfileBannerProps {
  coverUrl?: string | null;
  avatarUrl?: string | null;
  name?: string;
}

const ProfileBanner = ({ coverUrl, avatarUrl, name = 'Usuário' }: ProfileBannerProps) => {
  return (
    <div className="w-full bg-transparent">
      <div className="w-full rounded-md bg-[var(--card)] border border-[var(--border)]">
        {/* Capa */}
        <div className="w-full h-40 md:h-48 bg-black/5 overflow-hidden rounded-t-md">
          {coverUrl ? (
            <Image src={coverUrl} alt="Capa do usuário" width={1200} height={400} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--muted-foreground)]">Sem imagem</div>
          )}
        </div>
      </div>

      {/* Avatar: posicionado sobre a capa, mais à esquerda e sem ser cortado */}
      <div className="relative">
        <div className="absolute left-4 -mt-14 md:-mt-20">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden bg-[var(--muted)] border-4 border-[var(--card)]">
            {avatarUrl ? (
              <Image src={avatarUrl} alt={`${name} avatar`} width={144} height={144} className="w-full h-full object-contain object-center bg-[var(--muted)]" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[var(--muted-foreground)] text-2xl font-bold">
                <FaUser />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Espaço para que o conteúdo abaixo não fique por trás do avatar */}
      <div className="h-16 md:h-20" />
    </div>
  )
}

export default ProfileBanner
