/**
 * @file landingData.js
 * @layer features/landing/data
 * @description Static data and metadata for KarmaLearn & Mission Karmayogi landing page.
 */

export const STATS_DATA = [
  { label: 'Courses', value: '500+', desc: 'Across diverse disciplines' },
  { label: 'Active Users', value: '50K+', desc: 'Civil servants & officials' },
  { label: 'Learning Hours', value: '1M+', desc: 'Dedicated capacity building' },
  { label: 'Competencies', value: '100+', desc: 'Role-based frameworks' },
  { label: 'Certificates Earned', value: '25K+', desc: 'Verified milestone credentials' },
];

export const GOVERNANCE_CARDS = {
  ruleToRole: {
    title: 'Rule to Role-Based Learning',
    description: 'Transitioning civil services towards functional competencies and performance-based responsibilities.',
    metrics: [
      { label: 'Union CBPs', value: '55.8K', icon: 'UserCheck' },
      { label: 'State-based CBPs', value: '31.7K', icon: 'Zap' },
      { label: 'Employ with CBPs', value: '61.2K', icon: 'Users' },
      { label: 'Role relevant completion', value: '94.2%', icon: 'BarChart' },
    ],
  },
  democratized: {
    title: 'Democratized Learning',
    description: 'Making high-quality training resources accessible to all government officials, anytime, anywhere.',
    metrics: [
      { label: 'Registered Learners', value: '3.18M+', icon: 'UserCheck' },
      { label: 'Ministries & Depts', value: '120+', icon: 'Building2' },
      { label: 'Learning Resources', value: '10K+', icon: 'BookOpen' },
    ],
  },
};

export const REGIONS_RANKING = [
  { id: 'MH', name: 'Maharashtra', rate: 92, status: 'high' },
  { id: 'KA', name: 'Karnataka', rate: 88, status: 'high' },
  { id: 'GJ', name: 'Gujarat', rate: 85, status: 'high' },
  { id: 'TN', name: 'Tamil Nadu', rate: 78, status: 'moderate' },
  { id: 'UP', name: 'Uttar Pradesh', rate: 72, status: 'moderate' },
  { id: 'RJ', name: 'Rajasthan', rate: 68, status: 'moderate' },
  { id: 'KL', name: 'Kerala', rate: 84, status: 'high' },
  { id: 'MP', name: 'Madhya Pradesh', rate: 64, status: 'moderate' },
  { id: 'WB', name: 'West Bengal', rate: 61, status: 'moderate' },
  { id: 'BR', name: 'Bihar', rate: 48, status: 'initial' },
];

export const NATIONAL_ASPIRATIONS = [
  {
    id: 'future-ready',
    title: 'Future-Ready Workforce',
    description: 'Developing strategic competencies to address emerging challenges and technological advancements.',
    icon: 'BrainCircuit',
  },
  {
    id: 'citizen-centric',
    title: 'Citizen-Centric Governance',
    description: 'Fostering a culture of responsive, transparent, and effective public service delivery.',
    icon: 'Landmark',
  },
  {
    id: 'continuous-learning',
    title: 'Continuous Learning',
    description: 'Promoting lifelong learning through accessible, high-quality digital resources.',
    icon: 'Laptop',
  },
  {
    id: 'competency-dev',
    title: 'Competency Development',
    description: 'Aligning individual skills with institutional roles for optimal performance and growth.',
    icon: 'TrendingUp',
  },
];

export const SHOWCASED_COURSES = [
  {
    id: 'course-1',
    title: 'Advanced Public Policy Formulation',
    description: 'Strategic approaches to designing, implementing, and evaluating effective public policies.',
    duration: '4 Weeks',
    level: 'Advanced',
    tag: 'Policy',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'course-2',
    title: 'Data-Driven Decision Making',
    description: 'Utilizing data analytics to inform governance, improve service delivery, and enhance transparency.',
    duration: '3 Weeks',
    level: 'Intermediate',
    tag: 'Data',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'course-3',
    title: 'E-Governance Integration',
    description: 'Practical frameworks for digitizing public services, ensuring cybersecurity, and citizen access.',
    duration: '2 Weeks',
    level: 'Beginner',
    tag: 'IT & Digital',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'course-4',
    title: 'Ethics and Public Administration',
    description: 'Core principles of ethical leadership, institutional accountability, and transparent civic governance.',
    duration: '2 Weeks',
    level: 'All Levels',
    tag: 'Ethics',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  },
];

export const HUBS_DATA = [
  { id: 'policy', name: 'Policy Hub', role: 'Strategic Frameworks' },
  { id: 'data', name: 'Data Hub', role: 'Official Statistics' },
  { id: 'digital', name: 'Digital Hub', role: 'E-Gov Systems' },
  { id: 'leadership', name: 'Leadership Hub', role: 'Executive Competency' },
  { id: 'ethics', name: 'Ethics Hub', role: 'Integrity & Ethos' },
  { id: 'innovation', name: 'Innovation Hub', role: 'Public Sector R&D' },
];
