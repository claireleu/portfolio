import homeLogo from '../assets/homelogo.svg';
import Notebook from '../components/Notebook.jsx';

export default function () {
    return (
        <>
        <div className="w-full text-white px-[14px]">
            <div className="flex flex-col items-center w-full p-[80px] gap-[40px]">
                <img src={homeLogo} alt="home logo" className="w-[130px] h-full object-cover" />
                <h1 className="text-3xl font-crimson">Hi, I'm Claire Liu</h1>
            </div>
        </div>
        <div className="flex justify-center width-[100px] pb-[120px]">
            <Notebook />
        </div>
        </>
    )
}