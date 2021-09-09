import React, { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import EditModal from "../components/EditModal";
import FAB from "../components/FAB";
import NotesList from "../components/NotesList";
import {
  getNotes,
  Note,
  updateNote,
  createNote,
  deleteNote,
} from "../services/noteService";

interface HomePageProps {
  userId?: string;
  username?: string;
}

const HomePage: React.FC<HomePageProps> = ({ userId, username }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [modalParams, setModalParams] = useState<{
    type: "create" | "edit";
    targetNote?: Note;
  }>({ type: "create" });

  useEffect(() => {
    getLatestNotes();
  }, []);

  const getLatestNotes = async () => {
    try {
      const notes = await getNotes();
      return setNotes(notes);
    } catch (error) {
      console.log(error);
      toast(JSON.stringify(error), 1000);
    }
  };

  const onEditPress = (note: Note) => {
    setModalParams({ type: "edit", targetNote: note });
    setVisible(true);
  };
  const onEdit = async (
    id: number,
    edits: { title?: string; content?: string }
  ) => {
    try {
      await updateNote(id, edits);
      getLatestNotes();
      setVisible(false);
    } catch (error) {
      console.log(error);
      toast(JSON.stringify(error));
    }
  };

  const onCreatePress = () => {
    setModalParams({ type: "create" });
    setVisible(true);
  };
  const onCreate = async (note: { title: string; content: string }) => {
    try {
      await createNote(note);
      getLatestNotes();
      setVisible(false);
    } catch (error) {
      console.log(error);
      toast(JSON.stringify(error));
    }
  };

  const onDelete = async (note: { id: number }) => {
    try {
      await deleteNote(note.id);
      getLatestNotes();
    } catch (error) {
      console.log(error);
      toast(JSON.stringify(error));
    }
  };

  return (
    <>
      <EditModal
        isVisible={visible}
        handleClose={() => setVisible(false)}
        type={modalParams.type}
        targetNote={modalParams.targetNote}
        onCreate={onCreate}
        onEdit={onEdit}
      />
      <div className="flex-grow quicksand overflow-y-auto">
        <div className="flex flex-col flex-1 max-w-5xl m-auto relative h-notesHeight">
          <h1 className="text-5xl font-semibold text-center my-6 ">
            Hello {username || "there"}!
          </h1>
          <NotesList notes={notes} onEdit={onEditPress} onDelete={onDelete} />
          <div className="sticky ml-auto mr-5 bottom-3">
            <FAB onClick={onCreatePress} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
