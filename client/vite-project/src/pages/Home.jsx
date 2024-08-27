import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteCard from "../components/Card/NoteCard";
import AddEditNote from "../components/Card/AddEditNote";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Nav from "../components/Layout/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import ToastMessage from "../components/ToastMessage/ToastMessage";
import EmtyCard from "../components/Card/EmtyCard";
const Home = () => {
  const [openModal, setOpenModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [showMessage, setShowMessage] = useState({
    isShown: false,
    type: "add",
    message: "",
  });
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [notes, setNotes] = useState([]);
  const showToastMessage = (message, type) => {
    setShowMessage({
      isShown: true,
      message: message,
      type: type,
    });
  };

  const handleCloseToast = () => {
    setShowMessage({
      isShown: false,
      message: "",
    });
  };

  const getUserInfo = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/auth/get-user",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setUserInfo(data.user);
    } catch (error) {
      if (error.response.status === 400) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const { data } = await axiosInstance.get("/api/note/get-all-note");
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (notes) => {
    setOpenModal({ isShown: true, data: notes, type: "edit" });
  };

  const handleDelete = async (note) => {
    try {
      await axiosInstance.delete(`/api/note/delete-note/${note._id}`);
      getAllNotes();
      showToastMessage("Delete successfull");
    } catch (error) {
      showToastMessage(error);
      console.log(error);
    }
  };

  const onSearchNote = async (query) => {
    try {
      const { data } = await axiosInstance.get("/api/note/search-note", {
        params: { query },
      });
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePinned = async (note) => {
    try {
      await axiosInstance.put(`/api/note/update-note-pinned/${note._id}`, {
        isPinned: !note.isPinned,
      });
      showToastMessage("Note updated successfull");

      getAllNotes();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        showToastMessage(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    getUserInfo();
    getAllNotes();
    return () => {};
  }, []);

  return (
    <>
      <Nav
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        onSearchNote={onSearchNote}
      />

      {notes.length > 0 ? (
        <div className="container mx-auto">
          <div className="grid grid-cols-3  gap-4 mt-3">
            {notes?.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createOn}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => handleDelete(note)}
                onPinNote={() => updatePinned(note)}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmtyCard
          message="Start creating your first note! Click to the 'Add' button to create your own note"
          imgScr="https://cdn-icons-png.flaticon.com/128/16992/16992377.png"
        />
      )}
      <button
        className="text-4xl text-sky-500 flex items-center justify-center rounded-2xl cursor-pointer hover:text-sky-600 absolute right-10 bottom-10"
        onClick={() =>
          setOpenModal({ isShown: true, type: "add", data: null })
        }>
        <FontAwesomeIcon icon="fa-solid fa-square-plus" />
      </button>

      <Modal
        isOpen={openModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 ">
        <AddEditNote
          noteData={openModal.data}
          type={openModal.type}
          onClose={() =>
            setOpenModal({ isShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <ToastMessage
        isShown={showMessage.isShown}
        message={showMessage.message}
        type={showMessage.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
