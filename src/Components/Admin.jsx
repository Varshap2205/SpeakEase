import React, { useEffect, useState } from "react";

const SimpleAdmin = () => {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const fetchTherapists = () => {
      try {
        // Get therapists from localStorage
        const storedTherapists = JSON.parse(localStorage.getItem('therapists') || '[]');
        setTherapists(storedTherapists);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();

    // Auto-refresh every 5 seconds to catch new registrations
    const interval = setInterval(fetchTherapists, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = (id, newStatus) => {
    try {
      const updatedTherapists = therapists.map((t) => 
        t.id === id ? { ...t, status: newStatus, lastUpdated: new Date().toLocaleString() } : t
      );
      
      setTherapists(updatedTherapists);
      localStorage.setItem('therapists', JSON.stringify(updatedTherapists));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteTherapist = (id) => {
    if (window.confirm("Are you sure you want to delete this therapist registration?")) {
      try {
        const updatedTherapists = therapists.filter((t) => t.id !== id);
        setTherapists(updatedTherapists);
        localStorage.setItem('therapists', JSON.stringify(updatedTherapists));
      } catch (error) {
        console.error("Error deleting therapist:", error);
      }
    }
  };

  // Filter therapists based on search and status
  const filteredTherapists = therapists.filter((therapist) => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "All" || therapist.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusCounts = () => {
    return {
      total: therapists.length,
      pending: therapists.filter(t => t.status === 'Pending').length,
      approved: therapists.filter(t => t.status === 'Approved').length,
      rejected: therapists.filter(t => t.status === 'Rejected').length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="bg-gray-50 min-h-screen p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Panel - Therapist Management</h1>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-blue-800 font-semibold">Total Applications</h3>
              <p className="text-2xl font-bold text-blue-600">{statusCounts.total}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="text-yellow-800 font-semibold">Pending Review</h3>
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-green-800 font-semibold">Approved</h3>
              <p className="text-2xl font-bold text-green-600">{statusCounts.approved}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-red-800 font-semibold">Rejected</h3>
              <p className="text-2xl font-bold text-red-600">{statusCounts.rejected}</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name, email, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading therapists...</p>
          </div>
        ) : filteredTherapists.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No therapist applications found</h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== "All" 
                ? "Try adjusting your search or filter criteria." 
                : "When therapists register, they will appear here for review."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTherapists.map((therapist) => (
              <div key={therapist.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{therapist.name}</h2>
                      <p className="text-blue-600 font-semibold">{therapist.specialization}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(therapist.status)}`}>
                      {therapist.status}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="space-y-2">
                      <p className="text-gray-700"><strong>Email:</strong> {therapist.email}</p>
                      <p className="text-gray-700"><strong>Phone:</strong> {therapist.phone}</p>
                      <p className="text-gray-700"><strong>Gender:</strong> {therapist.gender}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-700"><strong>Experience:</strong> {therapist.experience} years</p>
                      <p className="text-gray-700"><strong>Age:</strong> {therapist.age}</p>
                      <p className="text-gray-700"><strong>Fees:</strong> ${therapist.fees}/session</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-700"><strong>Languages:</strong> {therapist.languages}</p>
                      <p className="text-gray-700"><strong>Nationality:</strong> {therapist.nationality}</p>
                      <p className="text-gray-700"><strong>Applied:</strong> {therapist.registrationDate || 'N/A'}</p>
                    </div>
                  </div>

                  {therapist.address && (
                    <div className="mb-4">
                      <p className="text-gray-700"><strong>Address:</strong> {therapist.address}</p>
                    </div>
                  )}

                  {therapist.bio && (
                    <div className="mb-4">
                      <p className="text-gray-700"><strong>Bio:</strong></p>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg mt-1">{therapist.bio}</p>
                    </div>
                  )}

                  {therapist.lastUpdated && (
                    <p className="text-xs text-gray-500 mb-4">Last updated: {therapist.lastUpdated}</p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => updateStatus(therapist.id, "Approved")}
                      disabled={therapist.status === "Approved"}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg transition font-semibold"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => updateStatus(therapist.id, "Rejected")}
                      disabled={therapist.status === "Rejected"}
                      className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-lg transition font-semibold"
                    >
                      ✗ Reject
                    </button>
                    <button
                      onClick={() => updateStatus(therapist.id, "Pending")}
                      disabled={therapist.status === "Pending"}
                      className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white px-4 py-2 rounded-lg transition font-semibold"
                    >
                      ↻ Reset to Pending
                    </button>
                    <button
                      onClick={() => deleteTherapist(therapist.id)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition font-semibold"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Auto-refresh notice */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            🔄 This panel auto-refreshes every 5 seconds to show new registrations
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleAdmin;