import ProjectDescription from "../components/ProjectDescription.jsx";
import ScrollTiles from '../components/ScrollTiles.jsx';

export default function () {
    return (
        <div className="relative flex w-full">
            <div className="w-[60px] bg-dark-grey flex-shrink-0 self-stretch">
                 <ScrollTiles />
            </div>
            <div className="w-full text-white flex justify-center">
                <ProjectDescription />
            </div>
            <div className="w-[60px] bg-dark-grey flex-shrink-0 self-stretch">
                <ScrollTiles />
            </div>
        </div>
    )
}