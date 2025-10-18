const API_HOST = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const BASE_URL = `${API_HOST.replace(/\/$/, '')}/comments`;

export const commentsService = {
    createComment: async (token: string, topicId: string, content: string) => {
        try {
            const res = await fetch(`${BASE_URL}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ topicId, content })
            });
            if (!res.ok) {
                throw new Error('Failed to create comment');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    },
    updateComment: async (token: string, commentId: string, content: string) => {
        try {
            const res = await fetch(`${BASE_URL}/updateComment/${commentId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ content })
            });
            if (!res.ok) {
                throw new Error('Failed to update comment');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error updating comment:', error);
            throw error;
        }
    },
    deleteComment: async (token: string, commentId: string) => {
        try {
            const res = await fetch(`${BASE_URL}/deleteComment/${commentId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) {
                throw new Error('Failed to delete comment');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    }
}