// Import asset images/icons from the assets folder
import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  // New project assets – ensure these are present in your assets folder:
  restaurantOrders,
  mentalHealth,
  irrigation,
  wtcapital,
  vehiclesDetector,
  moviesReview,
  tekram,
  library, // Library Management System icon/image
  multicam, // Multi-Camera Object Detection icon/image
  meezahsa, // Meezah Marketing Services website image
  befit, // BeFit Control Panel image
} from '../assets';

// Navigation links
export const navLinks = [
  { id: 'about', title: 'About' },
  { id: 'education', title: 'Education' },
  { id: 'publications', title: 'Publications' },
  { id: 'experience', title: 'Experience' },
  { id: 'works', title: 'Works' },
  { id: 'skills', title: 'Skills' },
  { id: 'languages', title: 'Languages' },
  { id: 'contact', title: 'Contact' },
];

// Services provided
export const services = [
  { title: 'Web Developer', icon: web },
  { title: 'Mobile Developer', icon: mobile },
  { title: 'AI Developer', icon: backend },
];

// Technologies used
export const technologies = [
  { name: 'HTML 5', icon: html },
  { name: 'CSS 3', icon: css },
  { name: 'JavaScript', icon: javascript },
  { name: 'TypeScript', icon: typescript },
  { name: 'React JS', icon: reactjs },
  { name: 'Redux Toolkit', icon: redux },
  { name: 'Tailwind CSS', icon: tailwind },
  { name: 'Node JS', icon: nodejs },
  { name: 'MongoDB', icon: mongodb },
  { name: 'Git', icon: git },
  { name: 'Figma', icon: figma },
  { name: 'Docker', icon: docker },
];

// Technical Skills categorized
export const skillsData = [
  {
    name: 'AI',
    icon: '🤖',
    skills: [
      'Python',
      'C++',
      'PyTorch',
      'TensorFlow',
      'OpenCV',
      'YOLO (v11)',
      'ByteTrack',
      'OC-SORT',
      'Microsoft Florence-2',
      'HuggingFace',
      'Transformers',
      'LangGraph',
      'LangChain',
      'LanceDB',
      'FAISS',
      'Scikit-learn',
      'MLflow',
    ],
  },
  {
    name: 'Full Stack',
    icon: '💻',
    skills: [
      'React',
      'Next.js',
      'Flutter (Dart)',
      'PyQt',
      'FastAPI',
      'Express',
      'Node.js',
      'PostgreSQL',
      'MongoDB',
      'SQL',
    ],
  },
  {
    name: 'DevOps & Tools',
    icon: '⚙️',
    skills: ['Docker', 'Kubernetes', 'Git', 'AWS', 'Linux CLI'],
  },
];

// Languages with proficiency levels
export const languagesData = [
  {
    name: 'Arabic',
    nativeName: 'العربية',
    proficiency: 'Native',
  },
  {
    name: 'English',
    nativeName: 'English',
    proficiency: 'C1',
  },
  {
    name: 'Turkish',
    nativeName: 'Türkçe',
    proficiency: 'B2',
  },
];

// Academic & Research experiences (reverse chronological order)
export const researchExperiences = [
  {
    title: 'Virtual Context Multi-Camera Tracking',
    company_name: 'MSc Thesis Research - Sakarya University',
    icon: backend,
    iconBg: '#4ECDC4',
    date: 'Oct 2023 - Sep 2025',
    category: 'research',
    points: [
      'Developed "Virtual Context Stacking" method that eliminates re-identification layer in multi-camera tracking pipeline.',
      'Achieved 81.3% cross-view identity consistency rate and sustained 30 FPS performance on standard hardware.',
      'Engineered unified pipeline using YOLO v11 and ByteTrack, bypassing need for explicit re-identification networks.',
      'Built modular evaluation tool using PyQt5 and OpenCV for reproducible testing.',
    ],
  },
  {
    title: 'Hybrid Semantic-Governance Framework (HSGF)',
    company_name: 'Independent Research',
    icon: backend,
    iconBg: '#06B6D4',
    date: '2024 - Present',
    category: 'research',
    points: [
      'Designed "Semantic Governance" hierarchical control system using rigid linguistic attributes to audit track associations.',
      'Engineered robust pipeline combining OC-SORT and YOLO11 with Microsoft Florence-2 VLM for attribute reasoning.',
      'Developed functional Proof-of-Concept prototype capable of detecting identity conflicts in offline tests.',
      'Stack: PyTorch, OpenCV, HuggingFace Transformers, and LanceDB (Vector Store).',
    ],
  },
];

