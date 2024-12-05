import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import service1 from '../assets/service1.webp'
import service2 from '../assets/service2.webp'
import service3 from '../assets/service3.webp'
import service4 from '../assets/service4.webp'
const Services = () => {
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
    <Tab>Couple Counselling</Tab>
    <Tab>Parenting Skills</Tab>
    <Tab>Feeling Stuck</Tab>
    <Tab>Self Confidence</Tab>
  </TabList>

  <TabPanel>
  <div className="flex flex-col md:flex-row gap-8 mt-8">
    <div className="md:w-1/2 bg-white rounded-lg p-12 font-secondary">
      <h1 className="text-2xl font-semibold mb-4 text-primary">Couple Counselling</h1>
      <p className="text-gray-700 mb-8">
        Strengthen your bond and navigate challenges together with expert guidance tailored to build trust, communication, and lasting harmony.
      </p>
      <h2 className="text-xl font-semibold mb-2">Benefits</h2>
      <ul className="list-disc list-inside space-y-3">
        <li>Improve communication and understanding.</li>
        <li>Resolve conflicts constructively.</li>
        <li>Rebuild trust and intimacy.</li>
        <li>Foster mutual personal growth.</li>
      </ul>
    </div>
    
    <div className="md:w-1/2">
      <img src={service1} alt="Couple Counselling" className="w-full h-auto rounded-2xl object-cover md:h-[446px]" />
    </div>
  </div>
</TabPanel>



<TabPanel>
  <div className="flex flex-col md:flex-row gap-8 mt-8">
    <div className="md:w-1/2 bg-white rounded-lg p-12 font-secondary">
      <h1 className="text-2xl font-semibold mb-4 text-primary">Parenting Skills
      </h1>
      <p className="text-gray-700 mb-8">
      Empower your parenting journey with practical strategies to nurture healthy relationships and foster your child’s emotional and mental growth.
      </p>
      <h2 className="text-xl font-semibold mb-2">Benefits</h2>
      <ul className="list-disc list-inside space-y-3">
        <li>Learn positive discipline techniques.</li>
        <li>Understand your child’s needs better.</li>
        <li>Manage parenting stress effectively.</li>
        <li>Encourage healthy behaviors in children.</li>
      </ul>
    </div>
    
    <div className="md:w-1/2">
      <img src={service2} alt="Couple Counselling" className="w-full h-auto rounded-2xl object-cover md:h-[446px]" />
    </div>
  </div>
</TabPanel>

<TabPanel>
  <div className="flex flex-col md:flex-row gap-8 mt-8">
    <div className="md:w-1/2 bg-white rounded-lg p-12 font-secondary">
      <h1 className="text-2xl font-semibold mb-4 text-primary">Feeling Stuck</h1>
      <p className="text-gray-700 mb-8">
      Break free from uncertainty and rediscover purpose with personalized support to help you move forward confidently in life.
      </p>
      <h2 className="text-xl font-semibold mb-2">Benefits</h2>
      <ul className="list-disc list-inside space-y-3">
        <li>Gain clarity and purpose.</li>
        <li>Overcome mental and emotional barriers.</li>
        <li>Reignite motivation and enthusiasm.</li>
        <li>Empower yourself for positive change.</li>
      </ul>
    </div>
    
    <div className="md:w-1/2">
      <img src={service3} alt="Couple Counselling" className="w-full h-auto rounded-2xl object-cover md:h-[446px]" />
    </div>
  </div>
</TabPanel>

<TabPanel>
  <div className="flex flex-col md:flex-row gap-8 mt-8">
    <div className="md:w-1/2 bg-white rounded-lg p-12 font-secondary">
      <h1 className="text-2xl font-semibold mb-4 text-primary">Self-Confidence
      </h1>
      <p className="text-gray-700 mb-8">
      Unlock your true potential by building self-esteem and embracing your strengths with our tailored confidence-boosting techniques.
      </p>
      <h2 className="text-xl font-semibold mb-2">Benefits</h2>
      <ul className="list-disc list-inside space-y-3">
        <li>Build awareness of your strengths.</li>
        <li>Develop a positive mindset.</li>
        <li>Learn assertive communication skills.</li>
        <li>Achieve personal and professional goals.</li>
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
