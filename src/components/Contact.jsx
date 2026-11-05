import React from 'react';
import { motion } from 'framer-motion';

import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import { traceMark } from '../assets';

const channels = [
  {
    label: 'Email',
    value: 'waelkabouk.business@gmail.com',
    href: 'mailto:waelkabouk.business@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/waelkabouk',
    href: 'https://www.linkedin.com/in/waelkabouk/',
    external: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/waelkabouk',
    href: 'https://github.com/waelkabouk',
    external: true,
  },
  {
    label: 'Phone',
    value: '+966 571 872 756',
    href: 'tel:+966571872756',
  },
];

const Contact = () => {
  return (
    <>
      <div className="flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
        <motion.div
          variants={slideIn('left', 'tween', 0.2, 1)}
          className="flex-[0.9] bg-tertiary p-6 sm:p-10"
        >
          <h2 className="font-serif font-medium text-white md:text-[64px] sm:text-[52px] text-[40px] leading-[1.02] tracking-[-0.02em]">
            Contact
          </h2>
          <p className="mt-4 text-secondary text-[17px] max-w-[44ch]">
            Email is the fastest way to reach me.
          </p>

          <ul className="mt-10 flex flex-col gap-6">
            {channels.map((c) => (
              <li key={c.label}>
                <p className="text-secondary text-[16px]">{c.label}</p>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="mt-1 inline-block font-serif text-white text-[22px] sm:text-[26px] leading-snug break-all sm:break-normal underline decoration-transparent decoration-2 underline-offset-[6px] hover:decoration-gold transition-colors duration-200"
                >
                  {c.value}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={slideIn('right', 'tween', 0.2, 1)}
          className="xl:flex-1 w-full h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-auto"
        >
          <EarthCanvas />
        </motion.div>
      </div>

      {/* Footer: the trace ends in the gold point, then the name at full width */}
      <footer className="mt-24 sm:mt-32">
        <div className="flex items-center" aria-hidden="true">
          <div className="h-[3px] flex-1 bg-gold" />
          <div className="w-4 h-4 rounded-full bg-gold" />
        </div>
        <div className="mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={traceMark} alt="" className="w-14 h-14 sm:w-16 sm:h-16" />
            <div>
              <p className="font-serif font-medium text-white text-[40px] sm:text-[56px] leading-none">
                Wael Kabouk
              </p>
              <p className="mt-2 text-secondary text-[16px]">AI Systems Architect</p>
            </div>
          </div>
          <p className="text-secondary text-[16px]">
            © {new Date().getFullYear()} Wael Kabouk
          </p>
        </div>
      </footer>
    </>
  );
};

export default SectionWrapper(Contact, 'contact');
