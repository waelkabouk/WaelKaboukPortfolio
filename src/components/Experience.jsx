import React, { useState } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { motion, AnimatePresence } from 'framer-motion';

import 'react-vertical-timeline-component/style.min.css';

import {
  researchExperiences,
  industryExperiences,
  teachingExperiences,
} from '../constants';
import { SectionWrapper } from '../hoc';
import { fadeIn } from '../utils/motion';
import SectionHeading from './SectionHeading';

// Brand surfaces: one navy surface for every card; gold marks only the active tab.
const SURFACE = '#122041';
const ICON_BG = '#1B2C52';

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: SURFACE,
      color: '#F4F1EA',
      boxShadow: 'none',
      borderRadius: 2,
      padding: '28px 32px',
    }}
    contentArrowStyle={{ borderRight: `7px solid ${SURFACE}` }}
    date={experience.date}
    iconStyle={{ background: ICON_BG }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img
          src={experience.icon}
          alt={experience.company_name}
          className="w-[56%] h-[56%] object-contain"
        />
      </div>
    }
  >
    <h3 className="font-serif font-medium text-white text-[22px] sm:text-[26px] leading-tight">
      {experience.title}
    </h3>
    <p className="text-secondary text-[16px]" style={{ margin: '6px 0 0' }}>
      {experience.company_name}
    </p>

    <ul className="mt-5 space-y-3">
      {experience.points.map((point, index) => (
        <li
          key={`experience-point-${index}`}
          className="flex items-start gap-3 text-white-100 text-[16px] leading-relaxed"
        >
          <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-secondary shrink-0" aria-hidden="true" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

const TabButton = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`relative shrink-0 min-h-[48px] px-1 text-[16px] sm:text-[17px] font-medium transition-colors duration-200 ${
      active ? 'text-white' : 'text-secondary hover:text-white'
    }`}
    style={{ WebkitTapHighlightColor: 'transparent' }}
  >
    {children}
    {active && (
      <motion.span
        layoutId="activeTab"
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold"
        initial={false}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    )}
  </button>
);

const Experience = () => {
  const [activeTab, setActiveTab] = useState('research');

  const byTab = {
    research: researchExperiences,
    industry: industryExperiences,
    teaching: teachingExperiences,
  };

  const tabs = [
    { id: 'research', label: 'Research' },
    { id: 'industry', label: 'Industry' },
    { id: 'teaching', label: 'Teaching and leadership' },
  ];

  return (
    <>
      <SectionHeading
        title="Experience"
        line="Research, industry and teaching, 2022 to today."
      />

      <motion.div
        variants={fadeIn('', '', 0.1, 1)}
        role="group"
        aria-label="Experience category"
        className="mt-10 flex flex-wrap gap-x-8 gap-y-2"
      >
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </motion.div>

      <div className="mt-12 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <VerticalTimeline lineColor="#1B2C52">
              {(byTab[activeTab] || researchExperiences).map((experience, index) => (
                <ExperienceCard
                  key={`${activeTab}-experience-${index}`}
                  experience={experience}
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
