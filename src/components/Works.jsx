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
import PrivateProjectModal from './PrivateProjectModal';
import FeaturedWork from './FeaturedWork';

// Optimized Custom Tilt Component with better performance
const CustomTilt = ({ children, className, onClick }) => {
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
    // Don't prevent default if there's an onClick handler (for navigation)
    if (!onClick) {
      e.preventDefault();
    }

    setTransform('perspective(1000px) scale3d(0.97, 0.97, 0.97)');
  }, [onClick]);

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
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
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
  project_link,
  isPrivate,
}) => {
  const cardRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Handle card click to navigate to project link
  const handleCardClick = useCallback(
    (e) => {
      // Don't navigate if clicking on the GitHub button or its parent
      if (
        e.target.closest('button') ||
        e.target.closest('[aria-label*="source code"]')
      ) {
        return;
      }
      if (project_link) {
        try {
          window.open(project_link, '_blank', 'noopener,noreferrer');
        } catch (error) {
          console.error('Failed to open project link:', error);
        }
      }
    },
    [project_link]
  );

  // Optimized click handler with error handling
  const handleGitHubClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (isPrivate) {
        setIsModalOpen(true);
      } else if (source_code_link) {
        try {
          window.open(source_code_link, '_blank', 'noopener,noreferrer');
        } catch (error) {
          console.error('Failed to open link:', error);
        }
      }
    },
    [source_code_link, isPrivate]
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
      <CustomTilt
        className={`bg-tertiary p-4 sm:p-5 w-full h-full flex flex-col transition-colors duration-300 hover:bg-black-200 will-change-transform ${project_link ? 'cursor-pointer' : ''
          }`}
        onClick={project_link ? handleCardClick : undefined}
      >
        <div className="relative w-full h-[200px] sm:h-[230px] group overflow-hidden bg-black-200">
          <img
            src={image}
            alt={`${name} project screenshot`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />

          <div className="absolute inset-0 flex justify-end m-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 ease-out">
            <motion.button
              onClick={handleGitHubClick}
              className="bg-primary w-11 h-11 rounded-full flex justify-center items-center cursor-pointer transition-colors duration-200 hover:bg-black-300"
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
        </div>

        <div className="mt-5 flex-1 flex flex-col">
          <motion.h3
            className="font-serif font-medium text-white text-[22px] lg:text-[24px] leading-tight mb-3"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 0.05, duration: 0.3, ease: 'easeOut' }}
          >
            {name}
          </motion.h3>

          <motion.p
            className="text-white-100 text-[16px] leading-relaxed flex-1 mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 0.08, duration: 0.3, ease: 'easeOut' }}
          >
            {description}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-x-4 gap-y-1 mt-auto"
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
                  className="text-secondary text-[16px] cursor-default select-none"
                  variants={tagVariants}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {tag.name}
                </motion.span>
              ))}
          </motion.div>
        </div>
      </CustomTilt>
      <PrivateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectName={name}
      />
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
        <h2 className={styles.sectionHeadText}>Projects</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.05, 0.4)}
        initial="hidden"
        animate={controls}
        className="mt-4 text-secondary text-[17px] sm:text-[18px] max-w-[60ch] leading-relaxed"
      >
        Open repositories link to GitHub. Private ones I can walk through on
        request.
      </motion.p>

      <FeaturedWork />

      <h3 className="mt-24 sm:mt-32 font-serif font-medium text-white text-[28px] sm:text-[34px]">
        More projects
      </h3>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 sm:auto-rows-fr">
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

export default SectionWrapper(Works, 'works');
