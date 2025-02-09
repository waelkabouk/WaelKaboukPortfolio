import React, { useState, useEffect } from 'react';
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
  // Determine if the device should disable tilt (mobile/touch devices)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Consider a device mobile if:
      // 1. The width is less than 640px OR
      // 2. The device has no hover capability and a coarse pointer (common for touch devices)
      const isSmall = window.innerWidth < 640;
      const isTouch =
        window.matchMedia &&
        window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      setIsMobile(isSmall || isTouch);
    };

    // Set initial state and add resize listener
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardContent = (
    <>
      {/* Responsive image container using an aspect ratio */}
      <div className="relative w-full aspect-video">
        <img
          src={image}
          alt="project_image"
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
          <div
            onClick={() => window.open(source_code_link, '_blank')}
            className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
          >
            <img
              src={github}
              alt="source code"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Project title and description */}
      <div className="mt-5">
        <h3 className="text-white font-bold text-lg sm:text-[24px]">{name}</h3>
        <p className="mt-2 text-secondary text-sm sm:text-[14px]">{description}</p>
      </div>

      {/* Project tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <p key={`${name}-${tag.name}`} className={`text-xs sm:text-[14px] ${tag.color}`}>
            #{tag.name}
          </p>
        ))}
      </div>
    </>
  );

  return (
    <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
      {isMobile ? (
        // Render without Tilt on mobile/touch devices
        <div className="bg-tertiary p-5 rounded-2xl w-full">
          {cardContent}
        </div>
      ) : (
        // Use Tilt on non-mobile devices
        <Tilt
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
        >
          {cardContent}
        </Tilt>
      )}
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-3 text-secondary text-base sm:text-[17px] max-w-3xl leading-relaxed"
        >
          The following projects showcase my skills and experience through real-world examples of my work. They reflect my ability to solve complex problems, work with different technologies, and manage projects effectively.
        </motion.p>
      </div>

      {/* Projects grid */}
      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, '');
