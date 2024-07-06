import { Link } from "next-view-transitions"
import { Button } from "@/components/ui/button"




export default function page({params}) {

  const id = params.slug;

  return (
 <main className="flex min-h-screen flex-col items-center justify-between p-24"> 
 <h1 className="font-semibold text-2xl">hospital-{id} Home page</h1>

 <Link href="/"><Button> Main Home</Button></Link>
    <div className=" grid grid-cols-1 sm:grid-cols-4 gap-4">
<Link href={`/hospital/patientinfo/${id}`}><Button>patient info</Button></Link>
<Link href={`/hospital/hospitalinfo/${id}`}><Button> hospital info</Button></Link>
<Link href={`/hospital/addpatient/${id}`}><Button> add patient</Button></Link>
<Link href={`/hospital/blood-requests/${id}`}><Button>blood requests</Button></Link>
{/* <Link href={`/hospital/addblood-request/${id}`}><Button>new blood request</Button></Link> */}

    </div>
 </main>
  )
}
