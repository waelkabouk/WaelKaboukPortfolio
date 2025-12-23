import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { textVariant, fadeIn, staggerContainer } from '../utils/motion';

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
    highlights: [
      'Thesis focused on eliminating re-identification layers in multi-camera tracking',
      'Achieved 81.3% cross-view identity consistency rate',
      'Sustained 30 FPS performance on standard hardware',
    ],
  },
  {
    degree: 'B.Sc.',
    field: 'Computer Engineering',
    university: 'Mugla Sitki Kocman University',
    location: 'Turkey',
    date: 'Oct 2019 - Jul 2023',
    gpa: '3.62/4.00',
    language: '100% English',
    capstone: {
      title: 'Microservices-based Multi-Vendor E-Commerce Platform',
      description: 'Developed a comprehensive e-commerce platform with collaborative recommendation engine',
    },
    highlights: [
      'High Honor Student (GPA > 3.50)',
      'Capstone project featured microservices architecture',
      'Full-stack development with modern technologies',
    ],
  },
];

const DegreeCard = ({ education, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.2, 0.75)}
      className="relative bg-tertiary p-6 sm:p-8 rounded-2xl border-2 border-transparent hover:border-[#915EFF]/50 transition-all duration-300 group"
    >
      {/* Academic Badge */}
      <div className="absolute -top-4 left-6 bg-gradient-to-r from-[#915EFF] to-[#6366F1] px-4 py-1.5 rounded-full shadow-lg">
        <span className="text-white text-sm font-bold">{education.degree}</span>
      </div>

      {/* Main Content */}
      <div className="mt-4">
        {/* Degree and Field */}
        <div className="mb-4">
          <h3 className="text-white text-2xl sm:text-3xl font-bold mb-1">
            {education.field}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-secondary">
            <span className="text-lg font-semibold">{education.university}</span>
            <span className="text-sm">•</span>
            <span className="text-sm">{education.location}</span>
          </div>
        </div>

        {/* Date and GPA */}
        <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-[#232631]">
          <div className="flex items-center gap-2">
            <span className="text-[#915EFF] text-lg">📅</span>
            <span className="text-white-100 text-sm sm:text-base">
              {education.date}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#915EFF] text-lg">⭐</span>
            <span className="text-white-100 text-sm sm:text-base">
              GPA: <span className="text-white font-semibold">{education.gpa}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#915EFF] text-lg">🌐</span>
            <span className="text-white-100 text-sm sm:text-base">
              {education.language}
            </span>
          </div>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              {/* Thesis or Capstone */}
              {(education.thesis || education.capstone) && (
                <div className="mb-4 pb-4 border-b border-[#232631]">
                  {education.thesis && (
                    <div>
                      <p className="text-secondary text-sm font-semibold mb-2">
                        Master's Thesis
                      </p>
                      <p className="text-white text-base sm:text-lg font-semibold mb-1">
                        {education.thesis.title}
                      </p>
                      <p className="text-white-100 text-sm">
                        Advisor: <span className="text-secondary">{education.thesis.advisor}</span>
                      </p>
                    </div>
                  )}
                  {education.capstone && (
                    <div>
                      <p className="text-secondary text-sm font-semibold mb-2">
                        Capstone Project
                      </p>
                      <p className="text-white text-base sm:text-lg font-semibold mb-1">
                        {education.capstone.title}
                      </p>
                      <p className="text-white-100 text-sm">{education.capstone.description}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Highlights */}
              <div>
                <p className="text-secondary text-sm font-semibold mb-2">Key Highlights</p>
                <ul className="space-y-2">
                  {education.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#915EFF] mt-1">▸</span>
                      <span className="text-white-100 text-sm sm:text-base">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Expand/Collapse Button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-[#915EFF] hover:text-[#6366F1] transition-colors duration-200 font-semibold text-sm sm:text-base"
        >
          <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg"
          >
            ▼
          </motion.span>
        </button>
      </div>

      {/* Decorative Academic Seal */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-[#915EFF] rounded-full flex items-center justify-center">
          <span className="text-2xl sm:text-3xl">🎓</span>
        </div>
      </div>
    </motion.div>
  );
};

const Education = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Academic Background</p>
        <h2 className={styles.sectionHeadText}>Education.</h2>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-12 flex flex-col gap-8"
      >
        {educationData.map((education, index) => (
          <DegreeCard key={index} education={education} index={index} />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Education, 'education');

