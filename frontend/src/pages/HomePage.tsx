import React, { useEffect, useState } from "react";
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
import { openToast } from "../utils/openToast";

interface HomePageProps {
  username?: string;
}

const HomePage: React.FC<HomePageProps> = ({ username }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [modalParams, setModalParams] = useState<{
    type: "create" | "edit";
    targetNote?: Note;
  }>({ type: "create" });

  useEffect(() => {
    getLatestNotes();
  }, [username]);

  const getLatestNotes = async () => {
    try {
      const notes = await getNotes();
      return setNotes(notes);
    } catch (error) {
      setNotes([]);
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
      openToast(error);
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
      openToast(error);
    }
  };

  const onDelete = async (note: { id: number }) => {
    try {
      await deleteNote(note.id);
      getLatestNotes();
    } catch (error) {
      openToast(error);
    }
  };

  return (
    <>
      {visible && (
        <EditModal
          handleClose={() => setVisible(false)}
          targetNote={modalParams.targetNote}
          onCreate={onCreate}
          onEdit={onEdit}
        />
      )}
      <div className="flex-grow quicksand overflow-y-auto">
        <div className="flex flex-col flex-1 max-w-5xl m-auto relative h-notesHeight">
          <h1 className="text-5xl font-semibold text-center my-6 ">
            Hello {username || "there"}!
          </h1>

          <NotesList notes={notes} onEdit={onEditPress} onDelete={onDelete} />

          {username ? (
            <div className="sticky ml-auto mr-5 bottom-3">
              <FAB onClick={onCreatePress} />
            </div>
          ) : (
            <text className="text-lg font-semibold text-center my-6 ">
              Please login to view shared notes
            </text>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
