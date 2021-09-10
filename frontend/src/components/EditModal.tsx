import React, { useState } from "react";
import { Note } from "../services";

interface EditModalProps {
  handleClose: () => void;
  targetNote?: Note;
  onCreate: (note: { title: string; content: string }) => Promise<void>;
  onEdit: (
    id: number,
    edits: { title?: string; content?: string }
  ) => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({
  handleClose,
  targetNote = null,
  onCreate,
  onEdit,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const postAction = () => {
    if (targetNote === null) {
      return onCreate({ title, content });
    } else {
      const edits: any = {};
      if (title) edits.title = title;
      if (content) edits.content = content;

      return onEdit((targetNote as Note).id, edits);
    }
  };

  return (
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-70"
      onClick={() => handleClose()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col w-full bg-white rounded-lg shadow dark:bg-gray-800 lg:max-w-2xl md:max-w-xl sm:max-w-lg max-w-md px-6 py-8 md:px-8 lg:px-10"
      >
        <div className="capitalize text-center font-bold text-2xl m-5 text-gray-800">
          {targetNote ? "Edit note" : "Create note"}
        </div>
        <input
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          placeholder="Title"
          type="text"
          id="note-title"
          value={title || targetNote?.title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          placeholder="Enter any message you like"
          id="note-content"
          value={content || targetNote?.content || ""}
          onChange={(e) => setContent(e.target.value)}
          maxLength={500}
        />

        <div className="flex text-gray-500 m-2">
          <div className="count ml-auto text-gray-400 text-xs font-semibold">
            {(content || targetNote?.content || "").length}/500
          </div>
        </div>
        <div className="buttons flex">
          <button
            onClick={handleClose}
            className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
          >
            Cancel
          </button>
          <button
            onClick={postAction}
            className="btn border border-purple-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-purple-500"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
