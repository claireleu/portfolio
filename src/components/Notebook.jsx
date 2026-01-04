import "./Notebook.css"
import notebookArt from '../assets/notebook-art.svg'
import notebookSpiral from '../assets/notebook-spiral.svg'

export default function Notebook () {
    return (
        <div className="notebook-wrapper">
            <div className="bottom-page"></div>
            <div className="middle-page"></div>
            <div className="top-page flex justify-center">
                <p className="text-left w-[450px] text-accent font-inconsolata">
                    I'm a CS student @ University of Waterloo.<br />
                    I'm interested in using creativity in technology to create experiences that people can connect with.<br />
                    <br />
                    Outside of work you can find me rockclimbing, drawing, and watering my plants.<br />
                    <br />
                    I am currently seeking Summer 2026 Software Development roles.
                </p>
                <img src={notebookArt} alt="notebook-art" className="w-[300px]"/>
            </div>
            <img src={notebookSpiral} alt="notebook-spiral" className="spiral w-[690px]"/>
        </div>
    )
}
