interface MyProfileData {
    userName: string;
    bio?: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const BASE_URL = `${API_HOST.replace(/\/$/, '')}/profile`;
const USER_URL = `${API_HOST.replace(/\/$/, '')}/user`;

export const myProfileService = {
    getMyProfile: async (token: string) => {
        try {
            const res = await fetch(`${BASE_URL}/my-profile`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) {
                if (res.status === 404) {
                    return {
                    avatarUrl: undefined,
                    capaUrl: undefined,
                    userName: "",
                    bio: "",
                    isPublic: false
                    };
                }
                throw new Error('Failed to fetch user profile');
            }
            const data = await res.json();
            return data;
        }
        catch (error) {
            console.error(error);   
            throw new Error('Failed to fetch user profile');
        }
    },
    updateMyProfile: async (token: string, profileData: MyProfileData) => {
        try {
            console.log('[updateMyProfile] Payload enviado:', profileData);
            const res = await fetch(`${BASE_URL}/update-profile`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(profileData)
            });
            if (!res.ok) {
                let errorMsg = 'Failed to update user profile';
                try {
                    const errorData = await res.json();
                    console.error('[updateMyProfile] Erro da API:', errorData);
                    if (errorData?.message) errorMsg += `: ${errorData.message}`;
                } catch (e) {
                    console.error('[updateMyProfile] Erro ao ler resposta da API:', e);
                }
                throw new Error(errorMsg);
            }
            const data = await res.json();
            console.log('[updateMyProfile] Resposta da API:', data);
            return data;
        }
        catch (error) {
            console.error('[updateMyProfile] Exception:', error);
            throw new Error('Failed to update user profile');
        }
    },
    uploadAvatar: async (token: string, avatarFile: File) => {
        try {
            const formData = new FormData();
            formData.append('file', avatarFile);

            const res = await fetch(`${BASE_URL}/upload-avatar`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            if (!res.ok) {
                throw new Error('Failed to upload avatar');
            }
            const data = await res.json();
            return data;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to upload avatar');
        }
    },
    uploadCapa: async (token: string, capaFile: File) => {
        try {
            const formData = new FormData();
            formData.append('file', capaFile);

            const res = await fetch(`${BASE_URL}/upload-capa`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            if (!res.ok) {
                throw new Error('Failed to upload capa');
            }
            const data = await res.json();
            return data;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to upload capa');
        }
    },
    updatePrivacity: async (token: string, isPublic: boolean) => {
        try {
            const res = await fetch(`${BASE_URL}/update-visibility`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ isPublic })
            });

            if(!res.ok) {
                throw new Error('Failed to update profile visibility');
            }

            const data = await res.json();
            return data;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update profile visibility');
        }
    },
    deleteAccount: async (token: string) => {
        try {
            const res = await fetch(`${USER_URL}/deleteAccount`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) {
                throw new Error('Failed to delete profile');
            }

            return {
                message: 'Profile deleted successfully'
            }
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete profile');
        }
    },

    updateEmail: async (token: string, newEmail: string, password: string) => {
        try {
            const res = await fetch(`${USER_URL}/updateEmail`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: newEmail,
                    password
                })
            })

            if(!res.ok){
                throw new Error('Failed to update email')
            }

            const data = await res.json()
            return {
                message: 'Email atualizado com sucesso!',
                data
            }
        }
        catch(error){
            console.log(error)
            throw new Error('Failed to update Email')
        }
    },

    updatePassword: async (token: string, currentPassword: string, newPassword: string) => {
        try {
            const res = await fetch(`${USER_URL}/updatePassword`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    oldPassword: currentPassword,
                    newPassword
                })
            })

            if(!res.ok){
                throw new Error('Failed to update password')
            }

            return {
                message: 'Senha atualizada com sucesso!',
            }
        }
        catch(error){
            console.log(error)
            throw new Error('Failed to update password')
        }
    }

}