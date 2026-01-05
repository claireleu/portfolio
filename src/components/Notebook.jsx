import "./Notebook.css"
import SocialLinks from './SocialLinks.jsx'
import notebookArt from '../assets/notebook-art.svg'
import notebookSpiral from '../assets/notebook-spiral.svg'

export default function Notebook () {
    return (
        <div className="notebook-wrapper">
            <div className="bottom-page"></div>
            <div className="middle-page"></div>
            <div className="top-page flex justify-center items-start">
                <div className="flex flex-col gap-[30px] justify-center">
                    <p className="text-left w-full max-w-[370px] text-accent font-inconsolata">
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
