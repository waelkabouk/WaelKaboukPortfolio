import { motion } from 'framer-motion';
import { styles } from '../styles';

const Hero = () => {
  return (
    <section className={`relative w-full min-h-screen mx-auto flex flex-col justify-center`}>
      <div
        className={`relative max-w-7xl mx-auto ${styles.paddingX} flex flex-col-reverse lg:flex-row items-center justify-center gap-10 pt-[120px] pb-32 sm:pb-40 lg:pb-10`}
      >
        {/* Text Content + Line Wrapper */}
        <div className="w-full lg:w-auto flex flex-row items-start gap-5">
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
            <div className="w-1 sm:h-80 h-40 violet-gradient" />
          </div>

          <div className="relative">
            <h1 className={`${styles.heroHeadText} text-white lg:whitespace-nowrap`}>
              Hi, I'm <span className="text-[#915EFF]">Wael</span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100 lg:whitespace-nowrap`}>
              MSc Software Engineer | Computer Vision Specialist
            </p>
            <p className={`${styles.heroSubText} mt-2 text-[#dfd9ff] italic lg:whitespace-nowrap`}>
              From State-of-the-Art to State-of-the-App.
            </p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex justify-center items-center relative z-10 lg:ml-10">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px]">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#915EFF] to-purple-600 rounded-full blur-[50px] opacity-30 -z-10" />

            <div className="w-full h-full rounded-full border-[3px] border-secondary/30 p-2 relative backdrop-blur-sm bg-purple-900/10 shadow-[0_0_30px_rgba(145,94,255,0.2)]">
              <img
                src="/wael.png"
                alt="Wael Kabouk"
                className="w-full h-full object-cover rounded-full shadow-2xl ring-2 ring-purple-500/20 grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 w-full flex justify-center items-center z-20">
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
