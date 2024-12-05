
import './App.css'
import About from './Components/About'
import Contact from './Components/Contact'
import Footer from './Components/Footer'
import Hero from './Components/Hero'
import HowItWorks from './Components/HowItWorks'
import Navbar from './Components/Navbar'
import Pricing from './Components/Pricing'
import Services from './Components/Services'
import Testimonials from './Components/Testimonials'

function App() {


  return (
    <>
    <div className='font-primary overflow-x-hidden'>
        <Navbar/>
        <Hero/>
        <Services/>
        <About/>
        <HowItWorks/>
        <Pricing/>
        <Testimonials/>
        <Contact/>
        <Footer/>
      </div>
    </>
  )
}

export default App
