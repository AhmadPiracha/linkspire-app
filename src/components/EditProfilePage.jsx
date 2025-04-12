import { useState } from 'react';
import { motion } from 'framer-motion';

const tabs = ['Personal Info', 'Work', 'Portfolio', 'Settings'];

export default function EditProfilePage({ setView }) {
  const [activeTab, setActiveTab] = useState('Personal Info');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-6 py-12"
    >
      <button
        onClick={() => setView('dashboard')}
        className="mb-4 text-indigo-600 dark:text-indigo-400"
      >
        ← Back to Dashboard
      </button>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        <div className="flex space-x-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg ${
                activeTab === tab ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'Personal Info' && (
            <div>
              <input
                className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700"
                placeholder="Name"
              />
              <input
                className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-700"
                placeholder="Role"
              />
            </div>
          )}
          {activeTab === 'Work' && <div>Work Experience Form</div>}
          {activeTab === 'Portfolio' && <div>Portfolio Form</div>}
          {activeTab === 'Settings' && <div>Settings Form</div>}
        </motion.div>
      </div>
    </motion.div>
  );
}