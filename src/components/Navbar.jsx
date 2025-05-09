import { motion, AnimatePresence } from 'framer-motion';
import { MoonIcon, SunIcon, MenuIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

const tabs = ['For You', 'Jobs', 'Profiles', 'Create Job'];

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme, setView, userProfile }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setView('dashboard');
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-20"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between md:space-x-6">
        <button
          onClick={() => setView('dashboard')}
          className="text-2xl font-bold text-primary dark:text-secondary"
        >
          Linkspire
        </button>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {isMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

        {/* Desktop Tabs */}
        <nav className="hidden md:flex space-x-6 items-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`relative px-3 py-2 font-medium ${
                activeTab === tab
                  ? 'text-primary dark:text-secondary'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-secondary'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-primary dark:bg-secondary rounded-full"
                  layoutId="underline"
                />
              )}
            </button>
          ))}
          {/* User Profile */}
          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm">
              {userProfile.name.split(' ').map(n => n[0]).join('')}
            </div>
            {/* <span className="text-gray-600 dark:text-gray-300">{userProfile.name}</span> */}
            {/* {userProfile.isAdmin && (
              <span className="text-xs bg-red-500 text-white px-1 rounded">Admin</span>
            )} */}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg rounded-b-lg p-4 md:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`block w-full text-left px-3 py-2 font-medium ${
                    activeTab === tab
                      ? 'text-primary dark:text-secondary'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-secondary'
                  }`}
                >
                  {tab}
                </button>
              ))}
              <button
                onClick={() => setShowProfileModal(true)}
                className="block w-full text-left px-3 py-2 font-medium text-gray-600 dark:text-gray-300"
              >
                {userProfile.name} {userProfile.isAdmin && '(Admin)'}
              </button>
              <button
                onClick={toggleTheme}
                className="mt-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition w-full text-center"
              >
                {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Theme Toggle (Desktop Only) */}
        <button
          onClick={toggleTheme}
          className="hidden md:block p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
        </button>

        {/* Profile Modal */}
        <AnimatePresence>
          {showProfileModal && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl p-6 w-11/12 max-w-sm"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <h2 className="text-xl font-semibold mb-2">{userProfile.name}</h2>
                <p className="mb-2">{userProfile.bio}</p>
                <p className="mb-2"><strong>Location:</strong> {userProfile.location}</p>
                <p className="mb-4"><strong>Skills:</strong> {userProfile.skills.join(', ')}</p>
                {userProfile.isAdmin && (
                  <p className="mb-4 text-red-500">Administrator</p>
                )}
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}