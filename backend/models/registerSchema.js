import mongoose from "mongoose";

const registerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    confirm_password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('regUser', registerSchema)