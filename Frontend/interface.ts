interface DentistItem {
  id: string;
  name: string;
  picture: string;
  experience: number;
  expertise: string;
  bookings: BookingItem[];
}

interface OneDentistJson {
  success: boolean;
  data: DentistItem;
}

interface DentistJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: DentistItem[];
}

interface BookingItem {
  _id: string;
  user: {
    name: string;
    tel: string;
    email: string;
  };
  dentist: DentistItem;
  startDate: Date;
  endDate: Date;
  symptom: string;
  status: string;
  createAt: Date;
  reqType: string;
  __v: number;
}

interface FeedbackItem {
  _id: string;
  dentist: string;
  user: {
    _id: string;
    name: string;
  };
  booking: string;
  rating: number;
  comment: string;
}
