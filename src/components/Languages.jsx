import React from 'react';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { textVariant, fadeIn, staggerContainer } from '../utils/motion';
import { languagesData } from '../constants';

const LanguageCard = ({ language, index }) => {
  const getProficiencyColor = (proficiency) => {
    if (proficiency === 'Native') return 'from-green-500 to-emerald-500';
    if (proficiency === 'C1') return 'from-blue-500 to-cyan-500';
    if (proficiency === 'B2') return 'from-purple-500 to-pink-500';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.2, 0.75)}
      className="relative bg-tertiary p-6 sm:p-8 rounded-2xl border-2 border-transparent hover:border-[#915EFF]/50 transition-all duration-300 group"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pr-20 sm:pr-24">
        {/* Language Name */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#915EFF] to-[#6366F1] flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
            {language.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-white text-xl sm:text-2xl font-bold">
              {language.name}
            </h3>
            <p className="text-secondary text-sm sm:text-base">
              {language.nativeName || language.name}
            </p>
          </div>
        </div>

        {/* Proficiency Badge */}
        <div
          className={`bg-gradient-to-r ${getProficiencyColor(
            language.proficiency
          )} px-4 py-2 rounded-full shadow-lg flex-shrink-0`}
        >
          <span className="text-white text-sm sm:text-base font-bold">
            {language.proficiency}
          </span>
        </div>
      </div>

      {/* Decorative Globe Icon */}
      <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-[#915EFF] rounded-full flex items-center justify-center">
          <span className="text-xl sm:text-2xl">🌐</span>
        </div>
      </div>
    </motion.div>
  );
};

const Languages = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Communication</p>
        <h2 className={styles.sectionHeadText}>Languages.</h2>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-12 flex flex-col gap-6 sm:gap-8"
      >
        {languagesData.map((language, index) => (
          <LanguageCard key={language.name} language={language} index={index} />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Languages, 'languages');