// Industry experiences (reverse chronological order)
export const industryExperiences = [
  {
    title: 'AI & Software Engineer',
    company_name: 'Self-Employed',
    icon: backend,
    iconBg: '#915EFF',
    date: 'Oct 2023 - Present',
    category: 'industry',
    points: [
      'Designed and delivered scalable AI-driven web applications for clients using Next.js and TypeScript.',
      'Implemented hexagonal architecture to decouple UI logic from inference APIs.',
      'Restructured database schemas for high-traffic platforms, reducing query latency through advanced indexing strategies in PostgreSQL.',
    ],
  },
  {
    title: 'Associate Software Engineer',
    company_name: 'Kyber Tech',
    icon: web,
    iconBg: '#6366F1',
    date: 'Jan 2023 - Jun 2023',
    category: 'industry',
    points: [
      'Developed feature-complete web modules and optimized frontend rendering using the MERN stack.',
      'Built comprehensive full-stack websites using React.js and Next.js.',
      'Ensured optimal user experience through responsive design and performance optimizations.',
    ],
  },
];

// Teaching & Leadership experiences (reverse chronological order)
export const teachingExperiences = [
  {
    title: 'Technical Lead',
    company_name: 'Syria Students Union',
    icon: web,
    iconBg: '#F59E0B',
    date: 'Oct 2023 - Oct 2024',
    category: 'teaching',
    points: [
      'Led development of automated Telegram bot using Python to handle high-volume student inquiries.',
      'Managed technical architecture and deployment for remote team collaboration.',
    ],
  },
  {
    title: 'Programming Instructor',
    company_name: 'Youth Center - Mugla',
    icon: creator,
    iconBg: '#FB923C',
    date: 'Oct 2022 - Jul 2023',
    category: 'teaching',
    points: [
      'Designed curriculum and taught Python/C++ fundamentals, focusing on algorithmic problem-solving.',
      'Mentored students through full software development lifecycle, from debugging to deployment.',
    ],
  },
];

// Combined experiences array for backward compatibility (if needed)
export const experiences = [
  ...researchExperiences,
  ...industryExperiences,
  ...teachingExperiences,
];

// Publications (reverse chronological order)
export const publications = [
  {
    authors: ['W. Kabouk', 'A. Özmen'],
    title: 'Virtual Context-Based Multi-Camera Vehicle Tracking',
    conference: '3rd International Ankara Scientific Research and Innovation Congress',
    publisher: 'International Science and Art Research Center',
    location: 'Ankara, Turkey',
    date: 'July 2025',
    pages: '413-429',
    category: 'research',
    keyAchievement: 'Proposed "Virtual Context Stacking" method that eliminates re-identification layer in multi-camera tracking pipeline achieving up to 81.3% cross-view identity consistency rate.',
  },
  {
    authors: [
      'W. Kabouk',
      'A. N. Alyahya',
      'M. M. Alhusseini',
      'M. A. Al shabaan',
    ],
    title:
      'Integrating Demographic and Clinical Features in Heart Attack Prediction using Machine Learning Models',
    conference:
      '6th International Conference on Engineering and Applied Natural Sciences',
    publisher: 'All Sciences Academy',
    location: 'Konya, Turkey',
    date: 'June 2025',
    pages: '30-39',
    category: 'research',
    keyAchievement:
      'Validated Random Forest, KNN, and AdaBoost classifiers on clinical datasets, identifying high-risk cardiovascular patients with 71% accuracy.',
  },
];

