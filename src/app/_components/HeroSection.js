import React from 'react'
import { ArrowRight, CalendarIcon, ClockIcon,} from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {


  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
        <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>Listen! <br/> to all your favourites</h1>

        <Link href='/search' className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Search Today
        <ArrowRight className='w-5 h-5'/>
        </Link>
    </div>
  )
}
