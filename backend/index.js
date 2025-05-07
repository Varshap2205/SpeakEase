import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import therapistsRoutes from './api/therapists.js';

import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

config();
const app = express();
const PORT = process.env.PORT || 5000;

// __dirname for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/therapists", therapistsRoutes);

// Save contact queries to Firestore
app.post("/api/queries", async (req, res) => {
  const { name, email, phone, country, message, genderPreference } = req.body;
  try {
    await db.collection("queries").add({
      name,
      email,
      phone,
      country,
      message,
      genderPreference,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ success: true, message: "Query submitted successfully." });
  } catch (err) {
    console.error("Error saving query:", err);
    res.status(500).json({ success: false, message: "Failed to save query." });
  }
});

// Filter therapists based on gender from Firestore
app.get("/api/filter-therapists", async (req, res) => {
  const { gender } = req.query;
  try {
    let therapistsRef = db.collection("therapists").where("status", "==", "Approved");

    if (gender && gender !== "any") {
      therapistsRef = therapistsRef.where("gender", "==", gender);
    }

    const snapshot = await therapistsRef.get();
    const therapists = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(therapists);
  } catch (err) {
    console.error("Error fetching therapists:", err);
    res.status(500).json({ message: "Error fetching therapists." });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Internal error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
