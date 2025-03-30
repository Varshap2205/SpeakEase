import React, { useEffect, useState } from "react";

const Admin = () => {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    fetch("/api/therapists") // Replace with actual API endpoint
      .then((res) => res.json())
      .then((data) => setTherapists(data))
      .catch((err) => console.error("Error fetching therapists:", err));
  }, []);

  const updateStatus = (id, status) => {
    fetch(`/api/therapists/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((updatedTherapist) => {
        setTherapists((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status } : t))
        );
      })
      .catch((err) => console.error("Error updating status:", err));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-20">
      <h2 className="text-2xl font-bold mb-6 text-green-600">Admin Work</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {therapists.map((therapist) => (
            <tr key={therapist.id} className="text-center">
              <td className="border p-2">{therapist.name}</td>
              <td className="border p-2">{therapist.email}</td>
              <td className="border p-2 font-semibold text-{therapist.status === 'Approved' ? 'green' : therapist.status === 'Rejected' ? 'red' : 'yellow'}-500">{therapist.status}</td>
              <td className="border p-2">
                <button
                  className="bg-green-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-600"
                  onClick={() => updateStatus(therapist.id, "Approved")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  onClick={() => updateStatus(therapist.id, "Rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;