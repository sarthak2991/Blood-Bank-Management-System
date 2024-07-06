// import React from 'react'
// import { Input } from '@/components/ui/input'
// import { Link } from 'next-view-transitions'
// import { Button } from '@/components/ui/button'

// export default function page({params}) {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24"> 

//     <h1 className='font-semibold text-3xl my-3'> approve Request blood</h1>
//     <Link href="/"><Button>Back to Home page</Button></Link>
//     <Link href={`/bloodbank/bb-intro/${params.slug}`} className='my-3'><Button>BB-intro page</Button></Link>

//    <div className='flex flex-col my-3'> 
//    <p>Enter patient ID to be approved</p>
//    <form>
//     <div  className="grid w-full items-center gap-4">
//     <Input className="shadow-md" placeholder="Enter paitent ID"/>
//     <Button className="my-3 justify-center">
//       SUBMIT
//     </Button>

//     </div>

//    </form>

//    </div>
//     </main>
//   )
// }

'use client'
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Link } from 'next-view-transitions';
import { Button } from '@/components/ui/button';

export default function page({ params }) {
  const [patientId, setPatientId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [requestData , setRequestData] =  useState([]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/approveBloodRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId: patientId,
        }),
      });

      if (response.ok) {
        // Show success message
        setSuccessMessage('Request approved successfully');

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } else {
        // Handle error response from the API
        console.error('Failed to approve request');
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };


  //fetch all requests.
  useEffect(()=>{
    const getRequests = async()=>{
      try {
        const response = await fetch('http://localhost:3000/getall?',{
          method : "GET",
          headers:{
            "Content-type" : "application/json"
          }
        });
  
        const data = await response.json();
        setRequestData(data);
      } catch (error) {
        console.error("Error fetching data:", error);

      }
    }
    
    getRequests();

  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-semibold text-3xl my-3">Approve Blood Request</h1>
      <Link href="/">
        <Button>Back to main</Button>
      </Link>
      <Link href={`/bloodbank/bb-intro/${params.slug}`} className="my-3">
        <Button>Blood bank home</Button>
      </Link>



      <div className="flex flex-col my-3">
        <p>Enter request ID to be approved</p>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <Input
              className="shadow-md"
              placeholder="Enter request ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
            <Button type="submit" className="my-3 justify-center">
              SUBMIT
            </Button>
          </div>
        </form>
      </div>




      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-3 mb-6 z-60 mx-3">
  <table className="w-full text-sm text-left text-gray-500">
    <thead className="text-sm text-gray-700 uppercase bg-gray-100">
      <tr>
        <th scope="col" className="py-3 px-6">hospital id</th>
        <th scope="col" className="py-3 px-6">request id</th>

        <th scope="col" className="py-3 px-6">quantity</th>
        <th scope="col" className="py-3 px-6">blood grp</th>
        <th scope="col" className="py-3 px-6">request date</th>
        <th scope="col" className="py-3 px-6">patient id</th>
        <th scope="col" className="py-3 px-6">Status</th>



      </tr>
    </thead>
    <tbody>
      {requestData.map((row) => (
          <tr key={row.id} className="bg-white border-b hover:bg-gray-100">

          <td className="py-4 px-6">{row.hospitalId || 'N/A'}</td>
          <td className="py-4 px-6">{row.requestId || 'N/A'}</td>
          <td className="py-4 px-6">{row.quantity|| 'N/A'}</td>
          <td className="py-4 px-6">{row.bloodType || 'N/A'}</td>
          <td className="py-4 px-6">{row.requestDate || 'N/A'}</td>
          <td className="py-4 px-6">{row.patientId|| 'N/A'}</td>
          <td className="py-4 px-6">{row.status ? "Approved" : "Not approved"}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {successMessage && (
        <div className="bg-green-200 text-green-700 p-2 rounded-md mt-4">
          {successMessage}
        </div>
      )}
    </main>
  );
}
