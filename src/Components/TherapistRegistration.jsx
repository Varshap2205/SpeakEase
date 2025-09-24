import React, { useState } from "react";

const SimpleTherapistRegistration = () => {
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
  const [submitting, setSubmitting] = useState(false);
  const [registeredTherapists, setRegisteredTherapists] = useState([]);
  const [showRegistrations, setShowRegistrations] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      const newTherapist = {
        ...formData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        registrationDate: new Date().toLocaleDateString(),
      };

      // Save to localStorage
      const existingTherapists = JSON.parse(localStorage.getItem('therapists') || '[]');
      const updatedTherapists = [...existingTherapists, newTherapist];
      localStorage.setItem('therapists', JSON.stringify(updatedTherapists));
      setRegisteredTherapists(updatedTherapists);

      setSuccessMessage("Registration complete! Your application is now under review.");
      setSubmitting(false);
      
      // Reset form
      setFormData({
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

      // Auto hide success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }, 1000);
  };

  // Load existing registrations on component mount
  React.useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('therapists') || '[]');
    setRegisteredTherapists(existing);
  }, []);

  if (showRegistrations) {
    return (
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-green-600">Registered Therapists</h1>
            <button
              onClick={() => setShowRegistrations(false)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              New Registration
            </button>
          </div>

          {registeredTherapists.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No therapists registered yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {registeredTherapists.map((therapist) => (
                <div key={therapist.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="mb-3">
                    <h3 className="font-bold text-lg text-gray-800">{therapist.name}</h3>
                    <p className="text-green-600 font-semibold">{therapist.specialization}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Email:</strong> {therapist.email}</p>
                    <p><strong>Phone:</strong> {therapist.phone}</p>
                    <p><strong>Experience:</strong> {therapist.experience} years</p>
                    <p><strong>Fees:</strong> ${therapist.fees}/session</p>
                    <p><strong>Languages:</strong> {therapist.languages}</p>
                    <p><strong>Registered:</strong> {therapist.registrationDate}</p>
                  </div>
                  
                  <div className="mt-3">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      therapist.status === 'Pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {therapist.status}
                    </span>
                  </div>
                  
                  {therapist.bio && (
                    <p className="mt-3 text-gray-700 text-sm line-clamp-3">{therapist.bio}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-600">Therapist Registration</h1>
          {registeredTherapists.length > 0 && (
            <button
              onClick={() => setShowRegistrations(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              View Registrations ({registeredTherapists.length})
            </button>
          )}
        </div>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 animate-pulse">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              {successMessage}
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              <option value="">Select Gender *</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="number"
              name="experience"
              placeholder="Years of Experience *"
              value={formData.experience}
              onChange={handleChange}
              required
              min="0"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            <input
              type="number"
              name="age"
              placeholder="Age *"
              value={formData.age}
              onChange={handleChange}
              required
              min="18"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="specialization"
              placeholder="Specialization (e.g., Depression, Anxiety) *"
              value={formData.specialization}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            <input
              type="number"
              name="fees"
              placeholder="Session Fees (USD) *"
              value={formData.fees}
              onChange={handleChange}
              required
              min="0"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="languages"
              placeholder="Languages Spoken *"
              value={formData.languages}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            <input
              type="text"
              name="nationality"
              placeholder="Nationality *"
              value={formData.nationality}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          <textarea
            name="address"
            placeholder="Full Address *"
            value={formData.address}
            onChange={handleChange}
            required
            rows={2}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />

          <textarea
            name="bio"
            placeholder="Professional Bio (Tell us about your background, approach, and expertise) *"
            value={formData.bio}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
          >
            {submitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting Registration...
              </span>
            ) : (
              "Submit Registration"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleTherapistRegistration;