'use client';

import Avatar from "@/components/ui/avatar"
import { FaUserMinus, FaUserPlus } from "react-icons/fa"
import { FaUserCheck } from "react-icons/fa6";
import { useState } from "react";
import { BanReasonAlert } from "@/components/Alerts/banReasonAler";
import { adminService } from "@/services/adminService";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UserInfoCardProps {
    id: string;
    userAvatar: string;
    userName: string;
    isAdm: boolean;
    isBanned: boolean;
}

export const UserInfoCard = ({ id, userAvatar, userName, isAdm, isBanned }: UserInfoCardProps) => {
    const { data: session } = useSession();
    const token = session?.accessToken
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState<"ban" | "unban">("ban");
    const [isLoading, setIsLoading] = useState(false);

    const isMyAccount = id === session?.user?.id;

    const queryClient = useQueryClient();

    const banMutation = useMutation({
      mutationFn: ( { token, reason, userId }: { token: string; reason: string; userId: string } ) => adminService.banUser(token, userId, reason),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users', token] });
      },
    });

    const unbanMutation = useMutation({
      mutationFn: ( { token, userId }: { token: string; userId: string } ) => adminService.unBanUser(token, userId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users', token] });
      },
    });

    const updateRole = useMutation({
      mutationFn: ( { token, newRole, userId }: { token: string; newRole: string; userId: string } ) => adminService.updateRole(token, newRole, userId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users', token] });
      },
    });

    const handleBanClick = () => {
        setAlertType("ban");
        setShowAlert(true);
    };

    const handleUnbanClick = async () => {
      if(!token) return;
      try {
        setIsLoading(true);
        await unbanMutation.mutateAsync({ token, userId: id });
      }
      catch (error) {
        console.error("Erro ao processar a ação de desbanimento", error);
      }
      finally {
        setIsLoading(false);
      }
    }

    const handleConfirm = async (reason: string) => {
        if (!token) return;
        try {
            setIsLoading(true);
            await banMutation.mutateAsync({ token, reason, userId: id });
        }
        catch (error) {
            console.error("Erro ao processar a ação de banimento", error);
        }
        finally {
            setIsLoading(false);
            setShowAlert(false);
        }
    }

    const handleCancel = () => {
        setShowAlert(false);
    }

    return (
      <div className="flex gap-4 items-start sm:items-center border border-[var(--border)] p-4 sm:p-6 rounded-md bg-[var(--card)]">
        <div>
          <Avatar src={userAvatar} alt="Usuário" size="lg" />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <div className="relative flex flex-wrap items-baseline gap-3">
            <span className="font-semibold text-[var(--foreground)] text-lg">
              {userName}
            </span>
            <span className="bg-[var(--accent)] text-[var(--foreground)] rounded-md px-2 py-0.5 text-xs -translate-y-1">
              {isAdm ? "admin" : "user"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {isBanned ? (
              <button className="bg-green-500 text-[var(--destructive-foreground)] rounded-md px-3 py-1 text-sm hover:brightness-95 transition flex gap-1 items-center w-fit sm:w-auto justify-center"
              onClick={handleUnbanClick}>
                <FaUserCheck />
                <span> {isLoading ? 'Desbanindo...' : "Desbanir"}</span>
              </button>
            ) : (
              <button className="bg-[var(--destructive)] text-[var(--destructive-foreground)] rounded-md px-3 py-1 text-sm hover:brightness-95 transition flex gap-1 items-center w-fit sm:w-auto justify-center"
              onClick={handleBanClick}
              disabled={isAdm}>
                <FaUserPlus />
                <span>Banir</span>
              </button>
            )}

            {isAdm ? (
              <button className="bg-[var(--destructive)] text-[var(--destructive-foreground)] rounded-md px-3 py-1 text-sm hover:brightness-95 transition flex gap-1 items-center w-fit sm:w-auto justify-center"
              disabled={isMyAccount}
              onClick={()=> {
                if(!token) return
                updateRole.mutate({ token, newRole: "user", userId: id });
              }}>
                <FaUserMinus />
                <span>Rebaixar</span>
              </button>
            ) : (
              <button 
              className="bg-[var(--accent)] text-[var(--primary-foreground)] rounded-md px-3 py-1 text-sm hover:brightness-105 transition flex gap-1 items-center w-fit sm:w-auto justify-center"
              disabled={isMyAccount}
              onClick={() => {
                if (!token) return;
                updateRole.mutate({ token, newRole: "admin", userId: id });
              }}>
                <FaUserPlus />
                <span>Promover</span>
              </button>
            )}
          </div>
        </div>
        <BanReasonAlert
          isOpen={showAlert}
          type={alertType}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    );
}