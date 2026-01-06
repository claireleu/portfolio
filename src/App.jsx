import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/home.jsx';
import Projects from './pages/projects.jsx';
import ProjectPage from './pages/projectPage.jsx';
import Creative from './pages/creative.jsx';


function App() {
  return (
    <div className="min-h-screen flex">
      <div id="main-content" className="flex-1 relative z-10 flex flex-col items-center min-w-0">
        <Navbar />
        <div className="pt-[150px] w-full bg-dark-grey">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:project" element={<ProjectPage />} />
            <Route path="/creative" element={<Creative />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App