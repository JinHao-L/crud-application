import { apiUrl } from "../config";
import { authHeader, handleResponse } from "../utils";

export interface Note {
  id: number;
  title: string;
  content: string;
  owner: string;
  createdAt: string;
  updatedAt?: string;
}

export const getNotes = async (): Promise<Note[]> => {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: authHeader(),
  };
  const response = await fetch(`${apiUrl}/notes`, requestOptions);
  return handleResponse(response);
};

export const searchNotes = async (keyword: string): Promise<Note[]> => {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: authHeader(),
  };
  const response = await fetch(`${apiUrl}/notes?q=${keyword}`, requestOptions);
  return handleResponse(response);
};

export const getOneNote = async (id: number): Promise<Note[]> => {
  const requestOptions: RequestInit = {
    method: "GET",
    headers: authHeader(),
  };
  const response = await fetch(`${apiUrl}/notes/${id}`, requestOptions);
  return handleResponse(response);
};

export const createNote = async (note: {
  title: string;
  content: string;
}): Promise<Note[]> => {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      ...authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  };
  console.log(requestOptions);
  const response = await fetch(`${apiUrl}/notes`, requestOptions);
  return handleResponse(response);
};

export const updateNote = async (
  id: number,
  note: { title?: string; content?: string }
): Promise<Note[]> => {
  const requestOptions: RequestInit = {
    method: "PUT",
    headers: {
      ...authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  };
  console.log(requestOptions);
  const response = await fetch(`${apiUrl}/notes/${id}`, requestOptions);
  return handleResponse(response);
};

export const deleteNote = async (id: number): Promise<Note[]> => {
  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: authHeader(),
  };
  const response = await fetch(`${apiUrl}/notes/${id}`, requestOptions);
  return handleResponse(response);
};
