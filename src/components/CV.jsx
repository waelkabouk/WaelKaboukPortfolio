import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';

// Enhanced SVG icons with animations
const DownloadIcon = ({
  className = 'w-4 h-4 sm:w-5 sm:h-5',
  isDownloading = false,
}) => (
  <motion.svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    animate={
      isDownloading
        ? {
            y: [0, 3, 0],
            scale: [1, 1.1, 1],
          }
        : {}
    }
    transition={{
      duration: 0.6,
      repeat: isDownloading ? Infinity : 0,
      ease: 'easeInOut',
    }}
  >
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    />
  </motion.svg>
);

const FileIcon = ({ className = 'w-6 h-6 sm:w-8 sm:h-8' }) => (
  <motion.svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.3 },
    }}
  >
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    />
  </motion.svg>
);

const EyeIcon = ({ className = 'w-4 h-4 sm:w-5 sm:h-5' }) => (
  <motion.svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ scale: 1.1 }}
  >
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    />
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    />
  </motion.svg>
);

const CVDownload = ({
  cvUrl = 'WaelKabouk_SoftwareEngineer.pdf',
  fileName = 'Wael_Kabouk_CV.pdf',
  lastUpdated = 'January 2025',
}) => {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);
  const cardRef = React.useRef(null);

  // Intersection Observer for scroll animations
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
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

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = fileName;
      link.setAttribute('aria-label', `Download ${fileName}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success feedback
      setTimeout(() => {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 2000);
      }, 500);
    } catch (error) {
      console.error('Download failed:', error);
      window.open(cvUrl, '_blank');
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  const handleView = () => {
    window.open(cvUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      ref={cardRef}
      variants={fadeIn('up', 'spring', 0.2, 0.75)}
      initial="hidden"
      animate={isVisible ? 'show' : 'hidden'}
      className="w-full max-w-sm sm:max-w-md mx-auto"
    >
      <motion.div
        className="bg-tertiary p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-card hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-secondary/20 relative overflow-hidden"
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ scale: 0, rotate: 0 }}
          whileHover={{
            scale: 1.5,
            rotate: 180,
            transition: { duration: 0.8 },
          }}
        />

        {/* Success notification */}
        <motion.div
          className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            downloadSuccess
              ? {
                  scale: [0, 1.2, 1],
                  opacity: [0, 1, 1, 0],
                  y: [0, -10, 0],
                }
              : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 2 }}
        >
          Downloaded!
        </motion.div>

        {/* Header Section */}
        <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6 relative z-10">
          <motion.div
            className="text-secondary group-hover:text-white transition-colors duration-300 flex-shrink-0 mt-1"
            initial={{ rotate: -180, opacity: 0 }}
            animate={
              isVisible
                ? { rotate: 0, opacity: 1 }
                : { rotate: -180, opacity: 0 }
            }
            transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
          >
            <FileIcon />
          </motion.div>
          <div className="flex-1 min-w-0">
            <motion.h3
              className="text-white font-bold text-base sm:text-lg lg:text-xl leading-tight"
              initial={{ x: -20, opacity: 0 }}
              animate={
                isVisible ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }
              }
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Curriculum Vitae (CV)
            </motion.h3>
            <motion.p
              className="text-secondary text-xs sm:text-sm mt-1 leading-relaxed"
              initial={{ x: -20, opacity: 0 }}
              animate={
                isVisible ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }
              }
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Download or view my latest CV
            </motion.p>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="space-y-2 sm:space-y-3 relative z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:from-blue-700 active:to-purple-800 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-tertiary text-sm sm:text-base relative overflow-hidden"
            aria-label={`Download ${fileName}`}
            disabled={isDownloading}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated background shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut',
              }}
            />

            <DownloadIcon isDownloading={isDownloading} />
            <motion.span
              animate={isDownloading ? { opacity: [1, 0.5, 1] } : {}}
              transition={{
                duration: 0.5,
                repeat: isDownloading ? Infinity : 0,
              }}
            >
              {isDownloading ? 'Downloading...' : 'Download CV'}
            </motion.span>
          </motion.button>

          <motion.button
            onClick={handleView}
            className="w-full border border-secondary/50 text-secondary hover:bg-secondary/10 hover:text-white hover:border-secondary font-medium py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-tertiary flex items-center justify-center gap-2 text-sm sm:text-base"
            aria-label="View CV online"
            whileHover={{
              scale: 1.02,
              borderColor: 'rgba(255, 255, 255, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <EyeIcon />
            <span>View Online</span>
          </motion.button>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          className="mt-4 sm:mt-5 text-center relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <motion.span
            className="text-[10px] sm:text-xs text-gray-400 bg-black/20 px-2 py-1 rounded-full"
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}
          >
            PDF • Updated {lastUpdated}
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced compact version with animations
export const CVDownloadCompact = ({
  cvUrl = 'WaelKabouk_SoftwareEngineer.pdf',
  fileName = 'Wael_Kabouk_CV.pdf',
  showText = true,
}) => {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = fileName;
      link.setAttribute('aria-label', `Download ${fileName}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 1500);
      }, 500);
    } catch (error) {
      console.error('Download failed:', error);
      window.open(cvUrl, '_blank');
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  return (
    <motion.div
      variants={fadeIn('up', 'spring', 0.2, 0.75)}
      className="inline-block relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Success indicator */}
      <motion.div
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          downloadSuccess
            ? {
                scale: [0, 1.2, 1],
                opacity: [0, 1, 1, 0],
                y: [0, -5, 0],
              }
            : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 1.5 }}
      >
        Downloaded!
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500" />
      </motion.div>

      <motion.button
        onClick={handleDownload}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:from-blue-700 active:to-purple-800 text-white font-medium py-2 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl flex items-center gap-1.5 sm:gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl text-sm sm:text-base relative overflow-hidden"
        aria-label={`Download ${fileName}`}
        disabled={isDownloading}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)',
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulse effect on download */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-lg sm:rounded-xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isDownloading
              ? {
                  scale: [0, 1.5],
                  opacity: [0.5, 0],
                }
              : {}
          }
          transition={{
            duration: 1,
            repeat: isDownloading ? Infinity : 0,
            ease: 'easeOut',
          }}
        />

        <DownloadIcon isDownloading={isDownloading} />
        {showText && (
          <motion.span
            className="hidden xs:inline sm:inline"
            animate={isDownloading ? { opacity: [1, 0.6, 1] } : {}}
            transition={{ duration: 0.6, repeat: isDownloading ? Infinity : 0 }}
          >
            {isDownloading ? 'Downloading...' : 'Download CV'}
          </motion.span>
        )}
      </motion.button>
    </motion.div>
  );
};

// Animated inline version for navigation bars
export const CVDownloadInline = ({
  cvUrl = 'WaelKabouk_SoftwareEngineer.pdf',
  fileName = 'Wael_Kabouk_CV.pdf',
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      window.open(cvUrl, '_blank');
    }
  };

  return (
    <motion.button
      onClick={handleDownload}
      className="text-secondary hover:text-white transition-colors duration-300 flex items-center gap-1.5 text-sm sm:text-base font-medium relative"
      aria-label={`Download ${fileName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={isHovered ? { y: [0, -2, 0] } : {}}
        transition={{ duration: 0.4, repeat: isHovered ? Infinity : 0 }}
      >
        <DownloadIcon className="w-4 h-4" />
      </motion.div>
      <motion.span
        className="hidden sm:inline"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        Download CV
      </motion.span>
      <motion.span
        className="sm:hidden"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        CV
      </motion.span>

      {/* Underline effect */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
        initial={{ width: 0 }}
        animate={isHovered ? { width: '100%' } : { width: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default CVDownload;
