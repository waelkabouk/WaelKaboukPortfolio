import React, { useState } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { motion, AnimatePresence } from 'framer-motion';

import 'react-vertical-timeline-component/style.min.css';

import { styles } from '../styles';
import {
  researchExperiences,
  industryExperiences,
  teachingExperiences,
} from '../constants';
import { SectionWrapper } from '../hoc';
import { textVariant, fadeIn } from '../utils/motion';

// Category-specific color schemes
const categoryStyles = {
  research: {
    accent: '#4ECDC4',
    accentLight: '#06B6D4',
    border: '#4ECDC4',
    bgGradient: 'from-cyan-900/20 to-teal-900/20',
  },
  industry: {
    accent: '#915EFF',
    accentLight: '#6366F1',
    border: '#915EFF',
    bgGradient: 'from-purple-900/20 to-indigo-900/20',
  },
  teaching: {
    accent: '#F59E0B',
    accentLight: '#FB923C',
    border: '#F59E0B',
    bgGradient: 'from-amber-900/20 to-orange-900/20',
  },
};

const ExperienceCard = ({ experience, category }) => {
  const style = categoryStyles[category] || categoryStyles.industry;

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: '#1d1836',
        color: '#fff',
        borderLeft: `4px solid ${style.accent}`,
      }}
      contentArrowStyle={{ borderRight: `7px solid ${style.accent}` }}
      date={experience.date}
      iconStyle={{
        background: experience.iconBg || style.accent,
        boxShadow: `0 0 0 4px ${style.accent}40`,
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
          <span
            className="text-xs px-2 py-1 rounded-full font-semibold"
            style={{
              background: `${style.accent}20`,
              color: style.accent,
              border: `1px solid ${style.accent}40`,
            }}
          >
            {category === 'research' && 'Research'}
            {category === 'industry' && 'Industry'}
            {category === 'teaching' && 'Leadership'}
          </span>
        </div>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};


const TabButton = ({ active, onClick, children, category }) => {
  const style = categoryStyles[category] || categoryStyles.industry;

  return (
    <button
      onClick={onClick}
      className={`
        relative px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold 
        transition-all duration-300 touch-manipulation
        ${active ? 'text-white' : 'text-secondary hover:text-white'}
        active:scale-95
      `}
      style={{
        color: active ? style.accent : undefined,
        WebkitTapHighlightColor: 'transparent',
      }}
      aria-pressed={active}
      aria-label={`${children} tab`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{
            background: `linear-gradient(90deg, ${style.accent}, ${style.accentLight})`,
          }}
          initial={false}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
};

const Experience = () => {
  const [activeTab, setActiveTab] = useState('research');

  const getActiveExperiences = () => {
    switch (activeTab) {
      case 'research':
        return researchExperiences;
      case 'industry':
        return industryExperiences;
      case 'teaching':
        return teachingExperiences;
      default:
        return researchExperiences;
    }
  };

  const tabs = [
    { id: 'research', label: 'Academic & Research', category: 'research' },
    { id: 'industry', label: 'Industry Experience', category: 'industry' },
    { id: 'teaching', label: 'Teaching & Leadership', category: 'teaching' },
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Experience.</h2>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-12 flex flex-wrap justify-center gap-1 sm:gap-4 border-b border-[#232631] overflow-x-auto scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            category={tab.category}
          >
            {tab.label}
          </TabButton>
        ))}
      </motion.div>

      {/* Experience Timeline */}
      <div className="mt-12 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <VerticalTimeline>
              {getActiveExperiences().map((experience, index) => (
                <ExperienceCard
                  key={`${activeTab}-experience-${index}`}
                  experience={experience}
                  category={activeTab}
                />
              ))}
            </VerticalTimeline>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'experience');
