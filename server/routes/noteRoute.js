const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const noteControllers = require("../controllers/noteControllers");
const router = express.Router();

router.post("/add-note", verifyToken, noteControllers.addNote);
router.put("/edit-note/:noteId", verifyToken, noteControllers.editNote);
router.get("/get-all-note", verifyToken, noteControllers.getNote);
router.delete("/delete-note/:noteId", verifyToken, noteControllers.deleteNote);
router.put(
  "/update-note-pinned/:noteId",
  verifyToken,
  noteControllers.editNotePinned
);

router.get("/search-note", verifyToken, noteControllers.searchNote);
module.exports = router;
