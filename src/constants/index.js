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
  { id: 'work', title: 'Work' },
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

// Work experiences
export const experiences = [
  {
    title: 'Mobile Application Tester',
    company_name: 'Mugla Sitki Kocman University',
    icon: mobile, // reusing the mobile icon (update if you have a dedicated one)
    iconBg: '#E6DEDD',
    date: 'Jul 2021 - Aug 2021',
    points: [
      'Tested diverse Android applications using the Appium environment.',
      'Conducted performance evaluations by comparing real devices with emulators.',
    ],
  },
  {
    title: 'Mobile Application Developer',
    company_name: 'Mugla Sitki Kocman University',
    icon: mobile,
    iconBg: '#383E56',
    date: 'Aug 2022 - Sep 2022',
    points: [
      'Developed a full-stack E-Commerce mobile application using Flutter (front-end) and Node.js (back-end).',
      'Participated in all development phases to ensure a high-quality final product.',
    ],
  },
  {
    title: 'Web Developer',
    company_name: 'Kyber Tech',
    icon: web,
    iconBg: '#E6DEDD',
    date: 'Jan 2023 - Feb 2023',
    points: [
      'Built comprehensive full-stack websites using React.js and Next.js.',
      'Designed and implemented an engaging online platform for a marble company.',
      'Ensured optimal user experience through responsive design and performance optimizations.',
    ],
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
      'A captivating portfolio website for WT-Capital, showcasing products, services, promotions, news, and events. Developed with Next.js and Sanity.io to provide a seamless user experience.',
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
      'A Python-based computer vision project using YOLO11 and OpenCV for real-time vehicle detection and counting on highways, ensuring accurate tracking in diverse conditions.',
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
      'A multi-camera object detection system employing a virtual context approach with YOLOv11. This project integrates multiple video feeds for real-time detection and tracking, showcasing advanced computer vision techniques and robust algorithm design.',
    tags: [
      { name: 'Computer Vision', color: 'blue-text-gradient' },
      { name: 'YOLO11', color: 'green-text-gradient' },
      { name: 'OpenCV', color: 'pink-text-gradient' },
    ],
    image: multicam, // Ensure the 'multicam' asset is added
    source_code_link: 'https://github.com/waelkabouk/virtual-context-multi-camera-tracking ',
  },
  {
    name: 'Meezah Marketing Services Website',
    description:
      'A comprehensive marketing services website for Meezah (ميزة لخدمات التسويق) showcasing services, projects, and company information. Built with Next.js and PostgreSQL for a modern, performant web experience with robust data management.',
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
