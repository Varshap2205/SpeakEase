import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FiTrash2 } from "react-icons/fi"; // Import delete icon

const JournalList = () => {
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate();

  // Fetch all journals from Firestore
  useEffect(() => {
    const fetchJournals = async () => {
      const querySnapshot = await getDocs(collection(db, "journals"));
      const journalData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJournals(journalData);
    };
    fetchJournals();
  }, []);

  // Delete a journal
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this journal?")) {
      try {
        await deleteDoc(doc(db, "journals", id));
        setJournals(journals.filter((journal) => journal.id !== id)); // Update state
      } catch (error) {
        console.error("Error deleting journal:", error);
      }
    }
  };
  //function

  return (
    <div className="max-w-3xl mx-auto p-6 pt-24">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Your Journals</h1>

      {journals.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">No journals found. Start writing your first one!</p>
          <button
            onClick={() => navigate("/journaling")}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2 rounded-lg shadow"
          >
            + Start Journaling
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {journals.map((journal) => (
            <div
              key={journal.id}
              className="p-4 border border-gray-300 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-100 transition"
            >
              {/* Clickable Journal Entry */}
              <div
                onClick={() => navigate(`/journaling/${journal.id}`)}
                className="cursor-pointer w-full"
              >
                <h2 className="text-lg font-bold text-gray-900">{journal.title}</h2>
                <p className="text-gray-500 text-sm">
                  {journal.createdAt?.seconds
                    ? new Date(journal.createdAt.seconds * 1000).toLocaleDateString()
                    : "No Date"}
                </p>
              </div>

              {/* Delete Icon */}
              <FiTrash2
                onClick={() => handleDelete(journal.id)}
                className="text-red-500 cursor-pointer hover:text-red-700 transition flex-shrink-0 ml-4"
                size={20}
              />
            </div>
          ))}

          <button
            onClick={() => navigate("/journaling")}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2 rounded-lg shadow"
          >
            + New Journal
          </button>
        </div>
      )}
    </div>
  );
};

export default JournalList;
