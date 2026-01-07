import ProjectDescription from "../components/ProjectDescription.jsx";
import ScrollTiles from '../components/ScrollTiles.jsx';

export default function () {
    return (
        <div className="flex w-full min-h-screen">
            <div className="w-[60px] bg-dark-grey flex-shrink-0 self-stretch relative z-0">
                 <ScrollTiles />
            </div>
            <div className="flex-1 flex flex-col items-center min-w-0 relative z-10">
                <ProjectDescription />
            </div>
            <div className="w-[60px] bg-dark-grey flex-shrink-0 self-stretch relative z-0">
                 <ScrollTiles />
            </div>
        </div>
    )
}