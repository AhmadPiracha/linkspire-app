import { motion, AnimatePresence } from 'framer-motion';
import { MoonIcon, SunIcon, MenuIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

const tabs = ['For You', 'Jobs', 'Profiles'];

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme, setView }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (isMenuOpen) {
            setIsMenuOpen(false); // Close the mobile menu after clicking a tab
        }
    };

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-20"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="container mx-auto px-6 py-4 flex items-center justify-between md:space-x-6">
                <h1 className="text-2xl font-bold text-primary dark:text-secondary">Linkspire</h1>

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
                <nav className="hidden md:flex space-x-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={`relative px-3 py-2 font-medium ${activeTab === tab
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
                    {/* <button
                        onClick={() => setView('editProfile')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    >
                        Edit Profile
                    </button> */}
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
                                    className={`block w-full text-left px-3 py-2 font-medium ${activeTab === tab
                                        ? 'text-primary dark:text-secondary'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-secondary'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                            {/* <button
                                onClick={() => {
                                    setView('editProfile');
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-left px-6 py-2 text-lg text-indigo-600 dark:text-indigo-400"
                            >
                                Edit Profile
                            </button> */}
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
            </div>
        </motion.header>
    );
}
