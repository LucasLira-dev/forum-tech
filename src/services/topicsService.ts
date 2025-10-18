

interface CreateTopicData {
    title: string;
    description: string;
    technologies: string[];
}

const API_HOST = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const BASE_URL = `${API_HOST.replace(/\/$/, '')}/topic`;

export const topicsService = {
    createTopic: async (token: string, topicData: CreateTopicData) => {
        try {
            const res = await fetch(`${BASE_URL}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(topicData)
            });
            if (!res.ok) {
                throw new Error('Failed to create topic');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error creating topic:', error);
            throw error;
        }
    },
    getAllTopics: async (token: string) => {
        try {
            const res = await fetch(`${BASE_URL}/allTopics`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) {
                throw new Error('Failed to fetch topics');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error fetching topics:', error);
            throw error;    
        }
    },
    searchTopics: async (token: string, q: string) => {
        try {
            const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(q)}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) {
                throw new Error('Failed to search topics');
            }
            const data = await res.json();
            return data;
        }
        catch (error) {
            console.error('Error searching topics:', error);
            throw error;    
        }
    },
    getTopicDetails: async (topicId: string) => {
        try {
            const res = await fetch(`${BASE_URL}/${encodeURIComponent(topicId)}`, {
                method: 'GET',
            });
            if (!res.ok) {
                throw new Error('Failed to fetch topic details');
            }
            const data = await res.json();
            return data;
        }
        catch (error) {
            console.error('Error fetching topic details:', error);
            throw error;
        }
    },
    getTopicsByUser: async (userName: string) => {
        try {
            const res = await fetch(`${BASE_URL}/user/${encodeURIComponent(userName)}`, {
                method: 'GET',
            });
            if (!res.ok) {
                throw new Error('Failed to fetch topics by user');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error fetching topics by user:', error);
            throw error;
        }
    },
    updateTopic: async (token: string, topicId: string, description: string) => {
        try {
            const res = await fetch(`${BASE_URL}/${topicId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ description })
            });
            if (!res.ok) {
                throw new Error('Failed to update topic');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error updating topic:', error);
            throw error;
        }
    },
    deleteTopic: async (token: string, topicId: string) => {
        try {
            const res = await fetch(`${BASE_URL}/${topicId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) {
                throw new Error('Failed to delete topic');
            }
            return {
                message: 'Topic deleted successfully'
            }
        }
        catch (error) {
            console.error('Error deleting topic:', error);
            throw error;
        }
    }
}