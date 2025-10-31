import config from "@/config/config";
import { Clock, Navigation as NavigationIcon, MapPin, CalendarCheck, Phone, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion';
import { formatEventDate } from "@/lib/formatEventDate";
import palaceP from "../../public/images/palace.jpeg"
import twogis from "../../public/images/gis.svg"

export default function Location() {
    return (<>
        {/* Location section */}
        <section id="location" className="min-h-screen relative overflow-hidden">
            <img src={palaceP} alt="Description" class="mt-10 w-full max-w-md mx-auto rounded-t-3xl shadow-2xl border-2 border-[#055d64] p-1" />
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mt-10 mb-6"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mt-8 font-fancy p-2 text-4xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#055d64] to-[#055d64]"
                    >
                        Мекен-жайымыз:
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="my-8 p-2 text-2xl sm:text-4xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-black to-black uppercase"
                    >
                        Түркістан қаласы, 160-ші орам, 417/1 <br /> "Нұр Аспан" тойханасы
                    </motion.h2>

                    {/* Decorative Divider */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <div className="h-[1px] w-12 bg-[#055d64]" />
                        <MapPin className="w-5 h-5 text-[#055d64]" />
                        <div className="h-[1px] w-12 bg-[#055d64]" />
                    </motion.div>
                </motion.div>

                {/* Location Content */}
                <div className="max-w-6xl mx-auto grid md:grid-row-2 gap-8 items-center">
                    {/* Map Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border-8 border-white"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10728894.774616892!2d54.43079720432!3d48.96568875433799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4200c117d814c56b%3A0xc9cbf1c712dd85b1!2sNURASPAN%20Ballroom!5e0!3m2!1sfr!2skz!4v1761917001280!5m2!1sfr!2skz"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full"
                        ></iframe>
                    </motion.div>

                                        <div className="pt-4">
                                    <motion.a
                                        href="https://go.2gis.com/FrV91"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        viewport={{ once: true }}
                                        className="w-full flex items-center justify-center gap-1.5 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
                                    >
                                        <img src={twogis} className="w-[4rem]" />
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        <span className="font-semibold">Картаны ашу</span>
                                    </motion.a>
                                </div>


                </div>
            </div>
        </section>
    </>)
}