const Note = require("../models/notesModel");

const noteControllers = {
  addNote: async (req, res) => {
    const { title, content, tags } = req.body;
    const user = req.user;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Content and title is required " });
    }

    try {
      const note = await Note.create({
        title,
        content,
        tags: tags || [],
        userId: user._id,
      });

      return res.status(200).json({
        note,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  editNote: async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags } = req.body;
    const user = req.user;

    if (!title && !content && !tags) {
      return res.status(400).json("No changes provided");
    }

    try {
      const note = await Note.findOne({ _id: noteId, userId: user._id });
      if (!note) {
        return res.status(400).json("Note is not exist");
      }
      if (title) note.title = title;
      if (content) note.content = content;
      if (tags) note.tags = tags;

      await note.save();
      return res.status(200).json({
        note,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getNote: async (req, res) => {
    const user = req.user;

    try {
      const notes = await Note.find({ userId: user._id }).sort({
        isPinned: -1,
      });

      if (!notes) {
        return res.status(500).json("Note not found");
      }

      return res.status(200).json({ notes });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  deleteNote: async (req, res) => {
    const noteId = req.params.noteId;
    const user = req.user;
    try {
      const note = await Note.findOne({ _id: noteId, userId: user._id });
      if (!note) {
        return res.status(500).json("Note not found");
      }

      await Note.deleteOne({ _id: noteId, userId: user._id });

      return res.status(200).json({
        note,
        message: "Delete successful ",
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  editNotePinned: async (req, res) => {
    const noteId = req.params.noteId;
    const user = req.user;
    const { isPinned } = req.body;
    try {
      const note = await Note.findOne({ _id: noteId, userId: user._id });
      if (!note) {
        return res.status(500).json("Note not found");
      }
      note.isPinned = isPinned;

      await note.save();
      return res.status(200).json({
        note,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  searchNote: async (req, res) => {
    const user = req.user;
    const { query } = req.query;
    // if (!query) {
    //   return res.status(400).json({ message: "Search query is required" });
    // }

    try {
      const matchNote = await Note.find({
        userId: user._id,
        $or: [
          { title: { $regex: new RegExp(query, "i") } },
          { content: { $regex: new RegExp(query, "i") } },
        ],
      });
      return res.status(200).json({
        notes: matchNote,
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};

module.exports = noteControllers;
