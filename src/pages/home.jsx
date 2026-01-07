import homeLogo from '../assets/homelogo.svg';
import Notebook from '../components/Notebook.jsx';
import ScrollTiles from '../components/ScrollTiles.jsx';

export default function Home() {
  return (
    <div className="flex w-full min-h-screen">
      <div className="w-[60px] bg-dark-grey flex-shrink-0 self-stretch">
         <ScrollTiles />
      </div>

      <div className="flex-1 flex flex-col items-center min-w-0 px-">
        <div className="w-full text-white px-[7px] sm:px-[14px] flex flex-col items-center">
          <div className="flex flex-col items-center w-full p-8 sm:p-12 md:p-[80px] gap-6 sm:gap-8 md:gap-[40px]">
            <img
              src={homeLogo}
              alt="home logo"
              className="w-[clamp(100px,30vw,130px)] min-w-[80px] h-auto object-contain"
            />
            <h1 className="text-3xl font-inconsolata text-center">Hi, I'm Claire!</h1>
          </div>
        </div>
        <div className="flex justify-center width-[100px] pb-[120px] w-full px-4 sm:px-6 md:px-8">
          <Notebook />
        </div>
      </div>

      <div className="w-[60px] bg-dark-grey flex-shrink-0 self-stretch">
         <ScrollTiles />
      </div>
    </div>
  );
}
