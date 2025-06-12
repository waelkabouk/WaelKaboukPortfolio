import React from 'react';
import Tilt from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
      className="w-full"
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl w-full h-full flex flex-col"
      >
        <div className="relative w-full h-[230px] group">
          <img
            src={image}
            alt={`${name} project screenshot`}
            className="w-full h-full object-cover rounded-2xl transition-all duration-300 group-hover:brightness-75"
          />

          <div className="absolute inset-0 flex justify-end m-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => window.open(source_code_link, '_blank')}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label={`View source code for ${name} project`}
            >
              <img
                src={github}
                alt="GitHub"
                className="w-1/2 h-1/2 object-contain"
              />
            </button>
          </div>
        </div>

        <div className="mt-5 flex-1 flex flex-col">
          <h3 className="text-white font-bold text-[24px] leading-tight mb-3">
            {name}
          </h3>
          <p className="text-secondary text-[14px] leading-relaxed flex-1 mb-4">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag) => (
              <span
                key={`${name}-${tag.name}`}
                className={`text-[12px] px-3 py-1 rounded-full border border-opacity-50 ${tag.color} border-current bg-current bg-opacity-10 hover:bg-opacity-20 transition-all duration-200`}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <div className="w-full">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Following projects showcase my skills and experience through real-world
        examples of my work. Each project reflects my ability to solve complex
        problems, work with different technologies, and manage projects
        effectively.
      </motion.p>

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 auto-rows-fr">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Works, '');
