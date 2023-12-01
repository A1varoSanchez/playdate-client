import CarouselItem from 'react-bootstrap/esm/CarouselItem'
import CarouselCaption from 'react-bootstrap/esm/CarouselCaption'
import Carousel from 'react-bootstrap/Carousel'

import naturaleza1 from '../../assets/naturaleza1.jpg'
import naturaleza2 from '../../assets/naturaleza2.jpg'
import cocina from '../../assets/cocina.jpg'
import futbol from '../../assets/futbol.jpg'
import museo from '../../assets/museo.jpg'
import musica from '../../assets/musica.jpg'
import natacion from '../../assets/natacion.jpg'
import parque from '../../assets/parque.jpg'
import pintura from '../../assets/pintura.jpg'
import teatro from '../../assets/teatro.jpg'

import './HomePageCarousel.css'

function HomeCarousel() {

    const carouselItemStyle = {
        height: '91vh',
        overflow: 'hidden',
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'brightness(60%)'
    }

    const captionStyle = {
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)',

    }


    return (
        <Carousel>
            <CarouselItem style={carouselItemStyle}>
                <img src={parque} alt="outdoors" style={imageStyle} />
                <CarouselCaption style={captionStyle} className='Carousel'>
                    <h1>Amistades para toda la vida</h1>
                    <h6>Forjando lazos duraderos a través del juego y la exploración.</h6>
                </CarouselCaption>
            </CarouselItem>

            <CarouselItem style={carouselItemStyle}>
                <img src={museo} alt="museum" style={imageStyle} />
                <CarouselCaption style={captionStyle}>
                    <h1>Despierta su curiosidad</h1>
                    <h6>Fomenta su desarrolo intelectual mientras se divierten.</h6>
                </CarouselCaption>
            </CarouselItem>

            <CarouselItem style={carouselItemStyle}>
                <img src={futbol} alt="football" style={imageStyle} />
                <CarouselCaption style={captionStyle}>
                    <h1>Un equipo imparable</h1>
                    <h5>Fomenta el trabajo en equipo y la camaradería.</h5>
                </CarouselCaption>
            </CarouselItem>

            <CarouselItem style={carouselItemStyle}>
                <img src={natacion} alt="swimming" style={imageStyle} />
                <CarouselCaption style={captionStyle}>
                    <h1>Haciendo olas</h1>
                    <h5>Conoce a otros padres en una etapa similar a la tuya.</h5>
                </CarouselCaption>
            </CarouselItem>

            <CarouselItem style={carouselItemStyle}>
                <img src={naturaleza1} alt="girls-in-nature" style={imageStyle} />
                <CarouselCaption style={captionStyle}>
                    <h1>Aire libre </h1>
                    <h5>Sumérgete en la naturaleza con tus peques.</h5>
                </CarouselCaption>
            </CarouselItem>


            <CarouselItem style={carouselItemStyle}>
                <img src={naturaleza2} alt="outdoors" style={imageStyle} />
                <CarouselCaption style={captionStyle}>
                    <h1>Siempre curiosos</h1>
                    <h5>Descubriendo las maravillas de la naturaleza y de la amistad.</h5>
                </CarouselCaption>
            </CarouselItem>

            <CarouselItem style={carouselItemStyle}>
                <img src={cocina} alt="cooking-class" style={imageStyle} />
                <CarouselCaption style={captionStyle}>
                    <h1>Pequeños chefs, grandes amistades</h1>
                    <h5>¿Qué hay mejor que un pastel? Un pastel hecho por tu peque.</h5>
                </CarouselCaption>
            </CarouselItem>

            <CarouselItem style={carouselItemStyle}>
                <img src={teatro} alt="theatre" style={imageStyle} />
                <CarouselCaption style={captionStyle}>
                    <h1>Expresión y desarrollo</h1>
                    <h5>Desata su creatividad a través de roles imaginativos.</h5>
                </CarouselCaption>
            </CarouselItem>

            <CarouselItem style={carouselItemStyle}>
                <img src={pintura} alt="painting" style={imageStyle} />
                <CarouselCaption style={captionStyle}>
                    <h1>Futuros artistas</h1>
                    <h5>Los amigos que crean unidos, permanecen unidos.
                    </h5>
                </CarouselCaption>
            </CarouselItem>

            <CarouselItem style={carouselItemStyle}>
                <img src={musica} alt="music-class" style={imageStyle} />
                <CarouselCaption style={captionStyle}>
                    <h1>Desarrollo musical</h1>
                    <h5>Fomenta la pasión por la música de los más peques.</h5>
                </CarouselCaption>
            </CarouselItem>

        </Carousel>
    )
}


export default HomeCarousel