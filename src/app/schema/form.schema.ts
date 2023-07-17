import * as yup from "yup";

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email!")
    .required("Email is required!"),
});

export const paymentSchema = yup.object().shape({
  cardType: yup.string().required("First Name is required!"),
  cardNumber: yup
    .string()
    .min(16, "card must be 16 digits")
    .max(16, "card must be 16 digits")
    .required("Last Name is required!"),
  month: yup.string().required("State is required!"),
  year: yup.string().required("address is required!"),
});
