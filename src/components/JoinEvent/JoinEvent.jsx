// import { useContext, useState } from "react"
// import eventServices from "../../services/event.services"
// import { Button } from "react-bootstrap"
// import { AuthContext } from "../../contexts/auth.context"

// const JoinEvent = ({ refreshEvents, events }) => {

//     const { loggedUser } = useContext(AuthContext)

//     const [joinEvent, setJoinEvent] = useState({
//         participants: [],


//     })

//     const handleJoinSubmit = (_id) => {
//         eventServices
//             .joinEvent(_id)
//             .then(({ data }) => {
//                 setJoinEvent(data)
//                 refreshEvents()
//             })
//             .catch(err => console.log(err))
//     }

//     return (
//         <>
//             {
//                 events.map(elm => {
//                     <h1>{elm._id}</h1>
//                 })
//             }
//         </>
//     )
// }

// export default JoinEvent