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
import { useState } from 'react';
import { formatEventDate } from '@/lib/formatEventDate';

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
            <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="uppercase p-2 text-2xl sm:text-4xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-black to-black uppercase"
                    >
                      Той иелері: қызы мен ұлдары <br />
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

            <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
className="px-4 my-8 font-fancy p-2 text-4xl text-center sm:text-6xl leading-10 bg-clip-text text-transparent bg-gradient-to-r from-[#055d64] to-[#055d64] uppercase"
>                            {`Келіңіздер,\nтойымыздың қадірлі\nқонағы болыңыздар!`}
                        </motion.h2>
        </section>
    </>)
}
