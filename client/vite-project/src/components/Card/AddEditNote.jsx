import { useState } from "react";
import TagInput from "./TagInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNote = ({
  noteData,
  type,
  onClose,
  getAllNotes,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      await axiosInstance.post("/api/note/add-note", {
        title,
        content,
        tags,
      });
      showToastMessage("Note added successfull");
      getAllNotes();

      onClose();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        showToastMessage(error.response.data.message);
        setError(error.response.data.message);
      }
    }
  };

  const editNote = async () => {
    try {
      await axiosInstance.put(`/api/note/edit-note/${noteData._id}`, {
        title,
        content,
        tags,
      });
      showToastMessage("Note updated successfull");

      getAllNotes();

      onClose();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        showToastMessage(error.response.data.message);
        setError(error.response.data.message);
      }
    }
  };
  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <div className="relative">
      <button
        className="size-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 "
        onClick={onClose}>
        <FontAwesomeIcon
          className="text-xl text-sky-500 hover:text-sky-600"
          icon="fa-solid fa-xmark"
        />
      </button>
      <div className="flex flex-col gap-2">
        <label className="uppercase font-medium text-xs ">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go to Gym at 5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="uppercase font-medium text-xs ">content</label>
        <textarea
          type="text"
          placeholder="Content"
          rows={10}
          value={content}
          className="text-sm  outline-none bg-slate-50 p-2 rounded"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="uppercase font-medium text-xs ">Tags </label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && (
        <p className="text-red-500 text-sm pt-4 font-medium ">{error}</p>
      )}

      <button
        onClick={handleAddNote}
        className="rounded transition-opacity bg-sky-500 w-full hover:bg-sky-600 text-white font-medium mt-5 p-3">
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNote;
