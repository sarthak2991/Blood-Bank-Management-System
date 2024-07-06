'use client'
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export default function Page({ params }) {
  const id = params.slug;
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/getallpatient?id=${id}`);
        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]); 

  return (
    <main>
      <h1 className="my-4 mx-6">All Patient Info</h1>
   
      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-3 mb-6 z-60 mx-3">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="py-3 px-6">Patient ID</th>
              <th scope="col" className="py-3 px-6">Hospital ID</th>
              <th scope="col" className="py-3 px-6">Name</th>
              <th scope="col" className="py-3 px-6">Age</th>
              <th scope="col" className="py-3 px-6">Contact</th>
              <th scope="col" className="py-3 px-6">Gender</th>
              <th scope="col" className="py-3 px-6">Blood Type</th>
              <th scope="col" className="py-3 px-6">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {patientData.map((row) => (
              <tr key={row.patientId} className="bg-white border-b hover:bg-gray-100">
                <td className="py-4 px-6">{row.patientId || 'N/A'}</td>
                <td className="py-4 px-6">{row.hospitalId || 'N/A'}</td>
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
        <Button>Back to Home</Button>
      </Link>
      <Link href={`/hospital/h-intro/${id}`}>
        <Button>Hospital home Page</Button>
      </Link>
    </main>
  );
}
