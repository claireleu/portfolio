import { useState } from 'react';
import NavItem from './NavItem';

export default function Navbar () {
    const [active, setActive] = useState('/');
    const items = [
    { to: '/', label: 'home' },
    { to: '/projects', label: 'projects' },
    { to: '/creative', label: 'creative' },
    { to: '/contact', label: 'contact' },
    ];
    return (
    <nav className="absolute top-0 w-full z-30">
      <div className="flex justify-center mt-[6.5rem] mx-[148px]">
        <ul className="flex gap-[5px] font-inconsolata text-[20px]">
          {items.map(item => (
            <NavItem key={item.to} {...item} active={active} onClick={() => setActive(item.to)}/>
          ))}
        </ul>
      </div>
    </nav>
  );
}
