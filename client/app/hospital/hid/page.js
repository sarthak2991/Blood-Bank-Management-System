'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'next-view-transitions';
function page() {
  const router = useRouter();
  const [hId, setHId] = useState('');
  const [redirecting, setRedirecting] = useState(false);

  const handleInputChange = (event) => {
    setHId(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Set state to trigger rendering a redirect
    setRedirecting(true);
  };

  // Redirect if the state is set
  if (redirecting) {
    router.push(`/hospital/h-intro/${hId}`);
    return null; // Render nothing while redirecting
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
<h1>Hospital login</h1>
<Link href="/"><Button>Home</Button></Link>
      <h1 className="font-semibold">Enter your hospital id</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-3 w-2/3">
        <Input type="text" value={hId} onChange={handleInputChange} className="shadow-md"  placeholder="enter hospital ID"/>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default page;