// Testimonials from clients or colleagues
export const testimonials = [
  {
    testimonial:
      'I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.',
    name: 'Sara Lee',
    designation: 'CFO',
    company: 'Acme Co',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: 'Chris Brown',
    designation: 'COO',
    company: 'DEF Corp',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: 'Lisa Wang',
    designation: 'CTO',
    company: '456 Enterprises',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
];

// Projects portfolio
export const projects = [
  {
    name: 'Multi-Vendor E-Commerce Cross-Platform App',
    description:
      'A robust cross-platform app developed using Flutter and Express.Js that enables users to order various products from different vendors with ease.',
    tags: [
      { name: 'Flutter', color: 'blue-text-gradient' },
      { name: 'Express.Js', color: 'green-text-gradient' },
    ],
    image: restaurantOrders, // Ensure this asset is added
    source_code_link: 'https://github.com/waelkabouk/multi-vendor-genie-store-cross-platform',
  },
  {
    name: 'Mental Health Analysis',
    description:
      'A machine learning project using R and Jupyter Notebook to predict mental health consequences based on survey data, comparing SVM, ANN, and Logistic Regression models.',
    tags: [
      { name: 'R', color: 'blue-text-gradient' },
      { name: 'Machine Learning', color: 'green-text-gradient' },
      { name: 'Data Analysis', color: 'pink-text-gradient' },
    ],
    image: mentalHealth, // Ensure this asset is added
    source_code_link: 'https://github.com/mertcd/Mental-Health-Analysis',
  },
  {
    name: 'Solar Powered Irrigation System',
    description:
      'An innovative embedded system that automates agricultural irrigation using solar power and GSM technology, integrating sensors and an Arduino micro-controller for real-time control.',
    tags: [
      { name: 'Embedded Systems', color: 'blue-text-gradient' },
      { name: 'Arduino', color: 'green-text-gradient' },
      { name: 'GSM', color: 'pink-text-gradient' },
    ],
    image: irrigation, // Ensure this asset is added
    source_code_link: '',
    isPrivate: true,
  },
  {
    name: 'WT-Capital Web-App',
    description:
      'Production-ready portfolio website for WT-Capital, showcasing products, services, promotions, news, and events. Developed with Next.js and Sanity.io, demonstrating practical application of modern web technologies for client deliverables.',
    tags: [
      { name: 'Next.js', color: 'blue-text-gradient' },
      { name: 'Sanity.io', color: 'green-text-gradient' },
      { name: 'Web Development', color: 'pink-text-gradient' },
    ],
    image: wtcapital, // Ensure this asset is added
    source_code_link: 'https://github.com/waelkabouk/wt-capital',
  },
  {
    name: 'Vehicles Detecting System',
    description:
      'A Python-based computer vision project using YOLO11 and OpenCV for real-time vehicle detection and counting on highways. Part of research work exploring practical applications of computer vision in traffic monitoring systems.',
    tags: [
      { name: 'YOLO11', color: 'blue-text-gradient' },
      { name: 'OpenCV', color: 'green-text-gradient' },
      { name: 'Computer Vision', color: 'pink-text-gradient' },
    ],
    image: vehiclesDetector, // Ensure this asset is added
    source_code_link: 'https://github.com/waelkabouk/virtual-context-multi-camera-tracking ',
  },
  {
    name: 'Movies Review Website',
    description:
      'A full-stack movie review application featuring a decoupled architecture. Built with Spring Boot for the backend, MongoDB for the database, and React for the frontend, it allows parallel development of client and server components.',
    tags: [
      { name: 'Spring Boot', color: 'blue-text-gradient' },
      { name: 'MongoDB', color: 'green-text-gradient' },
      { name: 'React', color: 'pink-text-gradient' },
    ],
    image: moviesReview, // Ensure this asset is added
    source_code_link: 'https://github.com/waelkabouk/movies_api',
  },
  {
    name: 'Tekram Telegram Chatbot',
    description:
      'An advanced Telegram chatbot developed using pyTelegramBotAPI, featuring a robust, multilingual database tailored for students in Sakarya Province to enhance communication and access to information.',
    tags: [
      { name: 'Telegram', color: 'blue-text-gradient' },
      { name: 'Chatbot', color: 'green-text-gradient' },
      { name: 'Python', color: 'pink-text-gradient' },
    ],
    image: tekram, // Ensure this asset is added
    source_code_link: 'https://github.com/waelkabouk/tekram_bot',
  },
  {
    name: 'Library Management System',
    description:
      'A robust full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) that streamlines library operations, including book inventory, user administration, and lending functionalities. Docker is used for containerization and deployment.',
    tags: [
      { name: 'MERN', color: 'blue-text-gradient' },
      { name: 'Docker', color: 'green-text-gradient' },
      { name: 'Express', color: 'pink-text-gradient' },
    ],
    image: library, // Ensure the 'library' asset is added
    source_code_link: 'https://github.com/waelkabouk/kitabi-kitabuk-frontend',
  },
  {
    name: 'Multi-Camera Object Tracking System',
    description:
      'MSc thesis research project: A novel multi-camera tracking system using "Virtual Context Stacking" method. Achieves 81.3% cross-view identity consistency and 30 FPS performance by eliminating re-identification layers. Integrates YOLO v11 and ByteTrack in a unified pipeline, demonstrating how research innovations translate to production-ready computer vision systems.',
    tags: [
      { name: 'Computer Vision', color: 'blue-text-gradient' },
      { name: 'YOLO11', color: 'green-text-gradient' },
      { name: 'Research', color: 'pink-text-gradient' },
    ],
    image: multicam, // Ensure the 'multicam' asset is added
    source_code_link: 'https://github.com/waelkabouk/virtual-context-multi-camera-tracking ',
  },
  {
    name: 'Meezah Marketing Services Website',
    description:
      'Client project: A comprehensive marketing services website for Meezah (ميزة لخدمات التسويق) showcasing services, projects, and company information. Built with Next.js and PostgreSQL, featuring optimized database schemas and advanced indexing for high-traffic performance.',
    tags: [
      { name: 'Next.js', color: 'blue-text-gradient' },
      { name: 'PostgreSQL', color: 'green-text-gradient' },
      { name: 'Web Development', color: 'pink-text-gradient' },
    ],
    image: meezahsa,
    project_link: 'https://www.meezahsa.com/',
    source_code_link: '',
    isPrivate: true,
  },
  {
    name: 'BeFit Control Panel',
    description:
      'A comprehensive control panel for managing football field reservations for BeFit academy in Dubai. Features dashboard management, reservation system, and bilingual support (English/Arabic). Built with React, Vite, and Express for a fast and efficient user experience.',
    tags: [
      { name: 'React', color: 'blue-text-gradient' },
      { name: 'Vite', color: 'green-text-gradient' },
      { name: 'Express', color: 'pink-text-gradient' },
    ],
    image: befit,
    project_link: '',
    source_code_link: 'https://github.com/waelkabouk/befit-control-panel',
  },
];
