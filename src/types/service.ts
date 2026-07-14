export interface IServiceFormData {

  title:string;

  shortDescription:string;

  description:string;

  category:string;

  subcategory:string;

  tags:string[];

  price:string;

  location:string;

  availability:string[];

  duration:string;

  image:string;

  providerId?:string;

}




export interface IService {


  _id:string;

  title:string;

  shortDescription:string;

  description:string;

  category:string;

  subcategory:string;

  tags:string[];

  price:number;

  location:string;

  availability:string[];

  duration:string;

  image:string;

  providerId:string;

  rating:number;

  totalReviews:number;

  isAvailable:boolean;

  isActive:boolean;

  views:number;

  createdAt:string;

}





export interface IServiceResponse {

  success:boolean;

  data:IService[];

  pagination?:{

    total:number;

    page:number;

    limit:number;

    totalPages:number;

  };

}