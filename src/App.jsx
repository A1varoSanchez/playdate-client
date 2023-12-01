import Footer from './components/Footer/Footer'
import Navigation from './components/Navigation/Navigation'

import "./App.css"

import AppRoutes from './routes/AppRoutes'


function App() {

  return (

    <div className='App'>

      <Navigation />

      <AppRoutes />

      <Footer />

    </div>
  )
}


export default App