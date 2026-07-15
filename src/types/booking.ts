export interface IBooking {

  _id:string;

  serviceId:string;

  serviceTitle:string;

  customerId:string;

  providerId:string;

  bookingDate:string;

  address:string;

  phone:string;

  paymentAmount:number;

  paymentStatus:
  "pending"
  |
  "paid";


  bookingStatus:
  "pending"
  |
  "confirmed"
  |
  "cancelled"
  |
  "completed";


  createdAt:string;

}