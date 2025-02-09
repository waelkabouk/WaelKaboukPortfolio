import React from 'react';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const Contact = () => {
  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <div className="mt-12 flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="text-white font-medium">LinkedIn:</span>
            <a
              href="https://www.linkedin.com/in/wael-kabouk-832768219/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              wael-kabouk-832768219
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white font-medium">GitHub:</span>
            <a
              href="https://github.com/wael-kabouk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              wael-kabouk
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white font-medium">Phone:</span>
            <a
              href="tel:+905525121411"
              className="text-secondary hover:underline"
            >
              +90 552 512 14 11
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white font-medium">Email:</span>
            <a
              href="mailto:waelkabouk.business@gmail.com"
              className="text-secondary hover:underline"
            >
              waelkabouk.business@gmail.com
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
