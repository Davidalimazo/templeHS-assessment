export interface DoctorType {
  id: number;
  acceptVirtualVisitOnly: boolean;
  bio: string;
  name: string;
  title: string;
  availableSlots: Array<{ date: string; time: string; isBooked: boolean }>;
}

export type DoctorTypeApi = Omit<DoctorType, "acceptVirtualVisitOnly">;
