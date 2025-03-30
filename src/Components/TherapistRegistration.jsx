import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TherapistRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    specialization: "",
    experience: "",
    languages: "",
    availability: "",
    fees: "",
    governmentID: null,
    degreeCertificate: null,
    license: null,
    certification: null,
    status: "Pending",
  });

  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSuccessMessage("Registration complete! Redirecting to home page in 5 seconds...");

    setTimeout(() => {
      navigate("/"); // Change this to your actual homepage route
    }, 5000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-20">
      <h2 className="text-2xl font-bold mb-6 text-green-600">Therapist Registration</h2>

      {successMessage && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
    <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-2xl font-bold border-4 border-white rounded-2xl p-6 shadow-xl text-center w-3/4 md:w-1/2">
      {successMessage}
    </div>
  </div>
)}


      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="specialization"
          placeholder="Specialization (e.g., Anxiety, PTSD)"
          value={formData.specialization}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="experience"
          placeholder="Years of Experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="languages"
          placeholder="Languages Spoken"
          value={formData.languages}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="availability"
          placeholder="Availability (e.g., Weekdays, Weekends)"
          value={formData.availability}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="fees"
          placeholder="Session Fees (in USD)"
          value={formData.fees}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Document Upload Fields */}
        <div className="w-full p-2 border rounded bg-gray-100">
          <label className="block mb-1">Upload Government ID</label>
          <input type="file" name="governmentID" onChange={handleFileChange} required />
        </div>

        <div className="w-full p-2 border rounded bg-gray-100">
          <label className="block mb-1">Upload Degree Certificate</label>
          <input type="file" name="degreeCertificate" onChange={handleFileChange} required />
        </div>

        <div className="w-full p-2 border rounded bg-gray-100">
          <label className="block mb-1">Upload Professional License</label>
          <input type="file" name="license" onChange={handleFileChange} required />
        </div>

        <div className="w-full p-2 border rounded bg-gray-100">
          <label className="block mb-1">Upload Certification Proof</label>
          <input type="file" name="certification" onChange={handleFileChange} required />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default TherapistRegistration;
