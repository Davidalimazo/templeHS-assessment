export interface AppointmentType {
  id: number;
  date: string;
  duration: string;
  remainder_email: string;
  payment_details: string;
}

export type AppointmentTypeApi = Omit<AppointmentType, "id">;
