import Ticket from '../components/tickets/Ticket.jsx';
import { projectsData } from "../lib/projectsData.js";
import { Link } from 'react-router-dom';
import ScrollTiles from '../components/ScrollTiles.jsx';

export default function () {
    return (
        <div className="flex w-full min-h-screen">
            <div className="w-[60px] bg-dark-grey flex-shrink-0 self-stretch">
                <ScrollTiles />
            </div>

            <div className="w-full min-h-screen text-white">
                <div className="flex flex-col items-center justify-start p-[30px] gap-10">
                    {projectsData.map((project, index) => (
                        <Link key={project.url} to={`/projects/${project.url}`}>
                            <Ticket key={index} {...project} />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="w-[60px] bg-dark-grey flex-shrink-0 self-stretch">
                <ScrollTiles />
            </div>
        </div>
    )
}