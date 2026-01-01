import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/home.jsx';
import Projects from './pages/projects.jsx';
import Creative from './pages/creative.jsx';
import Contact from './pages/contact.jsx';

function App() {
  return (
    <div className="relative min-h-screen">
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/creative" element={<Creative />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <div className="fixed top-0 h-screen left-0 w-[148px] z-20 bg-accent"></div>
        <div className="fixed top-0 h-screen right-0 w-[148px] z-20 bg-accent"></div>
      <Navbar />
   </div>

  )
}

export default App