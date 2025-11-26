import React from 'react';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const Contact = () => {
  return (
    <div
      className={`flex xl:flex-row flex-col-reverse gap-6 sm:gap-8 lg:gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col gap-4 sm:gap-6 md:gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-white font-medium text-sm sm:text-base min-w-[80px] sm:min-w-[100px]">
              LinkedIn:
            </span>
            <a
              href="https://www.linkedin.com/in/waelkabouk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline text-sm sm:text-base break-all sm:break-normal transition-colors duration-300"
            >
              waelkabouk
            </a>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-white font-medium text-sm sm:text-base min-w-[80px] sm:min-w-[100px]">
              GitHub:
            </span>
            <a
              href="https://github.com/waelkabouk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline text-sm sm:text-base break-all sm:break-normal transition-colors duration-300"
            >
              waelkabouk
            </a>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-white font-medium text-sm sm:text-base min-w-[80px] sm:min-w-[100px]">
              Phone:
            </span>
            <a
              href="tel:+966571872756"
              className="text-secondary hover:underline text-sm sm:text-base transition-colors duration-300"
            >
              +966 571 872 756
            </a>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-white font-medium text-sm sm:text-base min-w-[80px] sm:min-w-[100px]">
              Email:
            </span>
            <a
              href="mailto:waelkabouk.business@gmail.com"
              className="text-secondary hover:underline text-sm sm:text-base break-all sm:break-normal transition-colors duration-300"
            >
              waelkabouk.business@gmail.com
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-1 w-full h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-auto"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
