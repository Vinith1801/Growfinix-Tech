const express = require("express");
const Note = require("../models/Note");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Create Note
router.post("/", auth, async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const note = await Note.create({
      title,
      content,
      tags,
      owner: req.user.id
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create note" });
  }
});

// Get All Notes (user-specific)
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user.id }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch notes" });
  }
});

// Get Single Note
router.get("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user.id });
    if (!note) return res.status(404).json({ msg: "Note not found" });

    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch note" });
  }
});

// Update Note
router.put("/:id", auth, async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { title, content, tags },
      { new: true }
    );
    if (!note) return res.status(404).json({ msg: "Note not found or unauthorized" });

    res.json(note);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update note" });
  }
});

// Delete Note
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!note) return res.status(404).json({ msg: "Note not found or unauthorized" });

    res.json({ msg: "Note deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete note" });
  }
});

module.exports = router;
