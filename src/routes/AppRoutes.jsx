import { Routes, Route } from 'react-router-dom'

import SignUp from './../pages/SignupPage/SignupPage.jsx'
import NewEventPage from './../pages/NewEventPage/NewEventPage.jsx'
import LoginPage from './../pages/LoginPage/LoginPage.jsx'
import Profile from './../pages/Profile/Profile.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import EventsPage from './../pages/EventsPage/EventsPage.jsx'
import EventDetailsPage from './../pages/EventDetailsPage/EventDetailsPage.jsx'
import HomePage from './../pages/HomePage/HomePage.jsx'
import UsersPage from '../pages/UsersPage/UserPage.jsx'
import MapPage from './../pages/Map/Map.jsx'

const AppRoutes = () => {

    return (

        <Routes>
            <Route path={'/'} element={<HomePage />} />

            <Route path={'/registro'} element={<SignUp />} />
            <Route path={'/inicio-sesion'} element={<LoginPage />} />

            <Route path={'/eventos'} element={<EventsPage />} />
            <Route path={'/eventos/:event_id'} element={<EventDetailsPage />} />
            <Route path={'/mapa'} element={<MapPage />} />

            <Route element={<PrivateRoute />}>
                <Route path={'/usuarios'} element={<UsersPage />} />
                <Route path={'/crear-evento'} element={<NewEventPage />} />
                <Route path={'/perfil'} element={<Profile />} />
            </Route>

            <Route path={'*'} element={<p>EL ERROR</p>} />

        </Routes>
    )
}


export default AppRoutes