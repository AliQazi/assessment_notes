import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// function to register user
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/registerUser", userData);
    return response;
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};

// function to login user
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    return response;
  } catch (error) {
    console.log("login error", error);
    throw error;
  }
};

// function to add notes
export const addNote = async (noteData) => {
  try {
    const response = await axiosInstance.post("/add-note", noteData);
    return response;
  } catch (error) {
    console.error("Add Note Error:", error);
    throw error;
  }
};

// funtion to get notes
export const getNotes = async () => {
  try {
    const response = await axiosInstance.get("/viewNotes");
    return response.data;
  } catch (error) {
    console.error("Error fetching notes", error);
    throw error;
  }
};

// function to delete note
export const deleteNote = async (noteId) => {
  try {
    const response = await axiosInstance.delete(`/deleteNote/${noteId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting note", error);
    throw error;
  }
};

// function to get a single note by ID
export const getNoteById = async (noteId) => {
  try {
    const response = await axiosInstance.get(`/viewNote/${noteId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching note", error);
    throw error;
  }
};

// function to update a note by ID
export const updateNote = async (noteId, updatedData) => {
  try {
    const response = await axiosInstance.put(
      `/viewNotes/${noteId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating note", error);
    throw error;
  }
};
