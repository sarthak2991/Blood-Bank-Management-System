'use client'
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useState , useEffect} from "react";





export default function page({params}) {

  const id = params.slug;
  const [hospitalData, setHospitalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/get_hospital_info', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id: parseInt(params.slug) }) // Assuming params.slug is a string
        });
        const data = await response.json();
        setHospitalData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.slug]); // 

  return (
    <main>

    <h1 className="my-4">hospital info info page</h1>

      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-3 mb-6 z-60 mx-3">
  <table className="w-full text-sm text-left text-gray-500">
    <thead className="text-sm text-gray-700 uppercase bg-gray-100">
      <tr>
        <th scope="col" className="py-3 px-6">Name</th>
        <th scope="col" className="py-3 px-6">ID</th>
        <th scope="col" className="py-3 px-6">address</th>
        <th scope="col" className="py-3 px-6">Contact</th>
      </tr>
    </thead>
    <tbody>
      {hospitalData.map((row) => (
          <tr key={row.id} className="bg-white border-b hover:bg-gray-100">
          <td className="py-4 px-6">{row.name || 'N/A'}</td>
          <td className="py-4 px-6">{row.id|| 'N/A'}</td>
          <td className="py-4 px-6">{row.location || 'N/A'}</td>
          <td className="py-4 px-6">{row.number || 'N/A'}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

<Link href="/" className="mx-4"><Button>back to home</Button></Link>
<Link href={`/hospital/h-intro/${id}`}><Button>hospital home page</Button></Link>
      </main>
  )
}
