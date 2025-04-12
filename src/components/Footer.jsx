import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      className="bg-white dark:bg-gray-800 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div>
            <p className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Linkspire. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">
              Privacy
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">
              Terms
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary">
              Contact
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}