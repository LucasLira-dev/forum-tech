"use client"

import * as Tabs from '@radix-ui/react-tabs';
import { FaSearch } from 'react-icons/fa';
import { UserInfoCard } from './UserInfoCard/userInfoCard';

const users = [
    { userAvatar: 'https://github.com/LucasLira-dev.png', userName: 'LucasLira-dev', isAdm: true, isBanned: false },
    { userAvatar: 'https://github.com/gustavoguanabara.png', userName: 'gustavoguanabara', isAdm: false, isBanned: false },
    { userAvatar: 'https://github.com/shadcn.png', userName: 'shadcn', isAdm: true, isBanned: false },
    { userAvatar: 'https://github.com/gaearon.png', userName: 'gaearon', isAdm: false, isBanned: false },
    { userAvatar: 'https://github.com/rauchg.png', userName: 'rauchg', isAdm: false, isBanned: true },
    { userAvatar: 'https://github.com/orta.png', userName: 'orta', isAdm: false, isBanned: false },
    { userAvatar: 'https://github.com/sindresorhus.png', userName: 'sindresorhus', isAdm: false, isBanned: false },
    { userAvatar: 'https://github.com/yyx990803.png', userName: 'yyx990803', isAdm: false, isBanned: false },
    { userAvatar: 'https://github.com/babel.png', userName: 'babel', isAdm: false, isBanned: false },
    { userAvatar: 'https://github.com/torvalds.png', userName: 'torvalds', isAdm: true, isBanned: false },
    { userAvatar: 'https://github.com/mxstbr.png', userName: 'mxstbr', isAdm: false, isBanned: false },
    { userAvatar: 'https://github.com/yyx990803.png', userName: 'evanYou', isAdm: false, isBanned: false },
    { userAvatar: 'https://github.com/fatih.png', userName: 'fatih', isAdm: false, isBanned: true },
    { userAvatar: 'https://github.com/addyosmani.png', userName: 'addyosmani', isAdm: false, isBanned: false },
    { userAvatar: 'https://github.com/bradfitz.png', userName: 'bradfitz', isAdm: false, isBanned: false },
];

export const UserManagement = () => {

    const usersRecentes = users.slice(0, 9);
    const admins = users.filter(user => user.isAdm);
    const bannedUsers = users.filter(user => user.isBanned);

    return(
        <article className="bg-[var(--card)] p-6 rounded-lg shadow-md flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Gerenciamento de usuários</h2>

            <div className="flex gap-2 items-center">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-[var(--muted-foreground)] text-sm" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Buscar usuários..." 
                        className="w-full pl-10 pr-4 py-2 border border-[var(--border)] rounded-md bg-[var(--input)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors" 
                    />
                </div>

                <button className="px-4 py-2 bg-transparent border border-[var(--border)] text-[var(--muted-foreground)] rounded-md hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition whitespace-nowrap">
                    Buscar
                </button>
            </div>

            {/* Tabs: Busca, Recentes, Admins, Banidos */}
            <Tabs.Root defaultValue="search" className="w-full">
                <Tabs.List className="flex flex-wrap items-center justify-start gap-1 bg-transparent p-4 sm:p-2">
                    <Tabs.Trigger
                        value="search"
                        className="flex justify-center items-center gap-2 px-3 py-2 rounded-md text-[var(--muted-foreground)] bg-[var(--accent)] hover:bg-[var(--muted)] transition-colors text-center data-[state=active]:bg-[color:var(--muted)] data-[state=active]:text-[var(--foreground)] data-[state=active]:font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                    >
                        <span className="text-sm">Busca</span>
                    </Tabs.Trigger>

                    <Tabs.Trigger
                        value="recent"
                        className="flex justify-center items-center gap-2 px-3 py-2 rounded-md text-[var(--muted-foreground)] bg-[var(--accent)] hover:bg-[var(--muted)] transition-colors text-center data-[state=active]:bg-[color:var(--muted)] data-[state=active]:text-[var(--foreground)] data-[state=active]:font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                    >
                        <span className="text-sm">Recentes</span>
                    </Tabs.Trigger>

                    <Tabs.Trigger
                        value="admins"
                        className="flex justify-center items-center gap-2 px-3 py-2 rounded-md text-[var(--muted-foreground)] bg-[var(--accent)] hover:bg-[var(--muted)] transition-colors text-center data-[state=active]:bg-[color:var(--muted)] data-[state=active]:text-[var(--foreground)] data-[state=active]:font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                    >
                        <span className="text-sm">Adm&#39;s</span>
                    </Tabs.Trigger>

                    <Tabs.Trigger
                        value="banned"
                        className="flex justify-center items-center gap-2 px-3 py-2 rounded-md text-[var(--muted-foreground)] bg-[var(--accent)] hover:bg-[var(--muted)] transition-colors text-center data-[state=active]:bg-[color:var(--muted)] data-[state=active]:text-[var(--foreground)] data-[state=active]:font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                    >
                        <span className="text-sm">Banidos</span>
                    </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="search" className="mt-4">
                    <div className="w-full p-4 rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)]">
                        Resultados da busca aparecerão aqui.
                    </div>
                </Tabs.Content>

                <Tabs.Content value="recent" className="mt-4">
                   <div className=" flex flex-col gap-2">
                        { 
                            usersRecentes.map((user, index) => (
                                <UserInfoCard 
                                    key={index}
                                    userAvatar={user.userAvatar}
                                    userName={user.userName}
                                    isAdm={user.isAdm}
                                    isBanned={user.isBanned}
                                 />
                            ))
                        }
                    </div>
                </Tabs.Content>

                <Tabs.Content value="admins" className="mt-4">
                    <div className="flex flex-col gap-2">
                        {
                            admins.length > 0 ? (
                                admins.map((admin, index) => (
                                    <UserInfoCard 
                                        key={index}
                                        userAvatar={admin.userAvatar}
                                        userName={admin.userName}
                                        isAdm={admin.isAdm}
                                        isBanned={admin.isBanned}
                                    />
                                ))
                            ) : (
                                <p className="text-sm">Nenhum administrador encontrado.</p>
                            )
                        }
                    </div>
                </Tabs.Content>

                <Tabs.Content value="banned" className="mt-4">
                    <div className="flex flex-col gap-2">
                        {
                            bannedUsers.length > 0 ? (
                                bannedUsers.map((banned, index) => (
                                    <UserInfoCard 
                                        key={index}
                                        userAvatar={banned.userAvatar}
                                        userName={banned.userName}
                                        isAdm={banned.isAdm}
                                        isBanned={banned.isBanned}
                                    />
                                ))
                            ) : (
                                <p className="text-sm">Nenhum usuário banido encontrado.</p>
                            )
                        }
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </article>
    )
}