/**
 * @file PerformanceChartComp.jsx
 * @layer features/analysis/ui/comp
 * @description Visual performance chart displaying topic mastery and score distribution using Recharts.
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

export const PerformanceChartComp = ({ categoryBreakdown = [] }) => {
  const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={categoryBreakdown}
          margin={{ top: 20, right: 20, left: -20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 11, fill: '#64748b' }}
            interval={0}
            angle={-15}
            textAnchor="end"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: '#64748b' }}
            unit="%"
          />
          <Tooltip
            formatter={(val) => [`${val}%`, 'Score']}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Bar dataKey="score" radius={[6, 6, 0, 0]}>
            {categoryBreakdown.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChartComp;
