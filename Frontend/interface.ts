interface DentistItem {
  id: string;
  name: string;
  picture: string;
  experience: number;
  expertise: string;
  bookings: BookingItem[];
}

interface DentistJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: DentistItem[];
}
interface BookingItem {
  _id: string;
  user: { name: string };
  dentist: DentistItem;
  startDate: Date;
  endDate: Date;
  symptom: string;
  status: string;
  createAt: Date;
  __v: number;
}
