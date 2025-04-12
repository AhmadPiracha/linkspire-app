import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon, BriefcaseIcon } from 'lucide-react';

export default function JobCard({ job, onApply }) {
  const [isLiked, setIsLiked] = useState(false);
  const [lastTap, setLastTap] = useState(null);

  const handleDoubleTap = (e) => {
    const now = Date.now();
    const TAP_THRESHOLD = 250;
    const COORD_THRESHOLD = 30;

    if (lastTap) {
      const timeDiff = now - lastTap.time;
      const coordDiff =
        Math.abs(e.clientX - lastTap.clientX) +
        Math.abs(e.clientY - lastTap.clientY);

      if (timeDiff < TAP_THRESHOLD && coordDiff < COORD_THRESHOLD) {
        setIsLiked(!isLiked);
        e.stopPropagation();
      }
    }

    setLastTap({ time: now, clientX: e.clientX, clientY: e.clientY });
  };

  return (

    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col justify-between cursor-pointer relative"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onApply(job)}
      onDoubleClick={handleDoubleTap}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {/* Heart Icon for Double Tap */}
      {isLiked && (
        <motion.div
          className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-red-500 text-xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          ❤️
        </motion.div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{job.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{job.company} – {job.location}</p>
        <p className="mt-2 text-gray-700 dark:text-gray-300 line-clamp-3">{job.description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            job.type === 'Full-time'
              ? 'bg-emerald-100 text-emerald-800'
              : job.type === 'Part-time'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {job.type}
        </span>
        <motion.button
          className="px-4 py-1 bg-primary dark:bg-secondary text-white rounded-lg text-sm"
          whileTap={{ scale: 0.95 }}
          onClick={onApply}
        >
          Apply
        </motion.button>
      </div>
    </motion.div>
  );
}
