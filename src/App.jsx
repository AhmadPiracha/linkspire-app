import React, { Suspense, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Onboarding from './components/Onboarding';
import { profiles, jobs } from './data/data';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FeaturedProfiles from './components/FeaturedProfiles';

// Lazy imports
const LazyProfileCard = React.lazy(() => import('./components/ProfileCard'));
const LazyJobCard = React.lazy(() => import('./components/JobCard'));
const LazyModal = React.lazy(() => import('./components/Modal'));
const LazyNetworkGraph = React.lazy(() => import('./components/NetworkGraph'));

// Constants for localStorage keys
const STORAGE_KEYS = {
  APPLIED_JOBS: 'appliedJobs',
  THEME: 'theme',
  FILTERS: 'jobFilters',
  VISITED: 'hasVisited',
};

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // State for managing views
  const [selectedProfileId, setSelectedProfileId] = useState(null); // State for selected profile ID
  const [activeTab, setActiveTab] = useState('For You');
  const [theme, setTheme] = useState('dark');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({ location: '', type: '' });
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [profileStrength] = useState(75);
  const [showOnboarding, setShowOnboarding] = useState(false);
  // const peopleYouMayKnow = profiles.slice(0, 3);
  // INITIAL LOAD (only once)
  useEffect(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    const storedJobs = localStorage.getItem(STORAGE_KEYS.APPLIED_JOBS);
    const storedFilters = localStorage.getItem(STORAGE_KEYS.FILTERS);
    const hasVisited = localStorage.getItem(STORAGE_KEYS.VISITED);

    if (storedTheme) setTheme(storedTheme);
    if (storedJobs) setAppliedJobs(JSON.parse(storedJobs));
    if (storedFilters) setFilters(JSON.parse(storedFilters));
    setShowOnboarding(!hasVisited);

    if (!hasVisited) localStorage.setItem(STORAGE_KEYS.VISITED, 'true');
  }, []);

  // Save to localStorage when theme, filters, or appliedJobs change
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLIED_JOBS, JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  // Filter jobs
  useEffect(() => {
    const results = jobs.filter(job =>
      (!filters.location || job.location === filters.location) &&
      (!filters.type || job.type === filters.type)
    );
    setFilteredJobs(results);
  }, [filters]);

  const handleConnect = profile => setSelectedProfile(profile);

  const handleApply = job => setSelectedJob(job);

  const closeModal = () => {
    setSelectedProfile(null);
    setSelectedJob(null);
  };

  const handleSubmitApplication = () => {
    if (!appliedJobs.some(j => j.id === selectedJob.id)) {
      setAppliedJobs(prev => [...prev, selectedJob]);
      toast.success(`Applied to ${selectedJob.title} at ${selectedJob.company}`);
    } else {
      toast.info('You have already applied to this job.');
    }
    closeModal();
  };

  return (
    <div className={`min-h-screen transition-colors ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <ToastContainer />
      {showOnboarding && <Onboarding onClose={() => setShowOnboarding(false)} />}

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
      />

      <HeroSection />

      <main className="container mx-auto px-6 pt-24 pb-12">
        {activeTab === 'Profiles' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Profile Strength</h2>
              <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  className="bg-primary dark:bg-secondary h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${profileStrength}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles.map(p => (
                <Suspense fallback={<div>Loading...</div>} key={p.id}>
                  <LazyProfileCard
                    profile={p}
                    onConnect={handleConnect}
                    setView={setCurrentView}
                    setSelectedProfileId={setSelectedProfileId}
                  />
                </Suspense>
              ))}
            </div>

            <Suspense fallback={<div>Loading graph...</div>}>
              <LazyNetworkGraph profiles={profiles} />
            </Suspense>
          </motion.div>
        )}

        {activeTab === 'Jobs' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex flex-wrap gap-4 mb-6">
              <select
                className="p-2 border rounded-lg bg-white dark:bg-gray-800"
                value={filters.location}
                onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
              >
                <option value="">All Locations</option>
                {Array.from(new Set(jobs.map(job => job.location))).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              <select
                className="p-2 border rounded-lg bg-white dark:bg-gray-800"
                value={filters.type}
                onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
              >
                <option value="">All Types</option>
                {Array.from(new Set(jobs.map(job => job.type))).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map(job => (
                <Suspense fallback={<div>Loading...</div>} key={job.id}>
                  <LazyJobCard job={job} onApply={handleApply} />
                </Suspense>
              ))}
            </div>

            {appliedJobs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-2">My Applications</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {appliedJobs.map(job => (
                    <li key={job.id}>{job.title} – {job.company}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === 'For You' && (
          <motion.div>
            <FeaturedProfiles profiles={profiles} onConnect={handleConnect} />
          </motion.div>
        )}

      </main>

      <Suspense fallback={<div>Loading modal...</div>}>
        <LazyModal isOpen={!!selectedProfile || !!selectedJob} onClose={closeModal}>
          {selectedProfile && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Connect with {selectedProfile.name}</h2>
              <p className="mb-4">{selectedProfile.bio}</p>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition">
                Send Request
              </button>
            </div>
          )}
          {selectedJob && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Apply for {selectedJob.title}</h2>
              <p className="mb-4">{selectedJob.description}</p>
              <button
                onClick={handleSubmitApplication}
                disabled={appliedJobs.some(j => j.id === selectedJob.id)}
                className={`px-4 py-2 rounded-lg transition ${appliedJobs.some(j => j.id === selectedJob.id)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-secondary'
                  }`}
              >
                {appliedJobs.some(j => j.id === selectedJob.id)
                  ? 'Already Applied'
                  : 'Submit Application'}
              </button>
            </div>
          )}
        </LazyModal>
      </Suspense>

      <Footer />
    </div>
  );
}
