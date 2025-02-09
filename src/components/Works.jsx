Below is one revised version of your code with adjustments to help improve responsiveness. In this revision:

1. Image Container:
Instead of a fixed height (e.g. h-[230px]), we use Tailwind’s aspect-video class so the image maintains a 16:9 ratio and scales with its container.


2. Text Sizing:
Responsive text classes (using Tailwind’s responsive prefixes) are added so headings, paragraphs, and tags adjust their sizes between mobile and larger screens.


3. Layout Adjustments:
The project cards container now includes a centering class (justify-center) so that on smaller screens the cards are centered, and the card itself uses a responsive width (sm:w-[360px] w-full).



Below is the complete revised code:

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
    <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        {/* Use an aspect ratio container for a responsive image */}
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

        {/* Responsive text sizes */}
        <div className="mt-5">
          <h3 className="text-white font-bold text-lg sm:text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-sm sm:text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-xs sm:text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
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
          Following projects showcase my skills and experience through real-world examples of my work. They reflect my ability to solve complex problems, work with different technologies, and manage projects effectively.
        </motion.p>
      </div>

      {/* Center the cards and allow them to wrap responsively */}
      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, '');

Final Notes

Tailwind CSS:
This solution assumes you’re using Tailwind CSS. Adjust or replace the class names if you’re using a different styling approach.

Image Aspect Ratio:
If you prefer a fixed height over a responsive aspect ratio, you can revert the image container’s class to your original setting (or mix both approaches with responsive utilities).

Further Testing:
Always test on multiple devices and viewport sizes to ensure the layout meets your responsiveness requirements.


This revised code should now be more adaptable across various screen sizes.

