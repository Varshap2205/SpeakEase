import React, { useState } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { TbMessageChatbotFilled } from "react-icons/tb";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [showModel, setShowModel] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      phone,
      country,
      message,
    };
    if (!data) {
      alert("Please fill all the fields");
      return;
    }
    setShowModel(true);
  };

  const closeModel = () => {
    setShowModel(false);
    setName("");
    setEmail("");
    setPhone("");
    setCountry("");
    setMessage("");
  };

  return (
    <div id="contact" className="bg-heroBg flex items-center justify-center py-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:w-4/5 mx-auto gap-12">
          {/* Left Section */}
          <div className="space-y-8">
            <h2 className="font-bold font-secondary text-white text-3xl mb-6 text-center md:text-left">
              Contact Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
              {/* Icons and Info */}
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center rounded-full bg-white p-3">
                  <FaPhoneAlt className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">24 Hours Services</h3>
                  <p>Accessible anytime, providing continuous support for your wellness needs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center rounded-full bg-white p-3">
                  <FaUser className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Quality Care</h3>
                  <p>Committed to delivering exceptional, professional care for your well-being.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center rounded-full bg-white p-3">
                  <TbMessageChatbotFilled className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">AI-Powered Chatbot</h3>
                  <p>Instant support and guidance through our responsive AI-powered chatbot.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center rounded-full bg-white p-3">
                  <VscWorkspaceTrusted className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Expert Therapists</h3>
                  <p>Qualified therapists offering personalized guidance for mental wellness improvement.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-8 p-8 bg-white shadow-xl rounded-md w-full lg:w-2/3">
            <h3 className="text-2xl font-bold mb-4 text-center md:text-left">Contact</h3>
            <form action="" className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow"
                  required
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow"
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow"
                  required
                />
                <input
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  placeholder="Country"
                  className="w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow"
                  required
                />
              </div>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                placeholder="Type Your Message here..."
                className="w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow"
              ></textarea>
              <button
                type="submit"
                className="w-full p-3 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Send Message
              </button>
            </form>
          </div>
        </div> 
      </div>

      {/* Modal */}
      {showModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-md shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p>Thank you, {name}, for submitting your query!</p>
            <button
              onClick={closeModel}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
