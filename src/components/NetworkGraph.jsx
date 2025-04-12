import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { profiles } from '../data/data';

export default function NetworkGraph() {
  // Count how many profiles per skill
  const skillCounts = {};

  profiles.forEach(profile => {
    profile.skills.forEach(skill => {
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });
  });

  const data = Object.entries(skillCounts).map(([skill, count]) => ({
    skill,
    count,
  }));

  return (
    <div className="w-full h-[300px] bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Profiles per Skill
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="skill" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
