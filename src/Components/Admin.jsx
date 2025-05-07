import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where, updateDoc, doc, deleteDoc } from "firebase/firestore";

const Admin = () => {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const q = query(collection(db, "therapists")); // fetch all
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTherapists(data);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const ref = doc(db, "therapists", id);
      await updateDoc(ref, { status: newStatus });
      setTherapists((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteTherapist = async (id) => {
    try {
      await deleteDoc(doc(db, "therapists", id));
      setTherapists((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting therapist:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Panel</h1>
      {loading ? (
        <p>Loading therapists...</p>
      ) : therapists.length === 0 ? (
        <p className="text-center text-gray-600">No therapist requests found.</p>
      ) : (
        <div className="space-y-4">
          {therapists.map((t) => (
            <div key={t.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{t.name}</h2>
              <p>Email: {t.email}</p>
              <p>Gender: {t.gender}</p>
              <p>Status: {t.status}</p>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => updateStatus(t.id, "Approved")}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(t.id, "Rejected")}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
                <button
                  onClick={() => deleteTherapist(t.id)}
                  className="bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
