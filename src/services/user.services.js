import axios from 'axios'


class UserService {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/user`
        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })
    }

    findUser() {
        return this.api.get('/profile',)
    }

    editProfile(profileData) {
        return this.api.post('/editProfile', profileData)
    }

    addChild(children) {
        return this.api.post('/addChild', children)
    }

    removeChild(child) {
        return this.api.post('/removeChild', child)
    }

    getAllUser() {
        return this.api.get('/getAllUsers')
    }

    petitionFriend(friendId) {
        return this.api.post('/petitionFriend', { friendId })
    }

    addFriend(friends) {
        return this.api.post('/addFriend', { friends })
    }

    deletedFriend(friendId) {
        return this.api.post('/deletFriend', { friendId })
    }
    // body objet 
    //query : req.query
    // : req.params

}


const userservices = new UserService()

export default userservices