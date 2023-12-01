import axios from 'axios'

class ChatService {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/chat`
        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    chatInit(friendId) {
        return this.api.post('/init', { friendId })
    }

    getChat() {
        return this.api.get('/getChat',)
    }

}


const chatService = new ChatService()

export default chatService