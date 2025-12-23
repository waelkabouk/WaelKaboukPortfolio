import { motion } from 'framer-motion';
import { styles } from '../styles';
import { ComputersCanvas } from './canvas';

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto overflow-hidden`}>
      {/* Main Content Container */}
      <div
        className={`relative z-20 max-w-7xl mx-auto ${styles.paddingX} flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 h-full pt-[100px] md:pt-[120px] pb-20`}
      >
        {/* Text Content */}
        <div className="flex flex-row items-start gap-5 flex-1 w-full md:w-auto">
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

        {/* 3D Computer Model */}
        <div className="flex-1 w-full md:w-1/2 lg:w-2/5 min-h-[400px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] relative flex items-center justify-center">
          <ComputersCanvas />
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
