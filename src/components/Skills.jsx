import React from 'react';
import { motion } from 'framer-motion';

import { SectionWrapper } from '../hoc';
import { fadeIn, staggerContainer } from '../utils/motion';
import { skillsData } from '../constants';
import SectionHeading from './SectionHeading';

const SkillColumn = ({ category, skills, index }) => (
  <motion.div variants={fadeIn('up', 'tween', index * 0.08, 0.5)}>
    <h3 className="font-serif font-medium text-white text-[28px] sm:text-[32px] leading-tight">
      {category.name}
    </h3>
    <ul className={`mt-6 ${skills.length > 8 ? 'columns-2 gap-8' : ''}`}>
      {skills.map((skill) => (
        <li
          key={skill}
          className="py-1.5 break-inside-avoid text-white-100 text-[17px] transition-colors duration-200 hover:text-white"
        >
          {skill}
        </li>
      ))}
    </ul>
  </motion.div>
);

const Skills = () => {
  return (
    <div className="bg-black-100 -mx-6 sm:-mx-16 px-6 sm:px-16 py-16 sm:py-20">
      <SectionHeading
        title="Technical skills"
      />

      <motion.div
        variants={staggerContainer(0.05, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-14"
      >
        {skillsData.map((category, index) => (
          <SkillColumn
            key={category.name}
            category={category}
            skills={category.skills}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Skills, 'skills');
