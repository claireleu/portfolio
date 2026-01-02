import Ticket from '../components/tickets/Ticket.jsx';
import { projectsData } from "../lib/projectsData.js";
import { Link } from 'react-router-dom';

export default function () {
    return (
        <div className="w-full min-h-screen text-white pt-[8rem]">
            <div className="flex flex-col items-center justify-start py-42 px-[30px] gap-10">
                {projectsData.map((project, index) => (
                    <Link key={project.link} to={`/projects/${project.link}`}>
                        <Ticket key={index} {...project} />
                    </Link>
                ))}
            </div>
        </div>
    )
}