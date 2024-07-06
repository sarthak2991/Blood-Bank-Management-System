import React from 'react'
import { Input } from '@/components/ui/input'
import { Link } from 'next-view-transitions'
import { Button } from '@/components/ui/button'

export default function page({params}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"> 

    <h1 className='font-semibold text-3xl'>Add blood request</h1>
    <Link href="/"><Button>Back to Home page</Button></Link>
    <Link href={`/hospital/h-intro/${params.slug}`} className='my-3'><Button>h-intro page</Button></Link>

   <div className='flex flex-col my-3'> 
   <p>Enter your details</p>
   <form>
    <div  className="grid w-full items-center gap-4">
    <Input className="shadow-md" placeholder="patient ID"/>
    <Input className="shadow-md" placeholder="blood group"/>
    <Input className="shadow-md" placeholder="amount required"/>
    <Input className="shadow-md" placeholder="request date"/>
    <Button className="my-3 justify-center">
     submit request
    </Button>
</div>
</form>

   </div>
    </main>
  )
}
