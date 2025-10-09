'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { FaUser, FaCog } from 'react-icons/fa';
import { UserCoverUploader } from './UserCoverUploader/userCoverUploader';
import { UserAvatarUpload } from './UserAvatarUpload/userAvatarUpload';
import { BasicInformation } from './BasicInformation/basicInformation';
import { UpdateEmail } from '../ConfigTabs/UpdateEmail/updateEmail';
import { UpdatePassword } from '../ConfigTabs/UpdatePassword/updatePassword';
import { ChangePrivacity } from '../ConfigTabs/ChangePrivacity/changePrivacity';

interface ProfileTabsProps {
  defaultTab?: 'profile' | 'settings';
}

export const ProfileTabs = ({ defaultTab = 'profile' }: ProfileTabsProps) => {
  return (
    <Tabs.Root defaultValue={defaultTab} className="w-full">
      <Tabs.List className="flex items-center justify-center gap-1 bg-transparent p-2">
        <Tabs.Trigger
          value="profile"
          className="flex justify-center items-center gap-2 px-4 py-2 rounded-md text-[var(--muted-foreground)] bg-[var(--accent)] hover:bg-[var(--muted)] transition-colors text-center data-[state=active]:bg-[color:var(--muted)] data-[state=active]:text-[var(--foreground)] data-[state=active]:font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] w-full"
        >
          <FaUser className="text-[var(--muted-foreground)] data-[state=active]:text-[var(--foreground)]" />
          <span className="text-sm">Perfil</span>
        </Tabs.Trigger>

        <Tabs.Trigger
          value="settings"
          className="flex justify-center items-center gap-2 px-4 py-2 rounded-md text-[var(--muted-foreground)] bg-[var(--accent)] hover:bg-[var(--muted)] transition-colors text-center data-[state=active]:bg-[color:var(--muted)] data-[state=active]:text-[var(--foreground)] data-[state=active]:font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] w-full"
        >
          <FaCog className="text-[var(--muted-foreground)] data-[state=active]:text-[var(--foreground)]" />
          <span className="text-sm">Configurações</span>
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="profile" className="mt-4 flex flex-col gap-5">
        <UserCoverUploader />
        <UserAvatarUpload />
        <BasicInformation />
        <div 
        className="flex gap-2 mt-4">
          <button
          type="button"
          className="flex justify-center items-center gap-2 bg-transparent border border-[var(--border)] text-[var(--muted-foreground)] rounded-md px-4 py-2 w-full sm:w-fit hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition font-bold text-center cursor-pointer">
            Cancelar
          </button>
          <button
          type="button"
          className="flex justify-center items-center gap-2 bg-[var(--muted)] text-[var(--primary-foreground)] rounded-md px-4 py-2 w-full sm:w-fit hover:brightness-110 transition font-bold text-center cursor-pointer">
            Salvar
          </button>
      </div>
      </Tabs.Content>

      <Tabs.Content value="settings" className="mt-4 flex flex-col gap-5">
        <UpdateEmail />
        <UpdatePassword />
        <ChangePrivacity />

        {/* Deletar conta */}
        <div className="w-full p-4 rounded-md border border-[var(--border)] bg-[var(--card)]">
          <h3 className="text-lg font-semibold">Deletar conta</h3>
          <p className="text-[var(--muted-foreground)] text-sm mt-2">Ao deletar sua conta, todos os seus dados serão removidos permanentemente. Esta ação não pode ser desfeita.</p>

          <div className="mt-4 flex items-center gap-3">
            <input id="confirm-delete" type="checkbox" className="w-4 h-4" />
            <label htmlFor="confirm-delete" className="text-[var(--muted-foreground)] text-sm">Confirmo que desejo deletar minha conta</label>
          </div>

          <button
            type="button"
            onClick={() => { /* placeholder: chamar API para deletar conta */ }}
            className="mt-4 bg-[var(--destructive)] text-[var(--destructive-foreground)] rounded-md px-4 py-2 hover:brightness-95 transition font-bold"
          >
            Deletar conta
          </button>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default ProfileTabs;
