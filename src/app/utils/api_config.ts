import axios from "axios";

export const BASE_URI = process.env.NEXT_PUBLIC_API_URI;

const doctorsRoutes = "doctor/";
const appointmentRoutes = "appointment/";

export const apiRoutes = {
  doctors: {
    getAll: doctorsRoutes + "all",
    getDoctorById: (id: number) => doctorsRoutes + id,
    book: doctorsRoutes + "book",
  },
  appointments: {
    createAppointment: appointmentRoutes + "create",
  },
};

export const axiosInstance = axios.create({
  baseURL: BASE_URI,
});
