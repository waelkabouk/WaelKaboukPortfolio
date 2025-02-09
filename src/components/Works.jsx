import React from 'react';
import { styles } from '../styles';
import { github } from '../assets';
import { projects } from '../constants';

const ProjectCard = ({ name, description, tags, image, source_code_link }) => {
  return (
    <div className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full">
      {/* Responsive image container maintaining a 16:9 aspect ratio */}
      <div className="relative w-full aspect-video">
        <img
          src={image}
          alt={`${name} project`}
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute inset-0 flex justify-end m-3">
          <button
            onClick={() => window.open(source_code_link, '_blank')}
            className="bg-black bg-opacity-50 w-10 h-10 rounded-full flex justify-center items-center focus:outline-none"
          >
            <img
              src={github}
              alt="Source Code"
              className="w-1/2 h-1/2 object-contain"
            />
          </button>
        </div>
      </div>

      {/* Project title and description */}
      <div className="mt-5">
        <h3 className="text-white font-bold text-lg sm:text-[24px]">{name}</h3>
        <p className="mt-2 text-secondary text-sm sm:text-[14px]">{description}</p>
      </div>

      {/* Project tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={`${name}-${idx}`}
            className={`text-xs sm:text-[14px] ${tag.color}`}
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

const Works = () => {
  return (
    <section className="py-10 px-4">
      {/* Section Header */}
      <header className="mb-10 text-center">
        <p className={`${styles.sectionSubText} text-gray-500`}>My work</p>
        <h2 className={`${styles.sectionHeadText} text-white`}>Projects.</h2>
      </header>

      {/* Description */}
      <p className="text-secondary text-base sm:text-[17px] max-w-3xl mx-auto mb-10 leading-relaxed">
        The following projects showcase my skills and experience through real-world examples of my work.
        They reflect my ability to solve complex problems, work with different technologies, and manage projects effectively.
      </p>

      {/* Projects Grid */}
      <div className="flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Works;
