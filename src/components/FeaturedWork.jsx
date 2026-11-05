import { motion } from 'framer-motion';

import { featuredProjects } from '../constants';

// Large, full-width entries for the main production systems.
// Picture and text alternate sides so neighbouring entries differ.
const FeaturedItem = ({ project, index }) => {
  const flip = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`grid gap-8 lg:gap-14 items-start ${
        flip ? 'lg:grid-cols-[1fr_1.5fr]' : 'lg:grid-cols-[1.5fr_1fr]'
      }`}
    >
      <figure className={`lg:sticky lg:top-28 ${flip ? 'lg:order-2' : ''}`}>
        <div className="overflow-hidden bg-black-200">
          <img
            src={project.image}
            alt={project.imageAlt}
            loading="lazy"
            className="w-full h-auto block transition-transform duration-700 ease-out hover:scale-[1.02]"
          />
        </div>
        {project.caption && (
          <figcaption className="mt-3 text-secondary text-[16px]">{project.caption}</figcaption>
        )}
      </figure>

      <div className={flip ? 'lg:order-1' : ''}>
        <h3 className="font-serif font-medium text-white text-[28px] sm:text-[34px] leading-[1.1]">
          {project.name}
        </h3>
        <p className="mt-4 text-white text-[18px] leading-relaxed">{project.summary}</p>

        {project.points?.length > 0 && (
          <ul className="mt-6 space-y-3">
            {project.points.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-white-100 text-[16px] leading-relaxed">
                <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-6 text-secondary text-[16px]">{project.stack.join(' · ')}</p>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center min-h-[48px] px-6 bg-black-200 text-white font-medium text-[16px] transition-colors duration-200 hover:bg-black-300"
          >
            {project.linkLabel || 'Visit the site'}
          </a>
        )}
      </div>
    </motion.article>
  );
};

const FeaturedWork = () => {
  if (!featuredProjects.length) return null;

  return (
    <div className="mt-14 flex flex-col gap-20 sm:gap-28">
      {featuredProjects.map((project, index) => (
        <FeaturedItem key={project.name} project={project} index={index} />
      ))}
    </div>
  );
};

export default FeaturedWork;
