import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/home.jsx';
import Projects from './pages/projects.jsx';
import ProjectPage from './pages/projectPage.jsx';
import Creative from './pages/creative.jsx';

function App() {
  return (
    <div className="relative min-h-screen flex flex-col items-center">
        <div className="relative z-20 pt-[150px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:project" element={<ProjectPage />} />
            <Route path="/creative" element={<Creative />} />
          </Routes>
        </div>
        <div className="fixed top-0 h-screen left-0 w-[10.27vw] z-10 bg-accent"></div>
        <div className="fixed top-0 h-screen right-0 w-[10.27vw] z-10 bg-accent"></div>
      <Navbar />
      <div className="w-full mt-auto">
        <Footer />
      </div>
   </div>

  )
}

export default App