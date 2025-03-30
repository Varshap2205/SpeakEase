import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const ViewJournal = () => {
  const { id } = useParams(); // Get the journal ID from the URL
  const navigate = useNavigate();
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const docRef = doc(db, "journals", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setJournal(docSnap.data()); // Store journal data in state
        } else {
          console.error("No journal found!");
          navigate("/list"); // Redirect if journal not found
        }
      } catch (error) {
        console.error("Error fetching journal:", error);
      }
      setLoading(false);
    };

    fetchJournal();
  }, [id, navigate]);

  if (loading) return <p>Loading...</p>;
  if (!journal) return <p>Journal not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">{journal.title}</h1>
      <div 
        dangerouslySetInnerHTML={{ __html: journal.content }} 
        className="bg-white p-4 border rounded"
      />
      <button 
        onClick={() => navigate("/list")} 
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Back to List
      </button>
    </div>
  );
};

export default ViewJournal;
