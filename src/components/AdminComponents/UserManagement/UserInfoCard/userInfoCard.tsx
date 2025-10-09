import Avatar from "@/components/ui/avatar"
import { FaUserMinus, FaUserPlus } from "react-icons/fa"
import { FaUserCheck } from "react-icons/fa6";

interface UserInfoCardProps {
    userAvatar: string;
    userName: string;
    isAdm: boolean;
    isBanned: boolean;
}

export const UserInfoCard = ({ userAvatar, userName, isAdm, isBanned }: UserInfoCardProps) => {
    return(
    <div className="flex gap-4 items-start sm:items-center border border-[var(--border)] p-4 sm:p-6 rounded-md bg-[var(--card)]">
            <div>
                <Avatar 
                    src={userAvatar}     
                    alt="Usuário" 
                    size="lg" 
                />
            </div>

            <div className="flex flex-col gap-1 flex-1">
                <div className="relative flex flex-wrap items-baseline gap-3">
                    <span className="font-semibold text-[var(--foreground)] text-lg">{userName}</span>
                    <span className="bg-[var(--accent)] text-[var(--foreground)] rounded-md px-2 py-0.5 text-xs -translate-y-1">
                        { isAdm ? 'admin' : 'user' }
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    {
                        isBanned ?  (
                            <button className="bg-green-500 text-[var(--destructive-foreground)] rounded-md px-3 py-1 text-sm hover:brightness-95 transition flex gap-1 items-center w-fit sm:w-auto justify-center">
                                <FaUserCheck />
                                <span>Desbanir</span>
                            </button>
                        ) : (
                            <button className="bg-[var(--destructive)] text-[var(--destructive-foreground)] rounded-md px-3 py-1 text-sm hover:brightness-95 transition flex gap-1 items-center w-fit sm:w-auto justify-center">
                                <FaUserPlus />
                                <span>Banir</span>
                            </button>   
                        )
                    }

                    {
                        isAdm ? (
                            <button className="bg-[var(--destructive)] text-[var(--destructive-foreground)] rounded-md px-3 py-1 text-sm hover:brightness-95 transition flex gap-1 items-center w-fit sm:w-auto justify-center">
                                <FaUserMinus />
                                <span>Rebaixar</span>
                            </button>
                        ) : (
                            <button className="bg-[var(--accent)] text-[var(--primary-foreground)] rounded-md px-3 py-1 text-sm hover:brightness-105 transition flex gap-1 items-center w-fit sm:w-auto justify-center">
                                <FaUserPlus />
                                <span>Promover</span>
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}