import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "registerSchema", // must match your User model name
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("notes", noteSchema);
