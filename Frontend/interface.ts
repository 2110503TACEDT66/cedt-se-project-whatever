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
    name: string,
    tel: string,
    email: string
  };
  dentist: DentistItem;
  startDate: Date;
  endDate: Date;
  symptom: string;
  status: string;
  commented: boolean;
  createAt: Date;
  reqType : string ;
  __v: number;
}

interface FeedbackItem {
  _id: string;
  dentist: string,
  user: {
    _id:string,
    name:string
  };
  rating: number;
  comment: string;
}
