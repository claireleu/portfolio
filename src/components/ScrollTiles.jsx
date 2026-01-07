import { useEffect, useState } from 'react';
import img1 from '../assets/tile1.webp';
import img2 from '../assets/tile2.webp';
import img3 from '../assets/tile3.webp';
import img4 from '../assets/tile4.webp';
import img5 from '../assets/tile5.webp';

const TILE_SIZE = 60;
const tiles = [img1, img2, img3, img4, img5];

export default function ScrollTiles() {
  const [scrollY, setScrollY] = useState(0);
  const [tileCount, setTileCount] = useState(0);

  useEffect(() => {
    const update = () => {
      setScrollY(window.scrollY);
      setTileCount(Math.ceil(window.innerHeight / TILE_SIZE) + tiles.length * 2);
    };

    update();
    window.addEventListener('scroll', update);
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const loopHeight = tiles.length * TILE_SIZE;
  const translateY = -(scrollY * 0.3 % loopHeight); // slower scroll on side

  return (
    <div className="fixed top-0 h-screen w-[60px] overflow-hidden pointer-events-none pt-[3px] z-0">
      <div
        className="flex flex-col will-change-transform gap-[3px]"
        style={{ transform: `translateY(${translateY}px)` }}
      >
        {Array.from({ length: tileCount }).map((_, i) => (
          <img
            key={i}
            src={tiles[i % tiles.length]}
            className="w-[60px] aspect-square"
            alt=""
          />
        ))}
      </div>
    </div>
  );
}
