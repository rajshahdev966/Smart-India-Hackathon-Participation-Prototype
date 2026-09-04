/**
 * @file HubsNetwork.jsx
 * @layer features/landing/ui/components
 * @description Interactive visual diagram of Karmayogi Hubs connecting institutional nodes.
 */

import React, { useState } from 'react';
import { Calendar, Users, ArrowRight, ShieldCheck, Cpu, Award } from 'lucide-react';
import { HUBS_DATA } from '../../data/landingData';

export const HubsNetwork = () => {
  const [activeHub, setActiveHub] = useState(HUBS_DATA[0]);

  // Orbiting nodes coordinates around center (cx: 175, cy: 130, radius: 85)
  const nodes = [
    { ...HUBS_DATA[0], x: 175, y: 35, icon: Award },
    { ...HUBS_DATA[1], x: 255, y: 75, icon: Cpu },
    { ...HUBS_DATA[2], x: 255, y: 185, icon: ShieldCheck },
    { ...HUBS_DATA[3], x: 175, y: 225, icon: Users },
    { ...HUBS_DATA[4], x: 95, y: 185, icon: Calendar },
    { ...HUBS_DATA[5], x: 95, y: 75, icon: Award },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl border border-slate-200/80 p-6 md:p-10 shadow-sm">
      {/* Network Node Diagram */}
      <div className="lg:col-span-7 flex justify-center items-center relative py-4">
        <svg viewBox="0 0 350 260" className="w-full max-w-[420px] h-auto select-none">
          {/* Circular Orbit Guide */}
          <circle
            cx="175"
            cy="130"
            r="85"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-spin-slow"
          />

          {/* Connection lines from center to nodes */}
          {nodes.map((node) => {
            const isSelected = activeHub.id === node.id;
            return (
              <line
                key={`line-${node.id}`}
                x1="175"
                y1="130"
                x2={node.x}
                y2={node.y}
                stroke={isSelected ? '#0284C7' : '#CBD5E1'}
                strokeWidth={isSelected ? '2.5' : '1.5'}
                strokeDasharray={isSelected ? 'none' : '2 2'}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Center Karmayogi Hub Node */}
          <circle cx="175" cy="130" r="38" fill="#F8FAFC" stroke="#0284C7" strokeWidth="2.5" />
          <text
            x="175"
            y="125"
            textAnchor="middle"
            fill="#0F172A"
            fontSize="10"
            fontWeight="bold"
          >
            Karmayogi
          </text>
          <text
            x="175"
            y="138"
            textAnchor="middle"
            fill="#0284C7"
            fontSize="9"
            fontWeight="600"
          >
            Hubs
          </text>

          {/* Orbiting Satellite Nodes */}
          {nodes.map((node) => {
            const isSelected = activeHub.id === node.id;
            return (
              <g
                key={`node-${node.id}`}
                className="cursor-pointer group"
                onClick={() => setActiveHub(node)}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill={isSelected ? '#0369A1' : '#0284C7'}
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  className="transition-transform transform group-hover:scale-110 shadow-sm"
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? '24' : '0'}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  opacity="0.6"
                />
                <text
                  x={node.x}
                  y={node.y + 3.5}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="8"
                  fontWeight="bold"
                >
                  {node.name.slice(0, 3).toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Event Hub Card / Interactive Detail Panel */}
      <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-6 sm:p-8 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4 shadow-sm">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Event Hub</h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Join specialized institutional hubs to collaborate with peers and experts in your field.
            Attend live interactive webinars, capacity workshops, and cross-departmental summits.
          </p>

          <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                Selected Focus
              </span>
              <div className="font-semibold text-slate-800 text-sm">{activeHub.name}</div>
              <div className="text-xs text-sky-600">{activeHub.role}</div>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition-colors">
              <span>Explore Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubsNetwork;
