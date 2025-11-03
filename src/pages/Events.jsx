import EventCards from '@/components/EventsCard'

import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import config from '@/config/config';
import photo1 from "../../public/images/photoEvents.jpeg"

import heartIcon from "../../public/images/heart.png"

export default function Events() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });
    
      useEffect(() => {
        // Set your target date here
        const targetDate = new Date('2025-11-28T23:59:59').getTime();
    
        const timer = setInterval(() => {
          const now = new Date().getTime();
          const difference = targetDate - now;
    
          if (difference > 0) {
            setTimeLeft({
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
              minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
              seconds: Math.floor((difference % (1000 * 60)) / 1000)
            });
          } else {
            clearInterval(timer);
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          }
        }, 1000);
    
        return () => clearInterval(timer);
      }, []);
    
    return (
        <>
            {/* Event Section */}
            <section id="event" className="min-h-screen flex flex-col items-center justify-center   sm:py-20 text-center relative overflow-hidden">
                        <img src={photo1} alt="Description" class="w-full max-w-md mx-auto rounded-t-3xl shadow-2xl border-2 border-[#055d64] p-1" />

                          <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
className="mt-8 font-fancy  text-4xl sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#055d64] to-[#055d64] "
>                            Той салтанаты:
                        </motion.h2>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
className="uppercase mt-4 px-2 text-2xl sm:text-5xl font-light bg-clip-text text-transparent bg-gradient-to-r from-black to-black "
>                            28 Қараша 2025 жыл <br /> сағат 18:00
                        </motion.h2>
<div className="bg-transparent mt-3 py-4 px-8 w-full  rounded-lg">

  {/* Week Days Header */}
  <div className="grid grid-cols-7 gap-2 mb-2">
    {['ДС', 'СС', 'СР', 'БС', 'ЖМ', 'СБ', 'ЖБ'].map((day) => (
      <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
        {day}
      </div>
    ))}
  </div>


  {/* Calendar Grid */}
  <div className="grid grid-cols-7 gap-1">
    {/* Empty cells for days before the 1st (Friday and before) */}
    {[...Array(5)].map((_, index) => (
      <div key={`empty-${index}`} className="aspect-square"></div>
    ))}
    
    {/* Calendar Days */}
    {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
      <div
        key={day}
        className={`aspect-square flex items-center justify-center text-gray-700  rounded-lg transition-colors cursor-pointer ${day === 28 ? 'bg-cover bg-center bg-no-repeat transform scale-130' : ''}`}
        style={day==28 ? { backgroundImage: `url(${heartIcon})` } : {}}
      >
        {day}

      </div>
    ))}
  </div>
</div>
<motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
className="mt-5 mb-2 font-fancy p-2 text-4xl sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#055d64] to-[#055d64] "
>                            Тойға дейін:
                        </motion.h2>

{/* a simple countdown */}
    <div className="text-center">
      <div className="flex justify-center items-baseline gap-2 sm:gap-5">
        {/* Days */}
        <div className="text-center">
          <div className="text-4xl sm:text-5xl font-bold text-[#055d64] mb-1">
            {timeLeft.days.toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-black uppercase tracking-wide">күн</div>
        </div>

        {/* Colon separator */}
        <div className="text-2xl sm:text-3xl text-[#055d64] font-bold mb-4">:</div>

        {/* Hours */}
        <div className="text-center">
          <div className="text-4xl sm:text-5xl font-bold text-[#055d64] mb-1">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-black uppercase tracking-wide">сағат</div>
        </div>

        {/* Colon separator */}
        <div className="text-2xl sm:text-3xl text-[#055d64] font-bold mb-4">:</div>

        {/* Minutes */}
        <div className="text-center">
          <div className="text-4xl sm:text-5xl font-bold text-[#055d64] mb-1">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-black uppercase tracking-wide">минут</div>
        </div>

        {/* Colon separator */}
        <div className="text-2xl sm:text-3xl text-[#055d64] font-bold mb-4">:</div>

        {/* Seconds */}
        <div className="text-center">
          <div className="text-4xl sm:text-5xl font-bold text-[#055d64] mb-1">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-black uppercase tracking-wide">секунд</div>
        </div>
      </div>
    </div>
            </section>
        </>
    )
}