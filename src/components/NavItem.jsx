import { Link } from 'react-router-dom';
import swirl from "../assets/swirl.svg";
import underline from "../assets/underline.svg";

export default function NavItem({ to, label, active, onClick}) {
  const isActive = active === to;
  return (
    <li className="relative group">
      <Link
        to={to}
        className="relative z-20 p-[10px]"
        onClick={onClick}
      >
        {label}
      </Link>

      <div
        className={`
          ${isActive ? 'opacity-0' : 'absolute top-0 z-10 flex justify-center w-full opacity-0 scale-50 rotate-[-95deg] transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-[35px]'}
        `}
      >
        <img
          src={swirl}
          alt="swirl"
          className={`
            ${isActive ? 'opacity-0' : 'transition-transform duration-300 ease-out delay-100 group-hover:rotate-[95deg]'}
          `}
        />
      </div>
      <img 
            src={underline}
            alr="underline"
            className={`
                ${isActive ? 'absolute top-[22px] transform flex justify-center px-[7px] w-full h-auto object-' : ' px-[7px] opacity-0 absolute top-[22px] w-full flex justify-center'}
            `}
        />
    </li>
  );
}