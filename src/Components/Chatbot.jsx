import React, { useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';

const ChatbotPage = () => {
  // ✅ Steps for the chatbot
  const steps = [
    {
      id: '1',
      message: 'Hi there! I’m here to support you. How are you feeling today?',
      trigger: 'feeling',
    },
    {
      id: 'feeling',
      options: [
        { value: 'sad', label: 'Sad', trigger: 'sad' },
        { value: 'anxious', label: 'Anxious', trigger: 'anxious' },
        { value: 'angry', label: 'Angry', trigger: 'angry' },
        { value: 'lonely', label: 'Lonely', trigger: 'lonely' },
      ],
    },
    {
      id: 'sad',
      message: 'It’s okay to feel sad sometimes. Take your time and be kind to yourself.',
      end: true,
    },
    {
      id: 'anxious',
      message: 'Anxiety can feel overwhelming. Try focusing on your breath and grounding yourself.',
      end: true,
    },
    {
      id: 'angry',
      message: 'Anger is a natural emotion. Taking deep breaths or writing it out might help.',
      end: true,
    },
    {
      id: 'lonely',
      message: 'You’re not alone, even if it feels like it. Reach out to someone you trust.',
      end: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fc] flex flex-col items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-primary">Mental Wellness Chatbot</h2>

        {/* React Simple Chatbot Integration */}
        <div className="mt-4">
          <ChatBot steps={steps} />
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
