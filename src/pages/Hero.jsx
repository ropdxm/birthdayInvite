import { Calendar, Clock, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import config from '@/config/config';
import { formatEventDate } from '@/lib/formatEventDate';
import { safeBase64 } from '@/lib/base64';
import photo1 from "../../public/images/photo1.jpeg"

import heroleft from "../../public/images/heroleft.jpeg"
import heromiddle from "../../public/images/heromiddle.jpeg"
import heroright from "../../public/images/heroright.jpeg"
import heartIcon from "../../public/images/heart.png"


export default function Hero() {
    const [guestName, setGuestName] = useState('');
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
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const guestParam = urlParams.get('guest');

        if (guestParam) {
            try {
                const decodedName = safeBase64.decode(guestParam);
                setGuestName(decodedName);
            } catch (error) {
                console.error('Error decoding guest name:', error);
                setGuestName('');
            }
        }
    }, []);

    const FloatingHearts = () => {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: Math.random() * window.innerWidth,
                            y: window.innerHeight
                        }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1, 1, 0.5],
                            x: Math.random() * window.innerWidth,
                            y: -100
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeOut"
                        }}
                        className="absolute"
                    >
                        <Heart
                            className={`w-${Math.floor(Math.random() * 2) + 8} h-${Math.floor(Math.random() * 2) + 8} ${i % 3 === 0 ? 'text-amber-400' :
                                i % 3 === 1 ? 'text-amber-600' :
                                    'text-amber-400'
                                }`}
                            fill="currentColor"
                        />
                    </motion.div>
                ))}
            </div>
        );
    };

    return (
        <>
            <section id="home" className="min-h-screen flex flex-col items-center justify-center   sm:py-20 text-center relative overflow-hidden">
                                    <div className="flex w-full bg-white rounded-lg shadow-lg overflow-hidden">
  <div className="flex-1 relative group">
    <img 
      src={photo1} 
      alt="Description 1" 
      className="w-full h-70 object-cover"
    />
<div className="absolute bottom-0 left-0 right-0 bg-[#055d64]/70 backdrop-blur-sm py-2">
  <div className="text-white text-center text-3xl font-fancy tracking-wider">28.11.2025</div>
</div>
  </div>
  

</div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 relative z-10"
                >
                    

                    <div className="space-y-4">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
className="my-8 px-8 text-[1.2rem] sm:text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-[#055d64] to-[#055d64] uppercase"
>                            Құрметті <br/> ағайын-туыс, бауырлар, нағашы-жиен, бөлелер, құда жекжат,<br/> дос-жарандар, әріптестер мен көршілер!
                        </motion.h2>
                        <motion.h2
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="p-2 px-4 text-[1.2rem] sm:text-5xl font-serif bg-clip-text bg-gradient-to-r from-white to-white"
                        >
                            Сіздерді әкеміз<br/> <span className='font-fancy text-[2.2rem]  text-[#055d64]'> Бұзаубай </span><br/>70 жас мерейтойына <br/> және анамыз <br/> <span className='font-fancy text-[2.2rem]  text-[#055d64]'> Нағима</span><br/> екеуінің отандасқанына 50 жыл болуына арналған салтанатты кешіміздің қадірлі қонағы болуға шақырамыз!
                        </motion.h2>
                    </div>

                    <div className="pt-6 relative">
                        {/* <FloatingHearts />
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Heart className="w-10 sm:w-12 h-10 sm:h-12 text-amber-600 mx-auto" fill="currentColor" />
                        </motion.div> */}
                    </div>

                </motion.div>
            </section>
        </>
    )
}
