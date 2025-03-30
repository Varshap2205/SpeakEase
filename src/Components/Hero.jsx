import { useNavigate } from "react-router-dom";
import heroImg from '../assets/hero.webp';
import { FaArrowAltCircleRight } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className='bg-heroBg text-white flex items-center pt-28 md:h-screen'>
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between p-8 overflow-y-hidden gap-12 h-full'>
        {/* left */}
        <div className='md:w-1/2'>
          <h1 className='text-4xl font-secondary font-bold mb-4 md:w-3/5 leading-snug'>
            SpeakEase: Your Partner in Mental Wellness
          </h1>
          <p className='text-lg mb-12 md:pr-8'>
            At SpeakEase, we believe in the power of speaking your mind. Our platform offers a safe, supportive space 
            to explore your thoughts, connect with expert resources, and nurture emotional well-being. Whether it’s 
            overcoming challenges or finding daily balance, we’re here to help you thrive—because your mental health 
            deserves to be heard and cared for.
          </p>
          <button
  className='bg-primary text-white py-4 px-12 font-medium rounded-md hover:bg-primary/90 flex items-center gap-2'
  onClick={() => navigate('/form')} // Navigate to the form page
>
  <span>Get Started</span>
  <FaArrowAltCircleRight />
</button>

        </div>
        {/* right */}
        <div className='md:w-1/2 h-full'>
          <img src={heroImg} alt="" className='w-full object-cover' />
        </div>
      </div>
    </section>
  );
};

export default Hero;
