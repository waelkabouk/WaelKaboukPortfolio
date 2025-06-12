import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

// Optimized Custom Tilt Component with better performance
const CustomTilt = ({ children, className }) => {
  const [transform, setTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef(null);
  const animationRef = useRef(null);
  const isDesktop = useRef(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );

  // Update desktop detection on resize
  useEffect(() => {
    const handleResize = () => {
      isDesktop.current = window.innerWidth >= 768;
      if (!isDesktop.current) {
        setIsHovered(false);
        setTransform('');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback((e) => {
    if (!elementRef.current || !isDesktop.current) return;

    // Cancel previous animation frame
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    animationRef.current = requestAnimationFrame(() => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8; // Reduced intensity
      const rotateY = ((x - centerX) / centerX) * 8;

      setTransform(
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      );
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isDesktop.current) {
      setIsHovered(true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setTransform('');
  }, []);

  // Improved mobile touch interactions
  const handleTouchStart = useCallback((e) => {
    if (isDesktop.current) return;
    e.preventDefault(); // Prevent default touch behavior

    setTransform('perspective(1000px) scale3d(0.97, 0.97, 0.97)');
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (isDesktop.current) return;

    // Quick bounce animation
    setTransform('perspective(1000px) scale3d(1.03, 1.03, 1.03)');

    setTimeout(() => {
      setTransform('');
    }, 150);
  }, []);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const transitionStyle = useMemo(
    () => ({
      transform: transform,
      transition: isHovered
        ? 'transform 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transformStyle: 'preserve-3d',
      willChange: isHovered ? 'transform' : 'auto',
    }),
    [transform, isHovered]
  );

  return (
    <div
      ref={elementRef}
      className={`${className} cursor-pointer`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={transitionStyle}
    >
      {children}
    </div>
  );
};

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    once: true,
    margin: '0px 0px 50px 0px',
    amount: 0.1,
  });
  const controls = useAnimation();

  // Animate when in view
  useEffect(() => {
    if (isInView) {
      controls.start('show');
    }
  }, [isInView, controls]);

  // Optimized click handler with error handling
  const handleGitHubClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (source_code_link) {
        try {
          window.open(source_code_link, '_blank', 'noopener,noreferrer');
        } catch (error) {
          console.error('Failed to open link:', error);
        }
      }
    },
    [source_code_link]
  );

  // Memoized tag animations
  const tagVariants = useMemo(
    () => ({
      hidden: { scale: 0, opacity: 0 },
      show: { scale: 1, opacity: 1 },
    }),
    []
  );

  return (
    <motion.div
      ref={cardRef}
      variants={fadeIn('up', 'spring', index * 0.1, 0.3)}
      initial="hidden"
      animate={controls}
      className="w-full"
    >
      <CustomTilt className="bg-tertiary p-4 sm:p-5 rounded-2xl w-full h-full flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300 will-change-transform">
        <div className="relative w-full h-[200px] sm:h-[230px] group overflow-hidden rounded-2xl">
          <img
            src={image}
            alt={`${name} project screenshot`}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:brightness-75 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement?.classList.add('bg-gray-800');
            }}
          />

          {/* Improved overlay with better mobile support */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

          <div className="absolute inset-0 flex justify-end m-2 sm:m-3 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-3 group-hover:translate-y-0">
            <motion.button
              onClick={handleGitHubClick}
              className="black-gradient w-8 h-8 sm:w-10 sm:h-10 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent backdrop-blur-sm border border-white/20"
              aria-label={`View source code for ${name} project`}
              type="button"
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              whileTap={{
                scale: 0.9,
                transition: { duration: 0.1 },
              }}
              initial={{ rotate: 0 }}
            >
              <img
                src={github}
                alt="GitHub"
                className="w-1/2 h-1/2 object-contain filter brightness-110"
              />
            </motion.button>
          </div>

          {/* Enhanced mobile interaction indicator */}
          <div className="absolute bottom-2 right-2 md:hidden">
            <motion.div
              className="w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </motion.div>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 flex-1 flex flex-col">
          <motion.h3
            className="text-white font-bold text-lg sm:text-[24px] leading-tight mb-2 sm:mb-3"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 0.05, duration: 0.3, ease: 'easeOut' }}
          >
            {name}
          </motion.h3>

          <motion.p
            className="text-secondary text-sm sm:text-[14px] leading-relaxed flex-1 mb-3 sm:mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 0.08, duration: 0.3, ease: 'easeOut' }}
          >
            {description}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.04,
                  delayChildren: 0.12,
                },
              },
            }}
          >
            {tags &&
              tags.map((tag, tagIndex) => (
                <motion.span
                  key={`${name}-${tag.name}-${tagIndex}`}
                  className={`text-xs sm:text-[12px] px-2 sm:px-3 py-1 rounded-full border border-opacity-50 ${
                    tag.color || 'text-blue-400'
                  } border-current bg-current bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 cursor-default select-none`}
                  variants={tagVariants}
                  transition={{
                    duration: 0.2,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  #{tag.name}
                </motion.span>
              ))}
          </motion.div>
        </div>
      </CustomTilt>
    </motion.div>
  );
};

const Works = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '0px 0px 100px 0px',
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('show');
    }
  }, [isInView, controls]);

  return (
    <div className="w-full" ref={sectionRef}>
      <motion.div variants={textVariant()} initial="hidden" animate={controls}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.05, 0.4)}
        initial="hidden"
        animate={controls}
        className="mt-3 text-secondary text-base sm:text-[17px] max-w-3xl leading-6 sm:leading-[30px]"
      >
        Following projects showcase my skills and experience through real-world
        examples of my work. Each project reflects my ability to solve complex
        problems, work with different technologies, and manage projects
        effectively.
      </motion.p>

      <div className="mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7 auto-rows-fr">
        {projects && projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))
        ) : (
          <motion.div
            className="col-span-full text-center text-secondary py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg">No projects available</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SectionWrapper(Works, 'work');
