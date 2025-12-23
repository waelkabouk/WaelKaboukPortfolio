import { motion } from 'framer-motion';
import { styles } from '../styles';

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      {/* Text Content */}
      <div
        className={`relative max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 pt-[120px] pb-4 sm:pb-6`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="relative flex-1">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">Wael</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            MSc Software Engineer | Computer Vision Specialist
          </p>
          <p className={`${styles.heroSubText} mt-4 text-white-100 text-[18px] sm:text-[20px]`}>
            I develop high quality web, mobile and AI applications,
            <br />
            bridging cutting-edge research with production-ready solutions
          </p>
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-20">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
