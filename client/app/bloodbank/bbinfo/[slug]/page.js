'use client'
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Page({ params }) {
  const [bloodBankData, setBloodBankData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/get_blood_bank_info', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id: parseInt(params.slug) }) // Assuming params.slug is a string
        });
        const data = await response.json();
        setBloodBankData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.slug]); // Add params.slug to dependency array to fetch data when it changes

  return (
    <main>
      <h1 className="my-4">Blood bank info page</h1>
      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-3 mb-6 z-60 mx-3">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="py-3 px-6">BB Name</th>
              <th scope="col" className="py-3 px-6">Location</th>
              <th scope="col" className="py-3 px-6">Contact</th>
            </tr>
          </thead>
          <tbody>
            {bloodBankData.map((row) => (
              <tr key={row.id} className="bg-white border-b hover:bg-gray-100">
                <td className="py-4 px-6">{row.name || 'N/A'}</td>
                <td className="py-4 px-6">{row.location || 'N/A'}</td>
                <td className="py-4 px-6">{row.number || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link href="/" className="mx-4">
        <Button>Back to main</Button>
      </Link>
      <Link href={`/bloodbank/bb-intro/${params.slug}`}>
        <Button>Blood bank home</Button>
      </Link>
    </main>
  );
}


// 'use client'
// import { useEffect, useState } from "react";
// import { Link } from "next/link";
// import { Button } from "@/components/ui/button";

// export default function Page({ params }) {
//   const [bloodBankData, setBloodBankData] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3000/get_blood_bank_info")
//       .then((response) => response.json())
//       .then((data) => setBloodBankData(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <main>
//       <h1 className="my-4">Blood bank info page</h1>
//       <div className="overflow-x-auto shadow-md sm:rounded-lg mt-3 mb-6 z-60 mx-3">
//         <table className="w-full text-sm text-left text-gray-500">
//           <thead className="text-sm text-gray-700 uppercase bg-gray-100">
//             <tr>
//               <th scope="col" className="py-3 px-6">
//                 BB Name
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 BB ID
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 Location
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 Contact
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {bloodBankData.map((row, index) => (
//               <tr key={index} className="bg-white border-b hover:bg-gray-100">
//                 <td className="py-4 px-6">{row[1] || 'N/A'}</td>
//                 <td className="py-4 px-6">{row[2] || 'N/A'}</td>
//                 <td className="py-4 px-6">{row[3] || 'N/A'}</td>
//                 <td className="py-4 px-6">{row[4] || 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Link href="/" className="mx-4">
//         <Button>back to home</Button>
//       </Link>
//       <Link href={`/bloodbank/bb-intro/${params.slug}`}>
//         <Button>bb intro page</Button>
//       </Link>
//     </main>
//   );
// }


//attempt 3
// 'use client'
// import { useEffect, useState } from "react";
// import { Link } from "next/link";
// import { Button } from "@/components/ui/button";

// export default function page({ params }) {
//   const [bloodBankData, setBloodBankData] = useState([]);

//   useEffect(() => {
//     const fetchBloodBankData = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/get_blood_bank_info", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({ id: params.slug })
//         });
//         const data = await response.json();
//         setBloodBankData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchBloodBankData();
//   }, [params.slug]);

//   return (
//     <main>
//       <h1 className="my-4">Blood bank info page</h1>
//       <div className="overflow-x-auto shadow-md sm:rounded-lg mt-3 mb-6 z-60 mx-3">
//         <table className="w-full text-sm text-left text-gray-500">
//           <thead className="text-sm text-gray-700 uppercase bg-gray-100">
//             <tr>
//               <th scope="col" className="py-3 px-6">
//                 BB Name
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 BB ID
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 Location
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 Contact
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {bloodBankData.map((row, index) => (
//               <tr key={index} className="bg-white border-b hover:bg-gray-100">
//                 <td className="py-4 px-6">{row[1] || 'N/A'}</td>
//                 <td className="py-4 px-6">{row[2] || 'N/A'}</td>
//                 <td className="py-4 px-6">{row[3] || 'N/A'}</td>
//                 <td className="py-4 px-6">{row[4] || 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Link href="/" className="mx-4">
//         <Button>back to home</Button>
//       </Link>
//       <Link href={`/bloodbank/bb-intro/${params.slug}`}>
//         <Button>bb intro page</Button>
//       </Link>
//     </main>
//   );
// }


// 'use client'
// import { useEffect, useState } from "react";
// import { Link } from "next/link";
// import { Button } from "@/components/ui/button";

// export default function page({ params }) {
//   const [bloodBankData, setBloodBankData] = useState([]);

//   useEffect(() => {
//     const fetchBloodBankData = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/get_blood_bank_info", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({ id: params.slug })
//         });
//         const data = await response.json();
//         setBloodBankData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchBloodBankData();
//   }, [params.slug]);

//   return (
//     <main>
//       <h1 className="my-4">Blood bank info page</h1>
//       <div className="overflow-x-auto shadow-md sm:rounded-lg mt-3 mb-6 z-60 mx-3">
//         <table className="w-full text-sm text-left text-gray-500">
//           <thead className="text-sm text-gray-700 uppercase bg-gray-100">
//             <tr>
//               <th scope="col" className="py-3 px-6">
//                 BB Name
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 BB ID
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 Location
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 Contact
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {bloodBankData.map((row, index) => (
//               <tr key={index} className="bg-white border-b hover:bg-gray-100">
//                 <td className="py-4 px-6">{row.bbName || 'N/A'}</td>
//                 <td className="py-4 px-6">{row.bbId || 'N/A'}</td>
//                 <td className="py-4 px-6">{row.location || 'N/A'}</td>
//                 <td className="py-4 px-6">{row.contact || 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Link href="/" className="mx-4">
//         <Button>back to home</Button>
//       </Link>
//       <Link href={`/bloodbank/bb-intro/${params.slug}`}>
//         <Button>bb intro page</Button>
//       </Link>
//     </main>
//   );
// }
