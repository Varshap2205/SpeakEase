import React from 'react';
import { BsChatQuoteFill } from "react-icons/bs";
import review1 from '../assets/review1.webp';
import review2 from '../assets/review2.webp';

const testimonials = [
  {
    name: 'Jane Doe',
    location: 'New York, NY',
    review: 'The free version has been helpful in my wellness journey. The chatbot therapist and community support are fantastic for getting started. Highly recommend for anyone new to wellness!',
    image: review1,
  },
  {
    name: 'John Smith',
    location: 'Los Angeles, CA',
    review: 'Upgrading to the premium plan has truly been worth it. The personalized wellness plan and expert guidance have taken my mental wellness to the next level. I feel more focused and balanced every day.',
    image: review2,
  },
];

const Testimonials = () => {
  return (
    <div id='testimonial' className='bg-[#f7f8fc] py-12'>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-secondary mb-3">
            What Our Clients Say
          </h2>
          <p className="text-lg mb-12 md:w-1/2 mx-auto">
            Discover how our clients experience transformative wellness journeys. Read real stories of positive change and satisfaction with our services.
          </p>
        </div>

        <div className='flex flex-col md:flex-row md:w-4/5 mx-auto md:gap-12 gap-8'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='relative bg-white rounded-lg p-6 flex-1 shadow-lg'>
              <div className='absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2'>
                <BsChatQuoteFill className='text-4xl text-primary' />
              </div>
              <p className='text-lg mb-4'>{testimonial.review}</p>
              <div className='flex gap-4 items-center'>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className='w-16 h-16 rounded-full object-cover'
                />
                <div>
                  <p className='font-semibold'>{testimonial.name}</p>
                  <p className='text-gray-600'>{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
