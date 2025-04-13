import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProfileCard({ profile, onConnect, setView, setSelectedProfileId }) {
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
      onClick={() => {
        onConnect(profile);
        setSelectedProfileId(profile.id);
        // setView('profile'); // Removed to avoid breaking UI
        setIsLiked(false);
      }}
      onDoubleClick={handleDoubleTap}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center cursor-pointer relative"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {isLiked && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      )}
      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl mb-4">
        {profile.name.split(' ').map(n => n[0]).join('')}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{profile.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{profile.bio}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {profile.skills.map(skill => (
          <span
            key={skill}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-800 dark:text-gray-200 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
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
    </motion.div>
  );
}