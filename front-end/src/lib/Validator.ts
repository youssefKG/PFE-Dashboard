import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(255, "Password must be less than 255 characters")
    .required("Password is required"),
});

export const registerValidationSchema = Yup.object({
  first_name: Yup.string()
    .min(4, "First name must be at least 4 characters")
    .max(200, "First name must be less than 200 characters")
    .required("First name is required"),

  last_name: Yup.string()
    .min(4, "Last name must be at least 4 characters")
    .max(200, "Last name must be less than 200 characters")
    .required("Last name is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const createProductSchema = Yup.object({
  name: Yup.string()
    .required("Product name is required")
    .min(3, "Product name must be at least 3 characters"),

  category: Yup.string()
    .required("Category is required")
    .min(2, "Category must be at least 2 characters"),

  brand: Yup.string()
    .required("Brand is required")
    .min(2, "Brand must be at least 2 characters"),

  regularPrice: Yup.number()
    .typeError("Regular price must be a number")
    .required("Regular price is required")
    .positive("Regular price must be positive"),

  salesPrice: Yup.number()
    .typeError("Sales price must be a number")
    .required("Sales price is required")
    .positive("Sales price must be positive")
    .max(
      Yup.ref("regularPrice"),
      "Sales price must be less than or equal to regular price",
    ),
});
