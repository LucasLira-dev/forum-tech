const API_HOST = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const BASE_URL = `${API_HOST.replace(/\/$/, '')}/user`;

export const adminService = {
    findAllUsers: async(token: string) => {
        try {
            const res = await fetch(`${BASE_URL}/profiles`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if(!res.ok){
                throw new Error("Erro ao buscar perfis")
            }

            const data = await res.json();
            return data
        }
        catch (error) {
            console.error('Erro ao buscar perfis', error);
            throw error;
        }
    },
    banUser: async(token: string, userId: string, reason: string) => {
        try {
            const res = await fetch(`${BASE_URL}/admin/${userId}/ban`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reason })
            });

            if (!res.ok){
                throw new Error("Erro ao banir usuário")
            }

            return {
                message: 'Usuário banido com sucesso'
            }
        }
        catch (error) {
            console.error('Erro ao banir usuário', error);
            throw error;
        }
    },
    unBanUser: async(token: string, userId: string) => {
        try {
            const res = await fetch(`${BASE_URL}/admin/${userId}/unban`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!res.ok){
                throw new Error("Erro ao desbanir usuário")
            }

            return {
                message: 'Usuário desbanido com sucesso'
            }
        }
        catch (error) {
            console.error('Erro ao desbanir usuário', error);
            throw error;
        }
    },
    updateRole: async(token: string,newRole: string, userId: string) => {
        const res = await fetch(`${BASE_URL}/admin/${userId}/role`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: newRole })
        });

        if (!res.ok){
            throw new Error("Erro ao promover usuário")
        }

        return {
            message: 'Usuário promovido a admin com sucesso'
        }
    }
}