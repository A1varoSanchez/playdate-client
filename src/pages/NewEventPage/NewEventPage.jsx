import NewEventForm from './../../components/NewEventForm/NewEventForm.jsx'
import { Container } from 'react-bootstrap'

const NewEventPage = () => {

    return (

        <Container>
            <h1>Nuevo evento</h1>

            <NewEventForm />
        </Container>
    )
}


export default NewEventPage