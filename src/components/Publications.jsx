import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { styles } from '../styles';
import { publications } from '../constants';
import { SectionWrapper } from '../hoc';
import { textVariant, fadeIn, staggerContainer } from '../utils/motion';

// Category-specific color scheme for publications
const publicationStyle = {
  accent: '#4ECDC4',
  accentLight: '#06B6D4',
  border: '#4ECDC4',
  bgGradient: 'from-cyan-900/20 to-teal-900/20',
};

const PublicationCard = ({ publication, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxTitleLength = 80; // Character limit for truncated title
  const isTitleLong = publication.title.length > maxTitleLength;
  const truncatedTitle = isTitleLong
    ? publication.title.substring(0, maxTitleLength) + '...'
    : publication.title;

  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
      className="relative bg-tertiary p-6 sm:p-8 rounded-2xl border-l-4 mb-6 hover:border-opacity-100 transition-all duration-300"
      style={{
        borderLeftColor: publicationStyle.accent,
        borderLeftWidth: '4px',
      }}
    >
      {/* Publication Number Badge */}
      <div
        className="absolute -top-3 left-6 bg-gradient-to-r from-[#4ECDC4] to-[#06B6D4] px-3 py-1 rounded-full shadow-lg text-white text-xs font-bold"
      >
        #{index + 1}
      </div>

      {/* Authors */}
      <div className="mt-4 mb-3">
        <p className="text-white text-base sm:text-lg font-semibold">
          {publication.authors.join(', ')}
        </p>
      </div>

      {/* Title */}
      <div className="mb-3">
        <p className="text-white text-lg sm:text-xl font-bold italic">
          "{isExpanded || !isTitleLong ? publication.title : truncatedTitle}"
        </p>
      </div>

      {/* Conference/Journal */}
      <div className="mb-2">
        <p className="text-secondary text-sm sm:text-base">
          <span className="font-semibold">In:</span> {publication.conference}
        </p>
      </div>

      {/* Date */}
      <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-[#232631]">
        <div className="flex items-center gap-2">
          <span className="text-[#4ECDC4] text-sm">📅</span>
          <span className="text-white-100 text-sm">{publication.date}</span>
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
            {/* Publisher and Location */}
            <div className="mb-2">
              <p className="text-white-100 text-sm">
                {publication.publisher}, {publication.location}
              </p>
            </div>

            {/* Pages */}
            <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-[#232631]">
              <div className="flex items-center gap-2">
                <span className="text-[#4ECDC4] text-sm">📄</span>
                <span className="text-white-100 text-sm">pp. {publication.pages}</span>
              </div>
            </div>

            {/* Key Achievement */}
            <div className="mt-4">
              <p className="text-secondary text-sm font-semibold mb-2">
                Key Achievement
              </p>
              <p className="text-white-100 text-sm sm:text-base leading-relaxed">
                {publication.keyAchievement}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand/Collapse Button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-[#4ECDC4] hover:text-[#06B6D4] transition-colors duration-200 font-semibold text-sm sm:text-base"
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
    </motion.div>
  );
};

const Publications = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Research Contributions
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Publications.</h2>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-12 flex flex-col gap-4"
      >
        {publications.map((publication, index) => (
          <PublicationCard
            key={`publication-${index}`}
            publication={publication}
            index={index}
          />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Publications, 'publications');

