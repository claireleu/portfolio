import postcardframe from '../assets/postcardframe.svg';
import fishcat from '../assets/fishcat.svg';
import homepostcard from '../assets/homepostcard.svg';

export default function Postcard () {
    return (
        <div className="relative w-full flex flex-col items-center py-[120px]">
            <div className="absolute top-0 w-full flex justify-start px-[290px]">
                <img src={fishcat} alrt="fishcat" />
            </div>
            <div className="relative w-[921px] bg-transparent">
                <div className="w-full h-auto object-cover bg-transparent">
                    <img 
                        src={postcardframe} 
                        alt="Postcard" 
                    />
                </div>
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-[32px] px-[72px] py-[72px]">
                    <p className="text-left w-[462px] text-accent font-inconsolata">
                    I'm a CS student @ University of Waterloo.<br />
                    I'm interested in using creativity in technology to create experiences that people can connect with.<br />
                    I'm currently furthering my passion for design, as well as learning more about fullstack development and machine learning.<br />
                    <br />
                    Outside of work you can find me rockclimbing, drawing, and watering my plants.<br />
                    <br />
                    I am currently seeking Summer 2026 Software Development roles.
                    </p>
                    <img
                    src={homepostcard}
                    alt="Home Postcard"
                    className="w-[235px]"
                    />
                </div>
            </div>
        </div>
    )
}