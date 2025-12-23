import { BrowserRouter } from 'react-router-dom';

import {
  About,
  Contact,
  Education,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Publications,
  Skills,
  Languages,
  Tech,
  Works,
  StarsCanvas,
  // CV,
} from './components';

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Education />
        {/* <CV /> */}
        <Publications />
        <Experience />
        <Works />
        <Skills />
        <Languages />

        <div className="relative z-0">
          <Contact />

          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
