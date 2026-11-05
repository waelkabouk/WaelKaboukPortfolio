import { motion } from 'framer-motion';

import { styles } from '../styles';
import { textVariant } from '../utils/motion';

// One heading per section: the title in Newsreader, then one plain line in mist.
// Replaces the old uppercase eyebrow above the heading.
const SectionHeading = ({ title, line, as: Tag = 'h2', align = 'left' }) => (
  <motion.div
    variants={textVariant()}
    className={
      align === 'center'
        ? 'text-center mx-auto'
        : 'lg:grid lg:grid-cols-[1fr_1fr] lg:gap-20 lg:items-end'
    }
  >
    <Tag className={styles.sectionHeadText}>{title}</Tag>
    {line && (
      <p
        className={`${styles.sectionSubText} mt-4 lg:mt-0 lg:pb-2 max-w-[48ch] ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      >
        {line}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
