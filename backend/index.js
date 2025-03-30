import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import axios from "axios";

config();
const app = express();
app.use(cors());
app.use(json());

const GEMINI_MODEL = "gemini-1.5-pro-001"; // ✅ Use the latest available model
const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;

// console.log("GEMINI API KEY:", API_KEY);

// Route to get AI-generated insights
app.post("/generate-insights", async (req, res) => {
    try {
        const { scores } = req.body;
        console.log("Received Scores:", scores);

        const response = await axios.post(
            GEMINI_API_URL,
            {
                contents: [
                    {
                        role: "user",
                        parts: [
                            { text: `Based on the following scores: ${JSON.stringify(scores)}, provide a mental health assessment and personalized recommendations.` }
                        ]
                    }
                ]
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        // console.log("Full API Response:", JSON.stringify(response.data, null, 2));

        const aiResponse =
            response.data?.candidates?.[0]?.content?.parts?.map(part => part.text).join(" ") || "No insights available.";

        // console.log("Extracted Insights:", aiResponse);
        res.json({ insights: aiResponse });

    } catch (error) {
        console.error("Error response from API:", error.response?.data || error.message);
        res.status(500).json({ error: "Error generating insights", details: error.response?.data || error.message });
    }
});

// Start server
app.listen(5000, () => console.log("🚀 Backend running on port 5000"));
