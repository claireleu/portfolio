import { Link } from 'react-router-dom';

export default function Navbar () {
    return (
        <nav className="absolute top-0 w-full z-30">
            <div className="flex justify-center mt-[6.5rem] mx-[148px] bg-transparent">
                <ul className="flex gap-14 font-inconsolata">
                    <li><Link to="/" className="hover:font-semibold">home</Link></li>
                    <li><Link to="/projects" className="hover:font-semibold">projects</Link></li>
                    <li><Link to="/creative" className="hover:font-semibold">creative</Link></li>
                    <li><Link to="/contact" className="hover:font-semibold">contact</Link></li>
                </ul>
            </div>
        </nav>
    )
}
