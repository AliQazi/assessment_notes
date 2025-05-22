import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(8).required("Please enter your password"),
});

export const registerSchema = Yup.object({
  name: Yup.string().min(4).max(25).required("Enter your name"),
  email: Yup.string().email().required("Enter your email"),
  password: Yup.string().min(8).required("Enter your password"),
  confirm_password: Yup.string()
    .min(8)
    .oneOf([Yup.ref("password"), null], "Password must matched")
    .required("Confirm your password"),
});

export const notesSchema = Yup.object({
    title: Yup.string().max(50).required("Enter your notes title"),
    description: Yup.string().required("Enter your description"),  
})