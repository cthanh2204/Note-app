const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const noteModel = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: {
      type: [String],
      default: [],
    },
    isPinned: { type: Boolean, default: false },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Notes", noteModel);
