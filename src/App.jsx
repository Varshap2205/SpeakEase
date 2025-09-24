import { Routes, Route } from 'react-router-dom';
import Hero from './Components/Hero';
import Form from './Components/Form';
import Navbar from './Components/Navbar';
import Services from './Components/Services';
import About from './Components/About';
import HowItWorks from './Components/HowItWorks';
import Pricing from './Components/Pricing';
import Testimonials from './Components/Testimonials';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Results from './Components/Result';
import UserLogin from './Components/UserLogin';
import Journaling from './Components/Journaling';
import JournalList from './Components/JournalList';
import ViewJournal from './Components/ViewJournal';
import TherapistRegistration from './Components/TherapistRegistration';
import Admin from './Components/Admin';
import AdminLogin from './Components/AdminLogin';
import ChatbotPage from './Components/Chatbot';
import TherapistFilter from './Components/TherapistFilter';

function App() {
  return (
    <div className='font-primary overflow-x-hidden'>
      
        <Navbar />
        <Routes>
          {/* Home route rendering multiple components */}
          <Route path="/" element={
            <>
              <Hero />
              <Services />
              <About />
              <HowItWorks />
              <Pricing />
              <Testimonials />
              <Contact />
              <Footer />
            </>
          } />
          
          {/* Form and other routes */}
          <Route path="/form" element={<Form />} />
          <Route path="/result" element={<Results />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/journaling" element={<Journaling />} />
          <Route path="/list" element={<JournalList />} />
          <Route path="/journaling/:id" element={<ViewJournal />} />
          <Route path="/therapist-register" element={<TherapistRegistration />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/match-therapist" element={<TherapistFilter />} />
        </Routes>
    
    </div>
  );
}

export default App;
