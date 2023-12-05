import { createContext, useEffect, useState } from "react"
import authService from './../services/auth.services'

const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [loggedUser, setLoggedUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    const authenticateUser = () => {

        const token = localStorage.getItem('authToken')

        if (token) {

            authService
                .verify(token)
                .then(({ data }) => {
                    setLoggedUser(data.loggedUser)
                    setIsLoading(false)
                    setIsAdmin(data.loggedUser.role === 'ADMIN')
                })
                .catch(err => console.log(err))
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        setLoggedUser(null)
        setIsLoading(false)
        setIsAdmin(false)
    }

    useEffect(() => {
        authenticateUser()
    }, [])


    return (
        <AuthContext.Provider value={{ loggedUser, authenticateUser, logout, isLoading, isAdmin }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export { AuthContext, AuthProviderWrapper }