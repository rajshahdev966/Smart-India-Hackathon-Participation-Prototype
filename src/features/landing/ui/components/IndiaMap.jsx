/**
 * @file IndiaMap.jsx
 * @layer features/landing/ui/components
 * @description Interactive SVG map of India showing state-level competency adoption tiers.
 */

import React, { useState } from 'react';

// Simplified geometric representation of major Indian states with adoption metrics
const STATES_PATH_DATA = [
  {
    id: 'JK',
    name: 'Jammu & Kashmir and Ladakh',
    score: 62,
    status: 'moderate',
    d: 'M140,25 L165,18 L195,30 L190,55 L160,65 L135,55 Z',
    cx: 160,
    cy: 40,
  },
  {
    id: 'HP',
    name: 'Himachal Pradesh',
    score: 74,
    status: 'moderate',
    d: 'M145,65 L170,62 L180,80 L155,85 Z',
    cx: 162,
    cy: 73,
  },
  {
    id: 'PB',
    name: 'Punjab',
    score: 79,
    status: 'moderate',
    d: 'M125,72 L145,68 L142,92 L120,90 Z',
    cx: 132,
    cy: 80,
  },
  {
    id: 'HR',
    name: 'Haryana & Delhi',
    score: 82,
    status: 'high',
    d: 'M138,92 L160,88 L158,112 L136,110 Z',
    cx: 148,
    cy: 100,
  },
  {
    id: 'UK',
    name: 'Uttarakhand',
    score: 75,
    status: 'moderate',
    d: 'M168,78 L192,82 L182,105 L160,95 Z',
    cx: 175,
    cy: 90,
  },
  {
    id: 'RJ',
    name: 'Rajasthan',
    score: 68,
    status: 'moderate',
    d: 'M85,100 L135,95 L145,145 L115,175 L80,150 Z',
    cx: 110,
    cy: 130,
  },
  {
    id: 'UP',
    name: 'Uttar Pradesh',
    score: 72,
    status: 'moderate',
    d: 'M158,95 L225,108 L220,150 L160,140 Z',
    cx: 190,
    cy: 122,
  },
  {
    id: 'BR',
    name: 'Bihar',
    score: 48,
    status: 'initial',
    d: 'M225,115 L268,118 L262,152 L222,148 Z',
    cx: 245,
    cy: 133,
  },
  {
    id: 'WB',
    name: 'West Bengal',
    score: 61,
    status: 'moderate',
    d: 'M260,135 L285,140 L275,190 L255,185 L258,155 Z',
    cx: 268,
    cy: 165,
  },
  {
    id: 'NE',
    name: 'North Eastern States',
    score: 58,
    status: 'moderate',
    d: 'M285,118 L340,110 L345,155 L310,165 L290,145 Z',
    cx: 315,
    cy: 135,
  },
  {
    id: 'GJ',
    name: 'Gujarat',
    score: 85,
    status: 'high',
    d: 'M55,150 L95,145 L110,185 L75,205 L50,180 Z',
    cx: 78,
    cy: 172,
  },
  {
    id: 'MP',
    name: 'Madhya Pradesh',
    score: 64,
    status: 'moderate',
    d: 'M115,155 L190,145 L200,195 L130,205 Z',
    cx: 155,
    cy: 175,
  },
  {
    id: 'JH',
    name: 'Jharkhand',
    score: 52,
    status: 'moderate',
    d: 'M220,148 L258,150 L252,185 L215,180 Z',
    cx: 236,
    cy: 166,
  },
  {
    id: 'OD',
    name: 'Odisha',
    score: 69,
    status: 'moderate',
    d: 'M205,185 L255,185 L245,235 L195,225 Z',
    cx: 225,
    cy: 205,
  },
  {
    id: 'MH',
    name: 'Maharashtra',
    score: 92,
    status: 'high',
    d: 'M85,195 L155,190 L165,248 L105,255 L80,225 Z',
    cx: 125,
    cy: 222,
  },
  {
    id: 'CG',
    name: 'Chhattisgarh',
    score: 59,
    status: 'moderate',
    d: 'M180,180 L208,182 L200,238 L170,230 Z',
    cx: 190,
    cy: 210,
  },
  {
    id: 'TG',
    name: 'Telangana',
    score: 81,
    status: 'high',
    d: 'M140,240 L180,235 L175,275 L135,270 Z',
    cx: 158,
    cy: 255,
  },
  {
    id: 'AP',
    name: 'Andhra Pradesh',
    score: 77,
    status: 'moderate',
    d: 'M165,248 L198,240 L180,310 L150,300 Z',
    cx: 174,
    cy: 280,
  },
  {
    id: 'KA',
    name: 'Karnataka',
    score: 88,
    status: 'high',
    d: 'M105,252 L145,250 L140,320 L100,315 Z',
    cx: 122,
    cy: 285,
  },
  {
    id: 'TN',
    name: 'Tamil Nadu',
    score: 78,
    status: 'moderate',
    d: 'M125,315 L165,308 L150,370 L120,365 Z',
    cx: 140,
    cy: 340,
  },
  {
    id: 'KL',
    name: 'Kerala',
    score: 84,
    status: 'high',
    d: 'M100,320 L122,318 L115,372 L95,360 Z',
    cx: 108,
    cy: 345,
  },
];

