import React from 'react';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

// Custom Tilt Component with mobile-friendly animations
const CustomTilt = ({ children, className }) => {
  const [transform, setTransform] = React.useState('');
  const [isHovered, setIsHovered] = React.useState(false);
  const [isTouched, setIsTouched] = React.useState(false);
  const elementRef = React.useRef(null);

  // Desktop mouse interactions
  const handleMouseMove = (e) => {
    if (!elementRef.current || window.innerWidth < 768) return;

    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    );
  };

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('');
  };

  // Mobile touch interactions
  const handleTouchStart = (e) => {
    if (window.innerWidth >= 768) return;
    setIsTouched(true);

    // Add a subtle press animation
    setTransform('perspective(1000px) scale3d(0.98, 0.98, 0.98) rotateX(2deg)');
  };

  const handleTouchEnd = () => {
    if (window.innerWidth >= 768) return;
    setIsTouched(false);

    // Bounce back with a subtle lift
    setTransform(
      'perspective(1000px) scale3d(1.02, 1.02, 1.02) rotateX(-1deg)'
    );

    // Return to normal after bounce
    setTimeout(() => {
      setTransform('');
    }, 300);
  };

  return (
    <div
      ref={elementRef}
      className={`${className} transition-all duration-300 ease-out`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: transform,
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : isTouched
          ? 'transform 0.15s ease-out'
          : 'transform 0.3s ease-out',
        transformStyle: 'preserve-3d',
      }}
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
  const [isVisible, setIsVisible] = React.useState(false);
  const cardRef = React.useRef(null);

  // Intersection Observer for scroll animations
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
      initial="hidden"
      animate={isVisible ? 'show' : 'hidden'}
      className="w-full"
    >
      <CustomTilt className="bg-tertiary p-4 sm:p-5 rounded-2xl w-full h-full flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="relative w-full h-[200px] sm:h-[230px] group overflow-hidden rounded-2xl">
          <img
            src={image}
            alt={`${name} project screenshot`}
            className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-75 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              console.error(`Failed to load image: ${image}`);
            }}
          />

          {/* Animated overlay on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 md:hidden transition-opacity duration-300" />

          <div className="absolute inset-0 flex justify-end m-2 sm:m-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={() => {
                if (source_code_link) {
                  window.open(
                    source_code_link,
                    '_blank',
                    'noopener,noreferrer'
                  );
                }
              }}
              className="black-gradient w-8 h-8 sm:w-10 sm:h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent active:scale-95 backdrop-blur-sm"
              aria-label={`View source code for ${name} project`}
              type="button"
            >
              <img
                src={github}
                alt="GitHub"
                className="w-1/2 h-1/2 object-contain"
              />
            </button>
          </div>

          {/* Mobile tap indicator */}
          <div className="absolute bottom-2 right-2 md:hidden opacity-70">
            <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 flex-1 flex flex-col">
          <motion.h3
            className="text-white font-bold text-lg sm:text-[24px] leading-tight mb-2 sm:mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {name}
          </motion.h3>

          <motion.p
            className="text-secondary text-sm sm:text-[14px] leading-relaxed flex-1 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {description}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {tags &&
              tags.map((tag, tagIndex) => (
                <motion.span
                  key={`${name}-${tag.name}-${tagIndex}`}
                  className={`text-xs sm:text-[12px] px-2 sm:px-3 py-1 rounded-full border border-opacity-50 ${
                    tag.color || 'text-blue-400'
                  } border-current bg-current bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 cursor-default`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    isVisible
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{
                    delay: 0.5 + tagIndex * 0.1,
                    duration: 0.3,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.05 }}
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
  return (
    <div className="w-full">
      <motion.div variants={textVariant()} initial="hidden" animate="show">
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        initial="hidden"
        animate="show"
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
          <div className="col-span-full text-center text-secondary">
            No projects available
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionWrapper(Works, 'work');
