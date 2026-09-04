/**
 * @file TotalSummaryCard.jsx
 * @layer features/userTotalAnalysis/ui/comp
 * @description Presentational component rendering score progression timeline chart using Recharts.
 */

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const TotalSummaryCard = ({ timelineData = [] }) => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={timelineData}
          margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Area
            type="monotone"
            dataKey="score"
            name="Your Score"
            stroke="#6366f1"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#scoreGradient)"
          />
          <Area
            type="monotone"
            dataKey="average"
            name="Peer Average"
            stroke="#94a3b8"
            strokeDasharray="4 4"
            strokeWidth={2}
            fillOpacity={0}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalSummaryCard;
