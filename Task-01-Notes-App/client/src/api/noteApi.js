// client/src/api/noteApi.js
import api from "./api";

export const getNotes = async () => {
  const res = await api.get("/notes", { withCredentials: true });
  return res.data;
};

export const getNote = async (id) => {
  const res = await api.get(`/notes/${id}`, { withCredentials: true });
  return res.data;
};

export const createNote = async (noteData) => {
  const res = await api.post("/notes", noteData, { withCredentials: true });
  return res.data;
};

export const updateNote = async (id, noteData) => {
  const res = await api.put(`/notes/${id}`, noteData, { withCredentials: true });
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await api.delete(`/notes/${id}`, { withCredentials: true });
  return res.data;
};
