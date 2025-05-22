import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import registerSchema from "../models/registerSchema.js";
import noteSchema from "../models/noteSchema.js";

// for registration
export const registerController = async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;

    // validate user
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!confirm_password) {
      return res.send({ message: "Confirm Password is required" });
    }

    // Checking if user is already register
    let existingUser = await registerSchema.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User already register",
      });
    }

    const hashedPassword = await hashPassword(password);

    let regUser = new registerSchema({
      name,
      email,
      password: hashedPassword,
      confirm_password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User added successfully",
      regUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while register a user",
      error,
    });
    console.log(error);
  }
};

// for login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({ message: "Invalid email or password" });
    }

    // check if email exist
    const user = await registerSchema.findOne({ email });

    if (!user) {
      return res.send("message: user not exist");
    }

    // compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.send({ message: "Password doesn't match" });
    }

    // creating token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "6000s",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
    console.log(error);
  }
};

export const noteController = async (req, res) => {
  try {
    const { title, description, user } = req.body;
    let Note = await new noteSchema({
      title,
      description,
      user,
    }).save();

    res.status(201).send({
      success: true,
      message: "Note added successfully",
      Note,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while adding a task",
      error,
    });
    console.log(error);
  }
};

export const viewNoteController = async (req, res) => {
  let notes = await noteSchema.find();
  if (notes.length > 0) {
    res.send(notes);
  } else {
    res.send({ msg: "No record available" });
  }
};

export const deleteNoteController = async (req, res) => {
  try {
    const delNote = await noteSchema.deleteOne({ _id: req.params.id });

    if (delNote.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "Note deleted successfully",
        data: delNote,
      });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const viewNoteOnIDController = async (req, res) => {
    let result = await noteSchema.findOne({_id: req.params.id})
    res.send(result)
}

export const putController = async (req, res) => {
    let result = await noteSchema.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result)
}