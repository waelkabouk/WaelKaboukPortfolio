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
  metalworldSite,
  metalworldOms,
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
  { title: 'Computer Vision Specialist', icon: backend },
  { title: 'MSc Software Engineer', icon: web },
  { title: 'Full Stack Developer', icon: mobile },
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

// Al Rajhi work is shown only with Wael's explicit approval (brand rule:
// ask every time). Set to false to hide the role and its figures everywhere.
export const SHOW_AL_RAJHI = true;

// Technical skills, grouped the way the work is done
export const skillsData = [
  {
    name: 'Programming languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'C++', 'SQL'],
  },
  {
    name: 'Computer vision',
    skills: [
      'OpenCV',
      'YOLO11',
      'ByteTrack',
      'OC-SORT',
      'Multi-object tracking',
      'Florence-2 (vision-language model)',
    ],
  },
  {
    name: 'Machine learning',
    skills: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face Transformers', 'MLflow'],
  },
  {
    name: 'LLM and retrieval',
    skills: ['LangChain', 'LangGraph', 'Retrieval-augmented generation (RAG)', 'FAISS', 'LanceDB'],
  },
  {
    name: 'Web and backend',
    skills: ['Next.js', 'React', 'FastAPI', 'Node.js', 'Express', 'Spring Boot'],
  },
  {
    name: 'Databases and infrastructure',
    skills: ['PostgreSQL', 'MongoDB', 'Supabase', 'Docker', 'Kubernetes', 'AWS', 'Git'],
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
    title: 'TEKNOFEST 2026, AI in Health',
    company_name: 'Team leader',
    icon: creator,
    date: '2026',
    category: 'research',
    points: [
      'Led a team classifying genetic variants as pathogenic or benign across 4 gene panels.',
      'Random Forest and Extra Trees with stratified 5-fold cross-validation and threshold tuning; external data assembled from ClinVar, gnomAD and dbNSFP.',
      'Reached 0.89 to 0.92 F1 and advanced to the PDR stage (PPR 90%, PDR 89%).',
    ],
  },
  {
    title: 'Hybrid Semantic-Governance Framework (HSGF)',
    company_name: 'Independent research, proof-of-concept',
    icon: backend,
    date: '2024 - Present',
    category: 'research',
    points: [
      'Trackers swap identities under occlusion. HSGF uses language attributes ("silver sedan") from a local vision-language model, Florence-2, to audit and veto wrong track merges.',
      'Pipeline: YOLO11 and OC-SORT for tracking, Florence-2 for attributes, LanceDB as the vector store.',
      'Working proof-of-concept that detects identity conflicts in offline tests.',
    ],
  },
  {
    title: 'Virtual Context Stacking',
    company_name: 'MSc thesis on multi-camera vehicle tracking, Sakarya University',
    icon: backend,
    date: 'Oct 2023 - Sep 2025',
    category: 'research',
    points: [
      'Multi-camera tracking usually needs geometric calibration and a heavy re-identification network. I normalised regions from every camera into one composite frame, so a single pass tracks across all views: one pipeline instead of N.',
      'YOLO11 and ByteTrack, with no explicit re-identification network.',
      '81.3% cross-view identity consistency at 30 FPS on standard hardware.',
      'Published at the 3rd International Ankara Scientific Research and Innovation Congress (July 2025). Advisor: Prof. Dr. Ahmet Özmen.',
    ],
  },
];

// Industry experiences (reverse chronological order)
const alRajhiExperience = {
  title: 'AI Systems Architect',
  company_name: 'Al Rajhi Building and Construction, CEO Office · Riyadh',
  icon: backend,
  date: 'Apr 2026 - Present',
  category: 'industry',
  points: [
    'Head the Operations Management Sector, overseeing factory and showroom operations and performance.',
    'Architected and developed the Operations Management System for Metal World, managing 170+ client contracts across 15 factories and 7 showrooms.',
    'Built an AI-augmented e-commerce platform for Metal World that generated 713 organic search clicks in its first four months.',
    'Developed an AI recruitment system that automates candidate screening and ranking.',
  ],
};

