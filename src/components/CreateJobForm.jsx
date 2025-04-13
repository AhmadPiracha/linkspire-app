import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CreateJobForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company || !formData.description) {
      alert('Please fill in all required fields (Title, Company, Description).');
      return;
    }
    onSubmit(formData);
    setFormData({
      title: '',
      company: '',
      location: '',
      type: '',
      description: '',
    });
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-lg mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Create a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Job Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Company *</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Select Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-32"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
        >
          Create Job
        </button>
      </form>
    </motion.div>
  );
}