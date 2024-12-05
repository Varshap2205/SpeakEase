import React from 'react';

const HowItWorks = () => {
  return (
    <div className='relative bg-cover bg-center py-12 bg-working-img'>
      <div className='absolute inset-0 bg-heroBg bg-opacity-85'></div>
      <div className='relative container mx-auto px-4 py-20'>
        <div className='text-white text-center mf-20'>
          <h2 className='text-4xl font-bold font-secondary mb-4'>How It Works</h2>
          <p className='text-lg md:w-1/2 w-full mx-auto'>
          Discover how our platform simplifies your journey with easy steps, guiding you effortlessly toward achieving your desired goals.
          </p>
        </div>

        <div className='flex flex-col md:w-4/5 mx-auto md:flex-row gap-8 mt-10'>
          <div className='relative bg-white text-center rounded-lg p-6 flex-1 shadow-lg'>
            {/* Number Badge */}
            <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold'>
              1
            </div>
            {/* Content */}
            <div className='flex flex-col items-center'>
              <h3 className='text-lg font-medium mt-8'>Start for Free</h3>
              <p className='mt-2 text-gray-700'>
              Register for free and access our chatbot e-therapist to guide you through basic queries.
              </p>
            </div>
          </div>
          <div className='relative bg-white text-center rounded-lg p-6 flex-1 shadow-lg'>
            {/* Number Badge */}
            <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold'>
              2
            </div>
            {/* Content */}
            <div className='flex flex-col items-center'>
              <h3 className='text-lg font-medium mt-8'>Upgrade for Real Support</h3>
              <p className='mt-2 text-gray-700'>
              Upgrade to the paid version for personalized sessions with real therapists for tailored support.
              </p>
            </div>
          </div>
          <div className='relative bg-white text-center rounded-lg p-6 flex-1 shadow-lg'>
            {/* Number Badge */}
            <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold'>
              3
            </div>
            {/* Content */}
            <div className='flex flex-col items-center'>
              <h3 className='text-lg font-medium mt-8'> Book Your Session</h3>
              <p className='mt-2 text-gray-700'>
              Choose your preferred therapist, book an appointment, and begin your journey toward better mental health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
