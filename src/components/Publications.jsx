import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { publications } from '../constants';
import { SectionWrapper } from '../hoc';
import { fadeIn, staggerContainer } from '../utils/motion';
import SectionHeading from './SectionHeading';

const yearOf = (date) => (date.match(/\d{4}/) || [''])[0];

const PublicationItem = ({ publication, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelId = `publication-details-${index}`;

  return (
    <motion.li
      variants={fadeIn('up', 'tween', index * 0.1, 0.6)}
      className="grid md:grid-cols-[160px_1fr] gap-4 md:gap-12 py-10 first:pt-0"
    >
      <p className="font-serif text-gold text-[40px] sm:text-[48px] leading-none">
        {yearOf(publication.date)}
      </p>

      <div>
        <h3 className="font-serif font-medium text-white text-[22px] sm:text-[26px] leading-[1.2] max-w-[52ch]">
          {publication.title}
        </h3>
        <p className="mt-4 text-white-100 text-[17px]">
          {publication.authors.join(', ')}
        </p>
        <p className="mt-1 text-secondary text-[16px]">
          {publication.conference}, {publication.date}
        </p>

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
              <div className="mt-6 bg-tertiary p-6 max-w-[70ch]">
                <p className="text-white-100 text-[17px] leading-relaxed">
                  {publication.keyAchievement}
                </p>
                <p className="mt-4 text-secondary text-[16px]">
                  {publication.publisher}, {publication.location}. pp. {publication.pages}.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls={panelId}
            className="min-h-[44px] text-white underline decoration-gold decoration-2 underline-offset-[6px] hover:text-gold transition-colors duration-200 text-[16px] font-medium"
          >
            {isExpanded ? 'Show less' : 'What it found'}
          </button>
          {publication.link && (
            <a
              href={publication.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-[44px] text-secondary hover:text-white underline decoration-transparent hover:decoration-gold decoration-2 underline-offset-[6px] transition-colors duration-200 text-[16px]"
            >
              Read the paper (PDF)
            </a>
          )}
        </div>
      </div>
    </motion.li>
  );
};

const Publications = () => {
  return (
    <>
      <SectionHeading
        title="Publications"
        line="Conference papers on multi-camera tracking and clinical machine learning."
      />

      <motion.ol
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="mt-14 flex flex-col"
      >
        {publications.map((publication, index) => (
          <PublicationItem
            key={`publication-${index}`}
            publication={publication}
            index={index}
          />
        ))}
      </motion.ol>
    </>
  );
};

export default SectionWrapper(Publications, 'publications');
