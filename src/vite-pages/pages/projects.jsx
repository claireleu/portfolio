import Ticket from '../components/tickets/Ticket.jsx';
import { projectsData } from "../lib/projectsData.js";
import { Link } from 'react-router-dom';
import ScrollTiles from '../components/ScrollTiles.jsx';

export default function () {
    return (
        <div className="flex w-full min-h-screen">
            <div className="w-[60px] bg-dark-grey flex-shrink-0 self-stretch relative z-0">
                <ScrollTiles />
            </div>

            <div className="flex-1 flex flex-col items-center min-w-0 relative z-10">
                <div className="w-full flex flex-col items-center justify-start pt-[30px] px-6 sm:px-8 md:px-[40px] pb-[60px] gap-10 text-white">
                    {projectsData.map((project, index) => (
                        <Link key={project.url} to={`/projects/${project.url}`}>
                            <Ticket key={index} {...project} />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="w-[60px] bg-dark-grey flex-shrink-0 self-stretch relative z-0">
                <ScrollTiles />
            </div>
        </div>
    )
}