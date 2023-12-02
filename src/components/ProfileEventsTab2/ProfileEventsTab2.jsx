import { useEffect, useState } from "react"
import EventsCard from "../EventsCard/EventsCard"
import eventServices from "../../services/event.services"

const ProfileEventsTab2 = () => {

    const [events, setEvents] = useState()


    useEffect(() => {
        loadEvents()
    }, [])

    const loadEvents = () => {
        eventServices
            .getMyEvents()
            .then(({ data }) => {
                setEvents(data)
            })
            .catch(err => console.log(err))
    }

    return (


        <EventsCard />
    )

}

export default ProfileEventsTab2