export const industryExperiences = [
  ...(SHOW_AL_RAJHI ? [alRajhiExperience] : []),
  {
    title: 'AI Software Engineer',
    company_name: 'InnoMerx',
    icon: backend,
    date: 'Oct 2023 - Present',
    category: 'industry',
    points: [
      'Design and deliver AI-driven web applications for clients with Next.js, TypeScript and PostgreSQL.',
      'Hexagonal architecture that keeps UI logic separate from inference APIs.',
      'Cut database query time by 28% through PostgreSQL indexing and API restructuring.',
    ],
  },
  {
    title: 'Associate Software Engineer',
    company_name: 'Kyber Tech',
    icon: web,
    date: 'Jan 2023 - Jun 2023',
    category: 'industry',
    points: [
      'Delivered 8 full-stack features on the MERN stack (MongoDB, Express, React, Node.js), including multi-language support and dynamic pages.',
      'Improved loading speed by 30%.',
    ],
  },
];

// Teaching & Leadership experiences (reverse chronological order)
export const teachingExperiences = [
  {
    title: 'Technical Lead',
    company_name: 'Syrian Students Union · Sakarya',
    icon: web,
    date: 'Oct 2023 - Oct 2024',
    category: 'teaching',
    points: [
      'Led development of an automated Python Telegram bot that handles high-volume student inquiries.',
      'Managed the technical architecture and deployment for a remote team.',
    ],
  },
  {
    title: 'Programming Instructor',
    company_name: 'Youth Center · Muğla',
    icon: creator,
    date: 'Oct 2022 - Jul 2023',
    category: 'teaching',
    points: [
      'Designed the curriculum and taught Python and C++ fundamentals, focused on algorithmic problem-solving.',
      'Mentored students through debugging and deployment of their projects.',
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
    keyAchievement: 'Proposes Virtual Context Stacking: regions from every camera are normalised into one composite frame, so one YOLO11 and ByteTrack pass tracks vehicles across views with no calibration and no re-identification network. 81.3% cross-view identity consistency at 30 FPS on standard hardware.',
    link: 'https://drive.google.com/file/d/1R-k0rVyTdPN6vgjZaunwp33kpHB1W3i9/view?usp=sharing',
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
    link: 'https://drive.google.com/file/d/11c0e87fTO9wfR1WSl8wK66twKOqnDaoC/view',
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

// Featured work for Metal World (Al Rajhi Building and Construction).
// Shown only when SHOW_AL_RAJHI is true. The OMS screenshot has every figure,
// client name and date blurred; never replace it with an unblurred capture.
const metalWorldProjects = [
  {
    name: 'Metal World Operations Management System',
    summary:
      'Internal system for tracking Metal World\'s client contracts from sale to installation. It manages 170+ contracts across 15 factories and 7 showrooms.',
    points: [],
    stack: ['React', 'TanStack Start', 'TanStack Query', 'Supabase', 'Tailwind CSS', 'Recharts'],
    image: metalworldOms,
    imageAlt: 'Operations dashboard of the Metal World OMS in Arabic, with all figures and names blurred',
    caption: 'Dashboard, with all figures, client names and dates blurred.',
  },
  {
    name: 'Metal World e-commerce platform',
    summary:
      'Arabic and English product catalogue for Metal World: doors, windows, railings, facades, canopies, accessories and decor, with quote requests and consultation booking.',
    points: [
      'AI try-on: upload a photo of your space and see the selected product placed in it, generated with a Gemini image model.',
      '713 organic search clicks in its first four months.',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Gemini API', 'Tailwind CSS'],
    image: metalworldSite,
    imageAlt: 'Homepage of metalworld.co in English: Metal World, Elevating Your Prestige',
    link: 'https://www.metalworld.co/en',
    linkLabel: 'Visit metalworld.co',
  },
];

export const featuredProjects = SHOW_AL_RAJHI ? metalWorldProjects : [];

// Projects portfolio
export const projects = [
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
