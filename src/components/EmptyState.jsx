import { motion } from 'framer-motion';
import { BriefcaseIcon } from 'lucide-react';

export default function EmptyState({ message }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-64"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BriefcaseIcon size={64} className="text-gray-400 dark:text-gray-500 mb-4" />
      <p className="text-gray-500 dark:text-gray-400 text-center">{message}</p>
    </motion.div>
  );
}