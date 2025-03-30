import React from 'react'
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import service1 from '../assets/service1.webp'
import service2 from '../assets/service2.png'
import service3 from '../assets/service3.png'
import service4 from '../assets/service4.webp'
const Services = () => {
  const navigate = useNavigate();
  return (
    <div id="services" className='bg-[#f7f8fc]'>
      <div className='pt-28 px-4 container mx-auto'>
        <div className='text-center space-y-5'>
          <h2 className='text-4xl font-bold font-secondary text-heroBg'>What Can We Do Together</h2>
          <p className='md:w-1/2 mx-auto'>"Together, we can break the stigma, foster understanding, promote healing, and create a supportive community for mental well-being."</p>
        </div>
        <div className='py-12 md:w-4/5 mx-auto'>
        <Tabs>
  <TabList className="flex flex-wrap justify-between items-center md:gap-8 gap-4">
    <Tab>Personalised Recomendations</Tab>
    <Tab>Chatbot</Tab>
    <Tab>Journaling</Tab>
    <Tab>Contact Therapists</Tab>
  </TabList>

  <TabPanel>
  <div className="flex flex-col md:flex-row gap-8 mt-8">
    <div className="md:w-1/2 bg-white rounded-lg p-12 font-secondary">
      <h1 className="text-2xl font-semibold mb-4 text-primary">Personalised Recomendations</h1>
      <p className="text-gray-700 mb-8">
      Receive expert-curated guidance and resources tailored to your mental health needs, helping you find the right support and coping strategies.
      </p>
      <h2 className="text-xl font-semibold mb-2">Benefits</h2>
      <ul className="list-disc list-inside space-y-3">
        <li>Personalized therapy suggestions</li>
        <li>Self-help tools for mental well-being.</li>
        <li>Mindfulness and stress-relief resources.</li>
        <li>Structured support for emotional health.</li>
      </ul>
      
    </div>
    
    <div className="md:w-1/2">
      <img src={service1} alt="Couple Counselling" className="w-full h-auto rounded-2xl object-cover md:h-[446px]"/>
    </div>
  </div>
</TabPanel>



<TabPanel>
  <div className="flex flex-col md:flex-row gap-8 mt-8">
    <div className="md:w-1/2 bg-white rounded-lg p-12 font-secondary">
      <h1 className="text-2xl font-semibold mb-4 text-primary">Chatbot
      </h1>
      <p className="text-gray-700 mb-8">
      Engage with a compassionate AI chatbot designed to offer emotional support, guidance, and helpful resources whenever you need them.
      </p>
      <h2 className="text-xl font-semibold mb-2">Benefits</h2>
      <ul className="list-disc list-inside space-y-3">
        <li>Receive immediate emotional support anytime.</li>
        <li>Get guided exercises for stress, anxiety, and mindfulness.</li>
        <li>Access coping strategies and self-care tips.</li>
        <li>Feel heard and validated in a safe, judgment-free space.</li>
      </ul>
    </div>
    
    <div className="md:w-1/2">
      <img src={service2} alt="Couple Counselling" className="w-full h-auto rounded-2xl md:h-[446px]" />
    </div>
  </div>
</TabPanel>

<TabPanel>
  <div className="flex flex-col md:flex-row gap-8 mt-8">
    <div className="md:w-1/2 bg-white rounded-lg p-12 font-secondary">
      <h1 className="text-2xl font-semibold mb-4 text-primary">Journaling</h1>
      <p className="text-gray-700 mb-8">
      Express yourself freely and reflect on your thoughts with a structured journaling tool designed to boost self-awareness and mental clarity.
      </p>
      <h2 className="text-xl font-semibold mb-2">Benefits</h2>
      <ul className="list-disc list-inside space-y-3">
        <li>Improve emotional well-being through self-expression.</li>
        <li>Track personal growth and set meaningful goals.</li>
        <li>Reduce stress and gain mental clarity.</li>
        <li>Enhance creativity and mindfulness.</li>
      </ul>
      <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300" onClick={() => navigate('/list')} >Journal</button>
    </div>
    
    <div className="md:w-1/2">
      <img src={service3} alt="Couple Counselling" className="w-full h-auto rounded-2xl object-cover md:h-[446px]" />
    </div>
  </div>
</TabPanel>

<TabPanel>
  <div className="flex flex-col md:flex-row gap-8 mt-8">
    <div className="md:w-1/2 bg-white rounded-lg p-12 font-secondary">
      <h1 className="text-2xl font-semibold mb-4 text-primary">Contact Therapists
      </h1>
      <p className="text-gray-700 mb-8">
      Connect with professional therapists who can provide personalized guidance and support to help you navigate life’s challenges.
      </p>
      <h2 className="text-xl font-semibold mb-2">Benefits</h2>
      <ul className="list-disc list-inside space-y-3">
        <li>Access expert advice tailored to your needs.</li>
        <li>Improve mental and emotional well-being.</li>
        <li>Gain coping strategies for stress and anxiety.</li>
        <li>Build a healthier mindset and lifestyle.</li>
      </ul>
    </div>
    
    <div className="md:w-1/2">
      <img src={service4} alt="Couple Counselling" className="w-full h-auto rounded-2xl object-cover md:h-[446px]" />
    </div>
  </div>
</TabPanel>
</Tabs>



        </div>
      </div>
    </div>
  )
}

export default Services
