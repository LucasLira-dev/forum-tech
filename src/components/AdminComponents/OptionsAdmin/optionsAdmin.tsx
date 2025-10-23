'use client';

import { adminService } from "@/services/adminService";
import { MappedUser, User } from "../UserManagement/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { UserManagement } from "../UserManagement/userManagement";
import { CardInformations } from "../CardInformations/cardInformations";

export const OptionAdmin = () => {
    const { data: session } = useSession();
    const token = session?.accessToken;

    const {
      data: users = [],
      isLoading,
      error,
    } = useQuery({
      queryKey: ["users", token],
      queryFn: async () => adminService.findAllUsers(token as string),
      enabled: !!token,
    });

    const mappedUsers = users.map((user: User) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdm: user.role === "admin",
      isBanned: user.isBanned,
      userAvatar: user.profile?.avatarUrl ?? undefined,
      userName: user.profile?.userName ?? undefined,
    }));

    const usersRecentes = mappedUsers.slice(0, 9);

    const admins: MappedUser[] = mappedUsers.filter(
      (user: MappedUser) => user.isAdm
    );
    const bannedUsers = mappedUsers.filter((user: MappedUser) => user.isBanned);

    if (error) {
      return (
        <p className="text-red-500">
          Erro ao carregar usuários. Tente novamente mais tarde.
        </p>
      );
    }

    return(
        <section>
            <CardInformations
            adminsCount={admins.length}
            bannedCount={bannedUsers.length}
            mappedCount={mappedUsers.length}
             />
            <UserManagement
            admins={admins}
            bannedUsers={bannedUsers}
            isLoading={isLoading}
            usersRecentes={usersRecentes}
             />
        </section>
    )
}