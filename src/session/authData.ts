import { baseUrl } from "@/dashboard/services/genericApi";
import { authStore } from "@/store/store"


export const useAuthData = async () =>{
    const authState = authStore.state.user;
    const authToken = authStore.state.tokens;
    const userId = authState.userId;
    const token = authToken.access_token;
    if (!userId || !token) {
      return null
    }

    const res  = await fetch(`${baseUrl}/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    if (!res.ok) {
        console.error("Failed to fetch user data:", res.statusText);
        return null;
    }
    const data = await res.json();
    return {user: data.data};
}