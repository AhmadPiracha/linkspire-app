import { motion } from 'framer-motion';

export default function ProfilePage({ profile, setView }) {
  if (!profile) return <div>Profile not found</div>;

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
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl">
            {profile.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{profile.role}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">{profile.location}</p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p>{profile.bio}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          {profile.skills.map((skill) => (
            <div key={skill} className="flex items-center mb-2">
              <span className="w-24 text-sm">{skill}</span>
              <div className="flex-1 bg-gray-300 dark:bg-gray-700 h-2 rounded-full">
                <motion.div
                  className="bg-indigo-600 dark:bg-indigo-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}