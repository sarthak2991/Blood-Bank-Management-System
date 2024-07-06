// import { Link } from "next-view-transitions";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";


// const sampleData = [
//     {
//       id: 1,
//       name: "harsh",
//       donorID: "dd001",
//       bloodgrp: "A",
//       bbID : "bb001",
//       contact: "123-456-7890",
//       gender : "M",
//       age : 44 , 
//     },

//     {
//       id: 2,
//       name: "priyansh",
//       donorID: "dd002",
//       bloodgrp: "A",
//       bbID : "bb001",
//       contact: "123-456-7890",
//       gender : "M",
//       age : 44 , 
//     },

//     {
//       id: 3,
//       name: "somani",
//       donorID: "dd003",
//       bloodgrp: "A",
//       bbID : "bb001",
//       contact: "123-456-7890",
//       gender : "M",
//       age : 44 , 
//     },

//     {
//       id: 4,
//       name: "yash",
//       donorID: "dd004",
//       bloodgrp: "A",
//       bbID : "bb001",
//       contact: "123-456-7890",
//       gender : "M",
//       age : 44 , 
//     },
   
      
//   ];


// export default function page({params}) {

//   const id = params.slug;

//   return (
//     <main>

//     <h1 className="my-4">donor page</h1>
//     <div className='flex flex-col gap-3 w-2/3 mx-auto' > 
//    <Input className="shadow-md" placeholder="search by name"/>
//    <Input className="shadow-md" placeholder="search by ID"/>


//    </div>
//       <div className="overflow-x-auto shadow-md sm:rounded-lg mt-3 mb-6 z-60 mx-3">
//   <table className="w-full text-sm text-left text-gray-500">
//     <thead className="text-sm text-gray-700 uppercase bg-gray-100">
//       <tr>
//         <th scope="col" className="py-3 px-6">donor Name</th>
//         <th scope="col" className="py-3 px-6">donor ID</th>
//         <th scope="col" className="py-3 px-6">blood group</th>
//         <th scope="col" className="py-3 px-6">gender</th>
//         <th scope="col" className="py-3 px-6">age</th>
//         <th scope="col" className="py-3 px-6">Contact</th>
//         <th scope="col" className="py-3 px-6">bloodbank </th>
//       </tr>
//     </thead>
//     <tbody>
//       {sampleData.map((row) => (
//           <tr key={row.id} className="bg-white border-b hover:bg-gray-100">
//           <td className="py-4 px-6">{row.name || 'N/A'}</td>
//           <td className="py-4 px-6">{row.donorID|| 'N/A'}</td>
//           <td className="py-4 px-6">{row.bloodgrp || 'N/A'}</td>
//           <td className="py-4 px-6">{row.gender || 'N/A'}</td>
//           <td className="py-4 px-6">{row.age || 'N/A'}</td>

//           <td className="py-4 px-6">{row.contact || 'N/A'}</td>
//           <td className="py-4 px-6">{row.bbID || 'N/A'}</td>

//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>

// <Link href="/" className="mx-4"><Button>back to home</Button></Link>
// <Link href={`/bloodbank/bb-intro/${id}`}><Button>bb-intro page</Button></Link>
//       </main>
//   )
// }



'use client'
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export default function Page({ params }) {
  const id = params.slug;
  const [donorData, setDonorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/getalldonor?id=${id}`);
        const data = await response.json();
        setDonorData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]); 

  return (
    <main>
      <h1 className="my-4">All Donors Information</h1>
     
      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-3 mb-6 z-60 mx-3">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="py-3 px-6">Donor ID</th>
              <th scope="col" className="py-3 px-6">blood bank ID</th>
              <th scope="col" className="py-3 px-6">Name</th>
              <th scope="col" className="py-3 px-6">Age</th>
              <th scope="col" className="py-3 px-6">Contact</th>
              <th scope="col" className="py-3 px-6">Gender</th>
              <th scope="col" className="py-3 px-6">Blood Type</th>
              <th scope="col" className="py-3 px-6">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {donorData.map((row) => (
              <tr key={row.patientId} className="bg-white border-b hover:bg-gray-100">
                <td className="py-4 px-6">{row.donorId || 'N/A'}</td>
                <td className="py-4 px-6">{row.bloodbankId || 'N/A'}</td>
                <td className="py-4 px-6">{row.name || 'N/A'}</td>
                <td className="py-4 px-6">{row.age || 'N/A'}</td>
                <td className="py-4 px-6">{row.contact || 'N/A'}</td>
                <td className="py-4 px-6">{row.gender || 'N/A'}</td>
                <td className="py-4 px-6">{row.bloodType || 'N/A'}</td>
                <td className="py-4 px-6">{row.quantity || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link href="/" className="mx-4">
        <Button>Back to main</Button>
      </Link>
      <Link href={`/bloodbank/bb-intro/${id}`}>
        <Button>blood bank home</Button>
      </Link>
    </main>
  );
}
