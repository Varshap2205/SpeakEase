import React, { useState, useEffect } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { db } from "../firebase/firebaseConfig"; // adjust path as needed
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Contact = () => {
  const [name, setName] = useState(""); // New state for name
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [matchedTherapists, setMatchedTherapists] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !gender || !age || !nationality) {
      alert("Please fill all the fields.");
      return;
    }

    const data = {
      name, // Store the name field
      gender,
      age,
      nationality,
      createdAt: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "users"), data); // Store user data in Firestore
      setShowModel(true);
      fetchMatchingTherapists(gender, nationality, age);
    } catch (err) {
      console.error("Error submitting data:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const fetchMatchingTherapists = async (gender, nationality, age) => {
    try {
      const therapistRef = collection(db, "therapists");
      const q = query(
        therapistRef,
        where("gender", "==", gender),
        where("nationality", "==", nationality.toLowerCase().trim()),
        where("age", ">=", parseInt(age) - 5),
        where("age", "<=", parseInt(age) + 5)
      );
  
      const querySnapshot = await getDocs(q);
      const matches = querySnapshot.docs.map((doc) => doc.data());
      setMatchedTherapists(matches);
    } catch (err) {
      console.error("Error fetching therapists:", err);
    }
  };
  

  const closeModel = () => {
    setShowModel(false);
    setName(""); // Reset the name field as well
    setGender("");
    setAge("");
    setNationality("");
    setMatchedTherapists([]);
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
          <div className="space-y-8 p-8 bg-white shadow-xl rounded-lg w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-center">Find Your Therapist</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow"
              />

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow"
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>

              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow"
              />

              <input
                type="text"
                placeholder="Nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
                className="w-full p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary shadow"
              />

              <button
                type="submit"
                className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition"
              >
                Submit
              </button>
            </form>

            {showModel && (
              <div className="mt-6 bg-green-100 p-4 rounded">
                <h3 className="text-green-700 font-semibold">Therapists Matched:</h3>
                {matchedTherapists.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {matchedTherapists.map((therapist, index) => (
                      <li key={index} className="mt-1">
                        {therapist.name} — {therapist.expertise || "Expertise not listed"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No matching therapists found.</p>
                )}
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                  onClick={closeModel}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
