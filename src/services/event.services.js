import axios from 'axios'

class EventService {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}/event`
        })
        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    getEvents() {
        return this.api.get("/getAllEvents")
    }

    getEventDetails(event_id) {
        return this.api.get(`/getOneEvent/${event_id}`)
    }

    createEvent(eventData) {
        return this.api.post("/create", eventData)

    }

    joinEvent(eventId) {
        return this.api.post("/joinEvent", { eventId })
    }

    deletedJoin(eventId) {
        return this.api.post('/deleteJoin', { eventId })
    }
}


const eventServices = new EventService()

export default eventServices