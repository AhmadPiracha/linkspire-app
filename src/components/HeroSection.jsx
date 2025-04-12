import { motion } from 'framer-motion';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';


export default function HeroSection({setView}) {
  const particlesInit = async (main) => await loadFull(main);
  return (
    <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 50 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.5 },
          },
        }}
        className="absolute inset-0"
      />
      <div className="relative container mx-auto px-6 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Show your professional self. Connect. Get hired.
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Join the premier platform for professional networking and job opportunities.
        </motion.p>
        <div className="space-x-4">
          <motion.button
            onClick={() => setView('dashboard')}
            className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
            whileHover={{ scale: 1.05 }}
          >
            Create Profile
          </motion.button>
          <motion.button
            onClick={() => setView('dashboard')}
            className="inline-block bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-indigo-600 transition"
            whileHover={{ scale: 1.05 }}
          >
            Browse Talent
          </motion.button>
        </div>
      </div>
    </section>
  );
}
