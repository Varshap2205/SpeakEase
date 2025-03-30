import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, getDoc, doc, serverTimestamp } from "firebase/firestore";

const Journaling = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Get journal ID from URL if viewing an existing journal

  useEffect(() => {
    const fetchJournal = async () => {
      if (!id) return; // If no ID, it's a new journal, so don't fetch anything
      const journalRef = doc(db, "journals", id);
      const journalSnap = await getDoc(journalRef);
      if (journalSnap.exists()) {
        const data = journalSnap.data();
        setTitle(data.title);
        setContent(data.content);
      }
    };
    fetchJournal();
  }, [id]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter both a title and content.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "journals"), {
        title,
        content,
        createdAt: serverTimestamp(),
      });

      alert("Journal saved successfully!");
      navigate("/list"); // Redirect after saving
    } catch (error) {
      console.error("Error saving journal:", error);
      alert("Failed to save journal. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">{id ? "View Journal" : "Write Your Journal"}</h1>
      
      <input
        type="text"
        placeholder="Enter title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        disabled={!!id} // Disable editing when viewing
      />
      
      <ReactQuill
        value={content}
        onChange={setContent}
        className="mb-4 bg-white"
        readOnly={!!id} // Disable editing when viewing
      />
      
      {!id && ( // Show save button only when creating a new journal
        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Save Journal"}
        </button>
      )}
    </div>
  );
};

export default Journaling;
