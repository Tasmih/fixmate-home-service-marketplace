"use client";


import {
  useCallback,
  useEffect,
  useState,
} from "react";


import {
  X
} from "lucide-react";


import ServiceCard from "@/components/services/ServiceCard";

import ServiceCardSkeleton from "@/components/services/ServiceCardSkeleton";

import {
  getServices
} from "@/lib/actions/service.actions";


import {
  IService
} from "@/types/service";





const categories = [

  "All",
  "Beautician",
  "Hourly Housekeeper",
  "Nurse",
  "Caregiver",
  "AC Repair",
  "Electrician",
  "Plumber",
  "Mechanic",
  "Carpenter",
  "Painter",
  "Cleaner",
  "Home Tutor",
  "Computer Repair",
  "Appliance Repair",
  "Gardener",
  "Pest Control",
  "Security Guard",
  "Moving Service",
  "Laundry Service",
  "Cooking Service"

];





interface Props {

  initialData:IService[];

}





export default function ServicesContainer({

  initialData

}:Props){



  const [services,setServices] = useState<IService[]>(

    initialData

  );



  const [loading,setLoading] = useState(false);



  const [search,setSearch] = useState("");



  const [category,setCategory] = useState("All");



  const [sort,setSort] = useState("");



  const [page,setPage] = useState(1);



  const [totalPages,setTotalPages] = useState(1);









  const fetchServices = useCallback(async()=>{


    const params = new URLSearchParams();



    if(search){

      params.append(
        "search",
        search
      );

    }



    if(category !== "All"){

      params.append(
        "category",
        category
      );

    }



    if(sort){

      params.append(
        "sort",
        sort
      );

    }



    params.append(
      "page",
      String(page)
    );



    params.append(
      "limit",
      "8"
    );




    const result = await getServices(

      params.toString()

    );
if(initialData.length===0){

return (

<div className="
bg-white
rounded-2xl
p-10
text-center
">

<h2 className="
text-xl
font-bold
text-[#14213D]
">

No Services Found

</h2>


<p className="
text-gray-500
mt-2
">

Currently no services available.

</p>


</div>

);

}


    return result;



  },[

    search,

    category,

    sort,

    page

  ]);









  useEffect(()=>{


    let ignore = false;



    const loadServices = async()=>{


      try{


        setLoading(true);



        const result = await fetchServices();




        if(!ignore){


          setServices(

            result.data || []

          );



          setTotalPages(

            result.pagination?.totalPages || 1

          );


        }




      }catch(error){


        console.log(
          "Service Fetch Error:",
          error
        );



        if(!ignore){

          setServices([]);

        }



      }finally{


        if(!ignore){

          setLoading(false);

        }


      }


    };




    loadServices();




    return()=>{

      ignore=true;

    };



  },[fetchServices]);











  return (


    <main

      className="
      min-h-screen
      bg-[#F8FAFC]
      p-4
      sm:p-6
      "

    >



      <div

        className="
        max-w-7xl
        mx-auto
        "

      >



        <h1

          className="
          text-3xl
          font-bold
          text-[#14213D]
          "

        >

          Explore Services

        </h1>




        <p

          className="
          text-gray-500
          mt-2
          mb-8
          "

        >

          Find trusted home services near you

        </p>









        {/* Filters */}


        <div

          className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-4
          mb-10
          "

        >



          <div

            className="
            relative
            "

          >



            <input


              value={search}



              onChange={(e)=>{


                setSearch(
                  e.target.value
                );


                setPage(1);


              }}



              placeholder="Search service..."



              className="
              w-full
              rounded-xl
              border
              px-4
              py-3
              pr-10
              outline-none
              focus:ring-2
              focus:ring-[#2563EB]
              "

            />





            {

              search && (


                <button


                  onClick={()=>{


                    setSearch("");

                    setPage(1);


                  }}



                  className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  "

                >


                  <X size={18}/>


                </button>


              )


            }



          </div>









          <select

            value={category}


            onChange={(e)=>{


              setCategory(
                e.target.value
              );


              setPage(1);


            }}


            className="
            rounded-xl
            border
            px-4
            py-3
            "

          >


            {

              categories.map(item=>(


                <option

                  key={item}

                  value={item}

                >

                  {item}

                </option>


              ))

            }


          </select>









          <select


            value={sort}


            onChange={(e)=>{


              setSort(
                e.target.value
              );


              setPage(1);


            }}



            className="
            rounded-xl
            border
            px-4
            py-3
            "

          >



            <option value="">

              Newest

            </option>



            <option value="low">

              Price Low - High

            </option>



            <option value="high">

              Price High - Low

            </option>



          </select>









          <button


            onClick={()=>{


              setSearch("");

              setCategory("All");

              setSort("");

              setPage(1);


            }}




            className="
            rounded-xl
            border
            px-4
            py-3
            hover:bg-gray-100
            transition
            "

          >

            Clear Filters


          </button>






        </div>









        {/* Cards */}



        <div

          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
          "

        >



          {

            loading ?


            Array.from({

              length:8

            }).map((_,index)=>(


              <ServiceCardSkeleton

                key={index}

              />


            ))



            :


            services.length > 0 ?



            services.map(service=>(


              <ServiceCard


                key={service._id}


                service={service}


              />


            ))



            :


            <div

              className="
              col-span-full
              text-center
              py-10
              text-gray-500
              "

            >

              No services found


            </div>



          }



        </div>









        {/* Pagination */}



        <div

          className="
          flex
          justify-center
          items-center
          gap-2
          mt-10
          flex-wrap
          "

        >



          <button


            disabled={page===1}



            onClick={()=>setPage(page-1)}



            className="
            px-4
            py-2
            rounded-lg
            border
            disabled:opacity-50
            "

          >

            Previous


          </button>








          {

            Array.from({

              length:totalPages

            }).map((_,index)=>{


              const number=index+1;



              return (

                <button


                  key={number}


                  onClick={()=>setPage(number)}



                  className={`

                  px-4
                  py-2
                  rounded-lg
                  border

                  ${
                    page===number

                    ?

                    "bg-[#2563EB] text-white"

                    :

                    ""

                  }

                  `}


                >


                  {number}



                </button>


              )


            })


          }









          <button


            disabled={page===totalPages}



            onClick={()=>setPage(page+1)}



            className="
            px-4
            py-2
            rounded-lg
            border
            disabled:opacity-50
            "


          >


            Next


          </button>






        </div>







      </div>


    </main>


  );


}