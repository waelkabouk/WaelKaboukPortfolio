import { motion } from 'framer-motion';
import { styles } from '../styles';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[100svh] mx-auto flex flex-col justify-center">
      <div
        className={`relative w-full max-w-7xl mx-auto ${styles.paddingX} flex flex-col-reverse lg:flex-row items-center justify-between gap-12 pt-[120px] pb-24 lg:pb-10`}
      >
        {/* Text and the trace */}
        <div className="flex flex-row items-stretch gap-6 sm:gap-8 flex-[1.2] w-full">
          {/* The trace: one gold line, the gold point where the pen lifts */}
          <div className="flex flex-col items-center pt-4" aria-hidden="true">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="w-4 h-4 rounded-full bg-gold"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ originY: 0 }}
              className="w-[3px] flex-1 trace-line"
            />
          </div>

          <div className="relative pb-2">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={styles.heroHeadText}
            >
              Wael Kabouk
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.6, ease: 'easeOut' }}
              className={`${styles.heroSubText} mt-6 max-w-[34ch]`}
            >
              AI Systems Architect in Riyadh. MSc in Software Engineering,
              working on computer vision and LLM systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.6, ease: 'easeOut' }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="inline-flex items-center min-h-[48px] px-7 bg-white text-primary font-medium text-[16px] transition-colors duration-200 hover:bg-gold active:scale-[0.98]"
              >
                Get in touch
              </a>
              <a
                href="#works"
                className="inline-flex items-center min-h-[48px] px-7 bg-black-200 text-white font-medium text-[16px] transition-colors duration-200 hover:bg-black-300 active:scale-[0.98]"
              >
                See the work
              </a>
            </motion.div>
          </div>
        </div>

        {/* Portrait in the gold ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
          className="flex-1 flex justify-center items-center relative z-10"
        >
          <div className="w-60 h-60 sm:w-80 sm:h-80 lg:w-[440px] lg:h-[440px] rounded-full p-[6px] bg-gold">
            <img
              src="/wael.png"
              alt="Portrait of Wael Kabouk"
              className="w-full h-full object-cover rounded-full bg-tertiary"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
