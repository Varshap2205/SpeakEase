import React, { useState } from 'react'
import { FaArrowAltCircleRight } from "react-icons/fa";
import thumbnail from '../assets/video-thumbnail.webp'
import { FaPlay } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const About = () => {
  const [isVideoPlaying,setIsVideoPlaying]=useState(false)
  const navigate=useNavigate()
  const handleVideoPlay = () => {
    setIsVideoPlaying(true)
  }
  const handleCloseVideo=()=>{
    setIsVideoPlaying(false)
  }
  return (
    <div id="about" className='bg-[#f7f8fc] pb-16 pt-20'>
      <div className='container mx-auto'>
        <div className='py-12 px-4 md:w-4/5 mx-auto flex flex-col md:flex-row items-center gap-8'>
        <div className='md:w-1/2 w-full mb-8 md:mb-0'>
          {
            !isVideoPlaying?(
              <div className='relative'>
                <img src={thumbnail} alt="" className='w-full md:h-[446px] h-auto rounded-lg object-cover' />
                <button onClick={handleVideoPlay}
                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary p-3 rounded-full shadow-lg cursor-pointer'><FaPlay className='size-12 text-white'/></button>
              </div>
            ):(null)
          }
        </div>
        <div className='md:w-1/2 w-full'>
        <h1 className='text-4xl font-secondary font-bold mb-4 md:w-3/5 leading-snug'>Register as Therapist</h1>
          <p className='text-lg mb-12 md:pr-8'>Provide personalized support for emotional and mental well-being.</p>
          
          <button
  className='bg-primary text-white py-4 px-12 font-medium rounded-md hover:bg-primary/90 flex items-center gap-2'
  onClick={() => navigate('/therapist-register')} 
>
  <span>Register Now</span>
  <FaArrowAltCircleRight />
</button>
        </div>
      </div>
      {
        isVideoPlaying &&(
          <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
          <div className='relative w-full h-full flex items-center justify-center'>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/oxx564hMBUI?si=Tq1Kah05bp1eAlgJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <button onClick={handleCloseVideo} className='absolute top-4 right-4 text-white text-2xl cursor-pointer'><IoIosCloseCircleOutline className='text-white size-12'/></button>
          </div>
          </div>
        )
      }
      </div>
    </div>
  )
}

export default About
