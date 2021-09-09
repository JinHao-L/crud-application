import moment from "moment";
import React from "react";

import { Note } from "../services";
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import { ReactComponent as EditIcon } from "../assets/edit.svg";

interface NotesListProps {
  notes: Note[];
  onEdit: (note: Note) => any;
  onDelete: (note: Note) => any;
}

const NotesList: React.FC<NotesListProps> = ({
  notes = [],
  onEdit,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 m-4 mb-auto">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white overflow-hidden hover:bg-green-100 border border-gray-200 p-3 rounded-xl shadow-md flex justify-between flex-col"
        >
          <div className="m-2 text-justify text-sm">
            <div className="grid grid-cols-2 mb-2">
              <p className="text-xs">{`Note ${note.id}`}</p>
              <p className="text-right text-xs">
                {moment(note.createdAt).format("MMM D hh:mm a")}
              </p>
            </div>
            <h2 className="font-bold text-lg h-2 mb-8">{note.title}</h2>
            <p className="text-sm">{note.content}</p>
          </div>
          <p className="font-bold text-sm w-full text-right mt-auto">
            - {note.owner}
          </p>
          <div className="flex flex-row-reverse items-center mt-1">
            <button onClick={() => onDelete(note)}>
              <DeleteIcon className="w-6 h-6" />
            </button>
            <button onClick={() => onEdit(note)}>
              <EditIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