export const IndiaMap = ({ onSelectState, selectedStateId }) => {
  const [hoveredState, setHoveredState] = useState(null);

  const getColor = (status) => {
    switch (status) {
      case 'high':
        return '#10B981'; // emerald-500
      case 'moderate':
        return '#F59E0B'; // amber-500
      case 'initial':
      default:
        return '#F97316'; // orange-500
    }
  };

  const getHoverColor = (status) => {
    switch (status) {
      case 'high':
        return '#059669';
      case 'moderate':
        return '#D97706';
      case 'initial':
      default:
        return '#EA580C';
    }
  };

  return (
    <div className="relative bg-white rounded-xl border border-slate-200 p-4 shadow-sm overflow-hidden flex flex-col items-center">
      {/* State tooltip on hover */}
      {hoveredState && (
        <div className="absolute top-4 left-4 z-20 bg-slate-900/90 text-white backdrop-blur-sm text-xs rounded-lg px-3 py-2 shadow-lg pointer-events-none transition-all">
          <div className="font-bold text-sm">{hoveredState.name}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-slate-300">Competency Score:</span>
            <span className="font-semibold text-emerald-400">{hoveredState.score}%</span>
          </div>
          <div className="text-[10px] uppercase font-bold text-slate-400 mt-0.5 tracking-wider">
            {hoveredState.status === 'high'
              ? 'High Adoption (>80%)'
              : hoveredState.status === 'moderate'
              ? 'Moderate (50-80%)'
              : 'Initial Stage (<50%)'}
          </div>
        </div>
      )}

      {/* SVG Canvas Map */}
      <div className="w-full flex justify-center py-2">
        <svg
          viewBox="30 10 330 380"
          className="w-full max-w-[380px] h-auto filter drop-shadow-sm select-none"
        >
          <defs>
            <filter id="mapShadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Map Base Outline Background */}
          <g filter="url(#mapShadow)">
            {STATES_PATH_DATA.map((state) => {
              const isSelected = selectedStateId === state.id;
              const isHovered = hoveredState?.id === state.id;
              const fillColor = isHovered || isSelected ? getHoverColor(state.status) : getColor(state.status);

              return (
                <g key={state.id}>
                  <path
                    d={state.d}
                    fill={fillColor}
                    stroke="#FFFFFF"
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className="cursor-pointer transition-colors duration-150"
                    onMouseEnter={() => setHoveredState(state)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => onSelectState && onSelectState(state)}
                  />
                  {/* Subtle state code label */}
                  <text
                    x={state.cx}
                    y={state.cy}
                    fontSize="7"
                    fill="#FFFFFF"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="pointer-events-none opacity-90"
                  >
                    {state.id}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Legend Box */}
      <div className="w-full sm:w-auto self-end mt-2 bg-slate-50/95 border border-slate-200/80 rounded-lg p-3 text-[11px] shadow-sm">
        <div className="font-bold text-slate-700 tracking-wider uppercase text-[9px] mb-2">
          Performance Level
        </div>
        <div className="space-y-1.5 text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-sm"></span>
            <span>High Adoption (&gt;80%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-sm"></span>
            <span>Moderate (50–80%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500 inline-block shadow-sm"></span>
            <span>Initial Stage (&lt;50%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;
