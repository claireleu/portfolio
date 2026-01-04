import homeLogo from '../assets/homelogo.svg';
import Notebook from '../components/Notebook.jsx';

export default function () {
    return (
        <>
        <div className="w-full text-white px-[14px] pt-[8.8rem] pb-[70px]">
            <div className="flex flex-col items-center w-full pt-[150px] gap-[72px]">
                <img src={homeLogo} alt="home logo" className="w-[166px] h-full object-cover" />
                <h1 className="text-4xl font-crimson">Hi, I'm Claire Liu</h1>
            </div>
        </div>
        <div className="flex justify-center width-[100px] pb-[100px]">
            <Notebook />
        </div>
        </>
    )
}