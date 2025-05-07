import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const TherapistRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    experience: "",
    specialization: "",
    fees: "",
    languages: "",
    address: "",
    bio: "",
    nationality: "",
    age: "",
    status: "Pending",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const timestamp = serverTimestamp();

      // Save to "therapists" collection
      await addDoc(collection(db, "therapists"), {
        ...formData,
        timestamp,
      });

      setSuccessMessage("Registration complete! Redirecting to home page in 5 seconds...");
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      console.error("Error registering therapist:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-500">Therapist Registration</h1>
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {["name", "email", "phone", "experience", "specialization", "fees", "languages", "address", "nationality", "age"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : field === "phone" ? "tel" : field === "fees" ? "number" : field === "age" ? "number" : "text"}
            name={field}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded"
          />
        ))}
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        >
          <option value="">Select Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          name="bio"
          placeholder="Short Bio"
          value={formData.bio}
          onChange={handleChange}
          required
          rows={4}
          className="w-full border p-3 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default TherapistRegistration;
