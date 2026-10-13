import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';

export default function Navbar () {
    const location = useLocation();
    const items = [
    { to: '/', label: 'home' },
    { to: '/projects', label: 'projects' },
    { to: '/creative', label: 'creative' },
    ];
    return (
    <nav className="absolute top-0 w-full z-30">
      <div className="flex justify-center mt-[6.5rem] mx-[148px]">
        <ul className="flex gap-[5px] font-inconsolata text-[20px]">
          {items.map(item => {
            console.log(location.pathname);
            return <NavItem key={item.to} {...item} active={location.pathname === item.to} />;
          })}
        </ul>
      </div>
    </nav>
  );
}
