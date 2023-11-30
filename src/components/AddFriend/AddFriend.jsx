// import { useContext, useState } from "react"
// import { AuthContext } from "../../contexts/auth.context"
// import { useParams } from "react-router-dom"
// import userservices from "../../services/user.services"
// import { Button } from "react-bootstrap"


// // const AddFriendsForm = () => {

// //     const { loggedUser } = useContext(AuthContext)
// //     const { _id } = useParams()

// //     const [addFriend, setAddFriend] = useState({
// //         friends: [{}],
// //     })


// //     const handleInputChange = e => {
// //         const { value, name } = e.currentTarget
// //         setAddFriend({ ...addFriend, [name]: value })
// //     }

// //     const handleEventSubmit = e => {

// //         e.preventDefault()

// //         if (loggedUser._id === _id) {
// //             userservices
// //                 .addFriend(addFriend)
// //                 .then(({ data }) => {
// //                     setAddFriend(data)
// //                 })
// //                 .catch(err => console.log(err))
// //         }
// //     }

// return (

//     <Button>b</Button>


// )
// //}

// export default AddFriendsForm