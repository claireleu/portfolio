import { Link } from 'react-router-dom';

export default function Navbar () {
    return (
        <nav className="absolute top-0 w-full z-30">
            <div className="flex justify-center mt-[6.5rem] mx-[148px] bg-transparent">
                <ul className="flex gap-8 font-inconsolata text-[20px]">
                    <li><Link to="/">home</Link></li>
                    <li><Link to="/projects">projects</Link></li>
                    <li><Link to="/creative">creative</Link></li>
                    <li><Link to="/contact">contact</Link></li>
                </ul>
            </div>
        </nav>
    )
}
