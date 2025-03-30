import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Results() {
    const location = useLocation();
    
    // ✅ Get scores from state or fallback to localStorage
    const [scores, setScores] = useState(location.state || JSON.parse(localStorage.getItem("userScores")) || null);
    
    console.log("Scores received in Results:", scores); // 🔥 Debugging log

    const [insights, setInsights] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!scores) {
            setError("No scores found. Please complete the assessment.");
            return;
        }

        async function fetchInsights() {
            setLoading(true);
            setError(""); 
            setInsights("");

            console.log("Sending scores to API:", scores); // 🔥 Check API request

            try {
                const response = await axios.post("http://localhost:5000/generate-insights", { scores });
                console.log("API Response:", response.data); // 🔥 Check API response
                setInsights(response.data.insights);
            } catch (error) {
                console.error("Error fetching insights:", error.response?.data || error.message);
                setError("Failed to fetch insights. Check backend and network connection.");
            } finally {
                setLoading(false);
            }
        }
        
        fetchInsights();
    }, [scores]);

    useEffect(() => {
        console.log("Updated insights:", insights); // 🔥 Check if insights are updating
    }, [insights]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-xl p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">Results</h2>
                
                {error && <p className="text-red-500 font-medium text-center">{error}</p>}
                {loading && <p className="text-gray-600 dark:text-gray-300 text-center">Loading insights...</p>}
                
                {insights && (
                    <div className="mt-4 p-4 max-h-96 overflow-y-auto bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {insights}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Results;
