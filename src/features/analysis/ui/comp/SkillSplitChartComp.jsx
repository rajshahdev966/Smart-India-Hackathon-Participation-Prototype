/**
 * @file SkillSplitChartComp.jsx
 * @layer features/analysis/ui/comp
 * @description Horizontal bar chart component visualizing Theoretical vs Application skill split.
 * Provides ample Y-axis width and margins to prevent any label truncation.
 */

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export const SkillSplitChartComp = ({ skillSplit = [] }) => {
  const defaultData = [
    { skill: 'Theoretical', score: 20, color: '#3b82f6' },
    { skill: 'Application', score: 20, color: '#10b981' },
  ];

  const chartData = skillSplit && skillSplit.length > 0
    ? skillSplit.map((item, index) => ({
        skill: item.skill,
        score: item.score ?? 0,
        color: index === 0 ? '#3b82f6' : '#10b981',
      }))
    : defaultData;

  return (
    <div className="w-full h-52">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 15, right: 25, left: 15, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
          <XAxis
            type="number"
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis
            type="category"
            dataKey="skill"
            width={95}
            tick={{ fontSize: 12, fill: '#334155', fontWeight: 500 }}
            axisLine={{ stroke: '#cbd5e1' }}
            tickLine={false}
          />
          <Tooltip
            formatter={(val) => [`${val}%`, 'Mastery Score']}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              fontSize: '12px',
            }}
          />
          <Bar dataKey="score" radius={[0, 5, 5, 0]} barSize={26}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillSplitChartComp;
