import React from 'react';
import { motion } from 'framer-motion';

import { SectionWrapper } from '../hoc';
import { fadeIn, staggerContainer } from '../utils/motion';
import { languagesData } from '../constants';
import SectionHeading from './SectionHeading';

const proficiencyLabel = {
  Native: 'native',
  C1: 'advanced (C1)',
  B2: 'upper intermediate (B2)',
};

const LanguageItem = ({ language, index }) => {
  const isArabic = /[؀-ۿ]/.test(language.nativeName || '');

  return (
    <motion.li variants={fadeIn('up', 'tween', index * 0.1, 0.6)}>
      <h3
        lang={isArabic ? 'ar' : undefined}
        dir={isArabic ? 'rtl' : undefined}
        className={`text-white leading-none text-[56px] md:text-[60px] lg:text-[72px] ${
          isArabic ? 'font-arabic font-medium text-left' : 'font-serif font-normal'
        }`}
      >
        {language.nativeName || language.name}
      </h3>
      <p className="mt-5 text-white-100 text-[17px]">
        {language.name}, {proficiencyLabel[language.proficiency] || language.proficiency}
      </p>
    </motion.li>
  );
};

const Languages = () => {
  return (
    <>
      <SectionHeading
        title="Languages"
      />

      <motion.ul
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="mt-14 grid md:grid-cols-3 gap-12"
      >
        {languagesData.map((language, index) => (
          <LanguageItem key={language.name} language={language} index={index} />
        ))}
      </motion.ul>
    </>
  );
};

export default SectionWrapper(Languages, 'languages');
