import express from "express";
import {
  deleteNoteController,
  loginController,
  noteController,
  putController,
  registerController,
  viewNoteController,
  viewNoteOnIDController,
} from "../controllers/authController.js";

const router = express.Router();

// register route
router.post("/registerUser", registerController);
router.post("/add-note", noteController);

// login route
router.post("/login", loginController);

// Method to get note
router.get("/viewNotes", viewNoteController);

// Method to delete note by one
router.delete("/deleteNote/:id", deleteNoteController);

// Getting User Data from Db on the basis of Id (dynamic Id)
router.get("/viewNote/:id", viewNoteOnIDController);

// updating User Data on the basis of Id (params id)
router.put("/viewNotes/:id", putController);

export default router;
