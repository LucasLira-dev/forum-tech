export type Profile = {
  userName: string;
  avatarUrl?: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  isBanned: boolean;
  profile?: Profile;
}

export interface MappedUser {
    id: string;
    name: string;
    email: string;
    isAdm: boolean;
    isBanned: boolean;
    userAvatar?: string;
    userName?: string;
    role: string
}