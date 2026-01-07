import { useEffect, useRef, useState } from 'react';
import "./Notebook.css"
import SocialLinks from './SocialLinks.jsx'
import notebookArt from '../assets/notebook-art.svg'
import notebookSpiral from '../assets/notebook-spiral.svg'

export default function Notebook () {
    const notebookRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            if (!notebookRef.current) return;

            const rect = notebookRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const notebookCenter = rect.top + rect.height / 2;
            const viewportCenter = viewportHeight / 2;
            
            // Calculate distance from viewport center
            const distanceFromCenter = Math.abs(notebookCenter - viewportCenter);
            const maxDistance = viewportHeight * 0.4; // Start scaling when within 40% of viewport height from center
            
            if (distanceFromCenter < maxDistance) {
                // Scale from 1 to 1.1 as it approaches center
                const scaleValue = 1 + (0.1 * (1 - distanceFromCenter / maxDistance));
                setScale(scaleValue);
            } else {
                setScale(1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial position

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div 
            ref={notebookRef}
            className="notebook-wrapper"
            style={{
                transform: `scale(${scale})`,
                transition: 'transform 0.3s ease-out',
                transformOrigin: 'center center'
            }}
        >
            <div className="bottom-page"></div>
            <div className="middle-page"></div>
            <div className="top-page flex justify-center items-start">
                <div className="flex flex-col gap-[30px] justify-center">
                    <p className="text-left w-full max-w-[370px] text-dark-grey font-effra font-light">
                        I'm a CS student @ University of Waterloo.<br />
                        I'm interested in using creativity in technology to create experiences that people can connect with.<br />
                        <br />
                        Outside of work you can find me rockclimbing, drawing, and watering my plants.<br />
                        <br />
                        I am currently seeking Summer 2026 Software Development roles.
                    </p>
                    <SocialLinks className="text-accent"/>
                </div>
                <img src={notebookArt} alt="notebook-art" className="notebook-art"/>
            </div>
            <img src={notebookSpiral} alt="notebook-spiral" className="spiral"/>
        </div>
    )
}
