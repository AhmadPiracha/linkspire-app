import { motion } from 'framer-motion';
import JobCard from './JobCard';

export default function JobMatchAlgorithm({ profiles, jobs }) {
  const getMatchedJobs = (profile) => {
    if (!profile || !profile.skills || profile.skills.length === 0) {
      return [];
    }

    return jobs.filter(job => 
      job.requiredSkills && job.requiredSkills.some(skill => profile.skills.includes(skill))
    ).slice(0, 3);
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold mb-4">Recommended Jobs For You</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles[0] ? (
          getMatchedJobs(profiles[0]).map(job => (
            <JobCard key={job.id} job={job} onApply={() => {}} />
          ))
        ) : (
          <motion.div
            className="col-span-3 text-center text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>No profiles available to match jobs.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}