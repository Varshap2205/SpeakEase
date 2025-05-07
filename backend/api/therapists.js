import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

let therapists = [];

// POST route
router.post("/", upload.fields([
  { name: "governmentID", maxCount: 1 },
  { name: "degreeCertificate", maxCount: 1 },
  { name: "license", maxCount: 1 },
  { name: "certification", maxCount: 1 },
]), (req, res) => {
  const { body, files } = req;
  const newTherapist = {
    id: Date.now(),
    ...body,
    status: "Pending",
    documents: {
      governmentID: files.governmentID?.[0]?.filename || null,
      degreeCertificate: files.degreeCertificate?.[0]?.filename || null,
      license: files.license?.[0]?.filename || null,
      certification: files.certification?.[0]?.filename || null,
    },
  };

  therapists.push(newTherapist);

  res.status(201).json({
    message: "Therapist registered successfully",
    therapist: newTherapist,
  });
});

// GET route
router.get("/", (req, res) => {
  res.status(200).json(therapists);
});

// PUT route to update status
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const therapist = therapists.find((t) => t.id == id);
  if (!therapist) {
    return res.status(404).json({ error: "Therapist not found" });
  }

  therapist.status = status;
  res.status(200).json({ message: "Status updated", therapist });
});

// DELETE route to remove therapist by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = therapists.findIndex((t) => t.id == id);

  if (index === -1) {
    return res.status(404).json({ error: "Therapist not found" });
  }

  therapists.splice(index, 1);
  res.status(200).json({ message: "Therapist deleted successfully" });
});


export default router;
