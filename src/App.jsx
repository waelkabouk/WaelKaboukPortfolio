import { BrowserRouter } from 'react-router-dom';

import {
  About,
  Contact,
  Education,
  Experience,
  Hero,
  Navbar,
  Publications,
  Skills,
  Languages,
  Works,
  StarsCanvas,
  // CV,
} from './components';

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary text-white">
        <Navbar />
        <main>
          <Hero />
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
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
