import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { SectionWrapper } from '../hoc';
import { fadeIn, staggerContainer } from '../utils/motion';
import SectionHeading from './SectionHeading';

const educationData = [
  {
    degree: 'M.Sc.',
    field: 'Software Engineering',
    university: 'Sakarya University',
    location: 'Turkey',
    date: 'Oct 2023 - Sep 2025',
    gpa: '3.44/4.00',
    language: '100% English',
    thesis: {
      title: 'Virtual Context-Based Multi-Camera Vehicle Tracking',
      advisor: 'Prof. Dr. Ahmet Özmen',
    },
    honor: 'Honor graduate',
    highlights: [
      'Single-pass multi-camera tracking with YOLO11 and ByteTrack, with no re-identification network',
      '81.3% cross-view identity consistency at 30 FPS on standard hardware',
      'Published at the 3rd International Ankara Scientific Research and Innovation Congress, July 2025',
    ],
  },
  {
    degree: 'B.Sc.',
    field: 'Computer Engineering',
    university: 'Muğla Sıtkı Koçman University',
    location: 'Turkey',
    date: 'Oct 2019 - Jul 2023',
    gpa: '3.62/4.00',
    language: '100% English',
    capstone: {
      title: 'Microservices-based Multi-Vendor E-Commerce Platform',
      description: 'Developed a comprehensive e-commerce platform with collaborative recommendation engine',
    },
    honor: 'High Honor graduate, ranked 1st in the 2019 cohort',
    highlights: [
      'Capstone built on a microservices architecture with a collaborative recommendation engine',
    ],
  },
];

const DegreeCard = ({ education, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelId = `degree-details-${index}`;
  const project = education.thesis || education.capstone;

  return (
    <motion.article
      variants={fadeIn('up', 'tween', index * 0.1, 0.6)}
      className="bg-tertiary p-6 sm:p-10 grid md:grid-cols-[220px_1fr] gap-6 md:gap-12"
    >
      {/* Degree and dates */}
      <div>
        <p className="font-serif text-white text-[40px] sm:text-[48px] leading-none">
          {education.degree}
        </p>
        <p className="mt-3 text-secondary text-[16px]">{education.date}</p>
      </div>

      <div>
        <h3 className="font-serif font-medium text-white text-[28px] sm:text-[34px] leading-tight">
          {education.field}
        </h3>
        <p className="mt-2 text-white-100 text-[17px]">
          {education.university}, {education.location}
        </p>
        {education.honor && (
          <p className="mt-1 text-white text-[17px]">{education.honor}</p>
        )}

        <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-[16px]">
          <div className="flex gap-2">
            <dt className="text-secondary">GPA</dt>
            <dd className="text-white font-medium">{education.gpa}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-secondary">Language</dt>
            <dd className="text-white">{education.language}</dd>
          </div>
        </dl>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-8 bg-black-100 p-6">
                {project && (
                  <>
                    <p className="text-secondary text-[16px]">
                      {education.thesis ? "Master's thesis" : 'Capstone project'}
                    </p>
                    <p className="mt-2 font-serif text-white text-[22px] leading-snug">
                      {project.title}
                    </p>
                    <p className="mt-2 text-white-100 text-[16px]">
                      {education.thesis
                        ? `Advisor: ${education.thesis.advisor}`
                        : education.capstone.description}
                    </p>
                  </>
                )}

                <ul className="mt-6 space-y-3">
                  {education.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white-100 text-[16px]">
                      <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={panelId}
          className="mt-6 min-h-[44px] text-white underline decoration-gold decoration-2 underline-offset-[6px] hover:text-gold transition-colors duration-200 text-[16px] font-medium"
        >
          {isExpanded ? 'Show less' : project ? `Read about the ${education.thesis ? 'thesis' : 'capstone'}` : 'Read more'}
        </button>
      </div>
    </motion.article>
  );
};

const Education = () => {
  return (
    <>
      <SectionHeading
        title="Education"
        line="Two engineering degrees in Turkey, both taught fully in English."
      />

      <motion.div
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="mt-12 flex flex-col gap-4"
      >
        {educationData.map((education, index) => (
          <DegreeCard key={index} education={education} index={index} />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Education, 'education');
