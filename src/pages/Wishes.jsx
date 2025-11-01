import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti';
import Marquee from "@/components/ui/marquee";
import {
    Calendar,
    Clock,
    ChevronDown,
    User,
    MessageCircle,
    Send,
    Smile,
    CheckCircle,
    XCircle,
    HelpCircle,
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react';
import { formatEventDate } from '@/lib/formatEventDate';
import alem from "../../public/audio/alem.mp3"

import { initializeApp } from "firebase/app";
import { collection, addDoc, serverTimestamp, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAcDMwBtkbFn8eGJaci435Ot3b9o07gAN0",
  authDomain: "nurda-a11c8.firebaseapp.com",
  projectId: "nurda-a11c8",
  storageBucket: "nurda-a11c8.firebasestorage.app",
  messagingSenderId: "766767797141",
  appId: "1:766767797141:web:e1822194129234c65b9c9c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export default function Wishes() {
    
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('');
  const [loading, setLoading] = useState(false);

const audioRef = useRef(null);

  useEffect(() => {
    const tryAutoPlay = async () => {
      try {
        if (audioRef.current) {
          // Set very low volume and mute if needed
          audioRef.current.volume = 0.1;
          await audioRef.current.play();
          console.log('Background audio started successfully');
        }
      } catch (error) {
        console.log('Auto-play failed:', error);
        
        // Alternative: Create new audio context (sometimes works better)
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          const audioContext = new AudioContext();
          const source = audioContext.createBufferSource();
          // You would need to decode and play your audio buffer here
          console.log('AudioContext created - alternative method');
        } catch (altError) {
          console.log('Alternative method also failed');
        }
      }
    };

    // Try multiple times with delays
    const attempts = [100, 500, 1000, 2000];
    
    attempts.forEach(delay => {
      setTimeout(tryAutoPlay, delay);
    });

    // Also try on window load
    window.addEventListener('load', tryAutoPlay);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    console.log({ name, attendance });
try{
    const res = await addDoc(collection(db, 'come'), {
        name: name,
        attendance: attendance,
        createdAt: new Date().toISOString()
      });
      console.log(res);
    } catch (error) {
        console.error(error)
    }finally{
        setLoading(false)
        alert("Сіздің жауабыңыз сақталды")
    }

  };


    return (<>
        <section id="wishes" className="min-h-screen relative overflow-hidden">
               
                {/* Wishes Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-2xl mx-4 mt-12"
                >
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Name Input */}
          <div>
<motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mb-4 font-fancy p-2 text-4xl sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#055d64] to-[#055d64]"
                    >
                        Той иелері: қызы мен ұлдары!
                    </motion.span>
            <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="uppercase p-2 text-2xl sm:text-4xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-black to-black uppercase"
                    >
                        Есіміңізді жазуыңызды өтінеміз
                    </motion.h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-[#055d64]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#055d64] focus:border-transparent bg-white/50 backdrop-blur-sm"
              placeholder="Есіміңіз"
              required
            />
          </div>

          {/* Radio Buttons */}
          <div>
            <div className="space-y-3">
              <label className="flex items-center pl-3 rounded-lg">
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={attendance === 'yes'}
                  onChange={(e) => setAttendance(e.target.value)}
                  className="h-5 w-5 text-[#055d64] focus:ring-[#055d64] border-[#055d64]"
                />
                <span className="ml-3 text-black uppercase">Әрине, келемін</span>
              </label>
              
              <label className="flex items-center pl-3 rounded-lg">
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={attendance === 'no'}
                  onChange={(e) => setAttendance(e.target.value)}
                  className="h-5 w-5 text-[#055d64] focus:ring-[#055d64] border-[#055d64]"
                />
                <span className="ml-3 text-black uppercase">Өкінішке орай, келе алмаймын</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!name || !attendance || loading}
            className="w-full bg-[#055d64] text-white py-3 px-4 rounded-lg hover:bg-[#044a54] focus:outline-none focus:ring-2 focus:ring-[#055d64] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Жіберу
          </button>
        </form>

                </motion.div>

<motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mt-6 font-fancy p-4 text-center text-5xl sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-[#055d64] to-[#055d64]"
                    >
                            {`Келіңіздер,\nтойымыздың қадірлі\nқонағы болыңыздар!`}
                        </motion.div>
      <audio
      ref={audioRef}
        loop
        preload="auto"
        src={alem}
      />
        </section>
    </>)
}
