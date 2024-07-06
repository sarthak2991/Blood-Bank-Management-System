import { Button } from "@/components/ui/button";
import { Link } from 'next-view-transitions'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
     <div className="flex flex-col items-center gap-3">
     <h1 className="text-3xl font-semibold">Blood bank management system</h1>
     <h1 className="font-bold">DBMS project</h1>
      <h1 className="font-bold text-3xl">GROUP-32</h1>

     </div>

     <div className="flex flex-row gap-4">
      <Link href="/bloodbank/addbb-id">
      <Button>Blood bank</Button>
      </Link>

      <Link href="/hospital/h1d">
      <Button>Hospital</Button>
      </Link>
     </div>
    </main>
  );
}
