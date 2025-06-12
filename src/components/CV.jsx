import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';

// Optimized SVG icons with better responsiveness
const DownloadIcon = ({ className = 'w-4 h-4 sm:w-5 sm:h-5' }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const FileIcon = ({ className = 'w-6 h-6 sm:w-8 sm:h-8' }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const EyeIcon = ({ className = 'w-4 h-4 sm:w-5 sm:h-5' }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const CVDownload = ({
  cvUrl = 'WaelKabouk_SoftwareEngineer.pdf',
  fileName = 'Wael_Kabouk_CV.pdf',
  lastUpdated = 'January 2025',
}) => {
  const handleDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = fileName;
      link.setAttribute('aria-label', `Download ${fileName}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to opening in new tab
      window.open(cvUrl, '_blank');
    }
  };

  const handleView = () => {
    window.open(cvUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      variants={fadeIn('up', 'spring', 0.2, 0.75)}
      className="w-full max-w-sm sm:max-w-md mx-auto"
    >
      <div className="bg-tertiary p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-card hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-secondary/20">
        {/* Header Section */}
        <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="text-secondary group-hover:text-white transition-colors duration-300 flex-shrink-0 mt-1">
            <FileIcon />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-base sm:text-lg lg:text-xl leading-tight">
              Curriculum Vitae (CV)
            </h3>
            <p className="text-secondary text-xs sm:text-sm mt-1 leading-relaxed">
              Download or view my latest CV
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 sm:space-y-3">
          <button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:from-blue-700 active:to-purple-800 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-tertiary text-sm sm:text-base"
            aria-label={`Download ${fileName}`}
          >
            <DownloadIcon />
            <span>Download CV</span>
          </button>

          <button
            onClick={handleView}
            className="w-full border border-secondary/50 text-secondary hover:bg-secondary/10 hover:text-white hover:border-secondary font-medium py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-tertiary flex items-center justify-center gap-2 text-sm sm:text-base"
            aria-label="View CV online"
          >
            <EyeIcon />
            <span>View Online</span>
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-4 sm:mt-5 text-center">
          <span className="text-[10px] sm:text-xs text-gray-400 bg-black/20 px-2 py-1 rounded-full">
            PDF • Updated {lastUpdated}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced compact version with better mobile support
export const CVDownloadCompact = ({
  cvUrl = 'WaelKabouk_SoftwareEngineer.pdf',
  fileName = 'Wael_Kabouk_CV.pdf',
  showText = true,
}) => {
  const handleDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = fileName;
      link.setAttribute('aria-label', `Download ${fileName}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      window.open(cvUrl, '_blank');
    }
  };

  return (
    <motion.div
      variants={fadeIn('up', 'spring', 0.2, 0.75)}
      className="inline-block"
    >
      <button
        onClick={handleDownload}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:from-blue-700 active:to-purple-800 text-white font-medium py-2 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl flex items-center gap-1.5 sm:gap-2 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl text-sm sm:text-base"
        aria-label={`Download ${fileName}`}
      >
        <DownloadIcon />
        {showText && (
          <span className="hidden xs:inline sm:inline">Download CV</span>
        )}
      </button>
    </motion.div>
  );
};

// New inline version for navigation bars
export const CVDownloadInline = ({
  cvUrl = 'WaelKabouk_SoftwareEngineer.pdf',
  fileName = 'Wael_Kabouk_CV.pdf',
}) => {
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
    <button
      onClick={handleDownload}
      className="text-secondary hover:text-white transition-colors duration-300 flex items-center gap-1.5 text-sm sm:text-base font-medium"
      aria-label={`Download ${fileName}`}
    >
      <DownloadIcon className="w-4 h-4" />
      <span className="hidden sm:inline">Download CV</span>
      <span className="sm:hidden">CV</span>
    </button>
  );
};

export default CVDownload;
