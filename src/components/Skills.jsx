import React from 'react';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { textVariant, fadeIn, staggerContainer } from '../utils/motion';
import { skillsData } from '../constants';

const SkillCategoryCard = ({ category, skills, index }) => {
  return (
    <motion.div
      variants={fadeIn('up', 'tween', index * 0.1, 0.3)}
      className="relative bg-tertiary p-6 sm:p-8 rounded-2xl border-2 border-transparent hover:border-[#915EFF]/50 transition-all duration-300 group"
    >
      {/* Category Badge */}
      <div className="absolute -top-4 left-6 bg-gradient-to-r from-[#915EFF] to-[#6366F1] px-4 py-1.5 rounded-full shadow-lg">
        <span className="text-white text-sm font-bold">{category.name}</span>
      </div>

      {/* Main Content */}
      <div className="mt-4 pr-20 sm:pr-24">
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-block bg-black-200 px-4 py-2 rounded-lg text-white-100 text-sm sm:text-base font-medium hover:bg-black-300 hover:text-white transition-all duration-300 border border-transparent hover:border-[#915EFF]/30"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative Icon */}
      <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-[#915EFF] rounded-full flex items-center justify-center">
          <span className="text-xl sm:text-2xl">{category.icon}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I know</p>
        <h2 className={styles.sectionHeadText}>Technical Skills.</h2>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.05, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-12 flex flex-col gap-8"
      >
        {skillsData.map((category, index) => (
          <SkillCategoryCard
            key={category.name}
            category={category}
            skills={category.skills}
            index={index}
          />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Skills, 'skills');

