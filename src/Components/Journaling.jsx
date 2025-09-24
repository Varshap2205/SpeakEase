import React, { useState, useEffect } from "react";

const SimpleJournaling = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [journals, setJournals] = useState([]);
  const [currentView, setCurrentView] = useState("write"); // "write", "list", "view"
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load journals from localStorage on component mount
  useEffect(() => {
    const savedJournals = JSON.parse(localStorage.getItem('journals') || '[]');
    setJournals(savedJournals);
  }, []);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter both a title and content.");
      return;
    }

    setLoading(true);
    
    const newJournal = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      date: new Date().toLocaleDateString()
    };

    const updatedJournals = [...journals, newJournal];
    setJournals(updatedJournals);
    localStorage.setItem('journals', JSON.stringify(updatedJournals));

    // Reset form
    setTitle("");
    setContent("");
    setLoading(false);
    
    alert("Journal saved successfully!");
    setCurrentView("list");
  };

  const viewJournal = (journal) => {
    setSelectedJournal(journal);
    setCurrentView("view");
  };

  const deleteJournal = (id) => {
    if (window.confirm("Are you sure you want to delete this journal?")) {
      const updatedJournals = journals.filter(j => j.id !== id);
      setJournals(updatedJournals);
      localStorage.setItem('journals', JSON.stringify(updatedJournals));
    }
  };

  // Write Journal View
  if (currentView === "write") {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen mb-10 pt-24">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Write Your Journal</h1>
            <button
              onClick={() => setCurrentView("list")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              View All Journals
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Enter journal title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-lg"
          />
          
          <textarea
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none"
            rows={15}
            style={{ minHeight: '400px' }}
          />
          
          <button
            onClick={handleSave}
            disabled={loading}
            className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition disabled:opacity-50 text-lg font-semibold"
          >
            {loading ? "Saving..." : "Save Journal"}
          </button>
        </div>
      </div>
    );
  }

  // View Single Journal
  if (currentView === "view" && selectedJournal) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setCurrentView("list")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              ← Back to List
            </button>
            <button
              onClick={() => setCurrentView("write")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Write New Journal
            </button>
          </div>

          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedJournal.title}</h1>
            <p className="text-gray-600">Created on: {selectedJournal.date}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {selectedJournal.content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Journal List View
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Journals</h1>
          <button
            onClick={() => setCurrentView("write")}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-semibold"
          >
            Write New Journal
          </button>
        </div>

        {journals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No journals yet. Start writing your first journal!</p>
            <button
              onClick={() => setCurrentView("write")}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
            >
              Write Your First Journal
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {journals
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((journal) => (
                <div key={journal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800 truncate">
                    {journal.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{journal.date}</p>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {journal.content.substring(0, 100)}...
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => viewJournal(journal)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                    >
                      Read
                    </button>
                    <button
                      onClick={() => deleteJournal(journal.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleJournaling;