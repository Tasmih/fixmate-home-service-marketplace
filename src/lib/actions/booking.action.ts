import {
  serverFetch,
  serverMutation
} from "../api";



// Get My Bookings

export const getMyBookings = async()=>{


 return serverFetch(
  "/api/bookings/my"
 );


};





// Cancel Booking

export const cancelBooking = async(
 id:string
)=>{


 return serverMutation(

 `/api/bookings/${id}/cancel`,

 null,

 "PATCH"

 );


};