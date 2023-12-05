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

    sendChat(chatId, msn) {
        console.log('----------------------servicio', chatId, msn, 'ggggggggggggggggggggggggggggggggggg')
        return this.api.post('/send', { chatId, msn })
    }

    getOneChats(chatId) {
        return this.api.get(`/getOneChat/${chatId}`,)
    }

}


const chatService = new ChatService()

export default chatService