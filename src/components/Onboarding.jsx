import { motion } from 'framer-motion';

export default function Onboarding({ onClose }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl p-8 w-11/12 max-w-md"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Welcome to Linkspire!</h2>
        <p className="mb-4">
          Linkspire is your premier platform for professional networking and job opportunities.
        </p>
        <ol className="list-decimal pl-5 space-y-2 mb-6">
          <li>Connect with professionals in your industry.</li>
          <li>Explore job opportunities tailored to your skills.</li>
          <li>Apply directly from the platform.</li>
        </ol>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-primary dark:bg-secondary text-white rounded-lg hover:bg-secondary-dark transition"
        >
          Get Started
        </button>
      </motion.div>
    </motion.div>
  );
}