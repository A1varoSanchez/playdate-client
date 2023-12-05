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

    getUserEvents() {
        return this.api.get("/userEvents")
    }

    getUserJoinedEvents() {
        return this.api.get("/userJoinedEvents")
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

    editEvent(eventId, eventInfo) {
        return this.api.post(`/edit/${eventId}`, eventInfo)
    }

    deleteEvent(event_id) {
        return this.api.post(`/delete/${event_id}`)
    }

    deletedJoin(eventId) {
        return this.api.post('/deleteJoin', { eventId })
    }

    searchByType(searchType) {
        return this.api.get(`/searchType?type=${searchType}`)
    }
    getMyEvents() {
        return this.api.get('/getMyEvents')
    }

    getJoinedEvents() {
        return this.api.get('/getJoinedEvents')
    }

    sendComments(eventId, msn) {
        return this.api.post(`/sendComments/`, { eventId, msn })
    }

}


const eventServices = new EventService()

export default eventServices