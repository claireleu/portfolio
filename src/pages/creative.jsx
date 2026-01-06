import { useState } from 'react'
import DesignCard from '../components/DesignCard.jsx'
import FolderButton from '../components/FolderButton.jsx'
import { creativeData } from '../lib/creativeData.js'
import Masonry from 'react-masonry-css'

export default function Creative() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const breakpointColumnsObj = {
    default: 3,
    900: 2,
    700: 1
  };
  const items = activeCategory 
    ? creativeData[activeCategory].map((item, idx) => (
        <DesignCard key={idx} {...item} />
      ))
    : null;

  return (
    <div className="w-full min-h-screen text-off-white px-[10.28vw] pt-[70px] pb-[100px]">
      <div className="flex gap-4 sm:gap-[2vw] md:gap-[3vw] mb-12 justify-center items-start w-full">
        {["graphic", "product", "illustration"].map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          onMouseEnter={() => setHoveredCategory(cat)}
          onMouseLeave={() => setHoveredCategory(null)}
          className="flex flex-col space-y-2 font-inconsolata items-center flex-shrink-0"
        >
          <FolderButton
            active={activeCategory === cat && hoveredCategory === null}
          />
          <div className="mr-[18%]">{cat.charAt(0).toUpperCase() + cat.slice(1)}</div>
        </button>
      ))}
      </div>

      {activeCategory && (
        <div className="flex justify-center">
          <div className="w-[60vw]">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex -ml-4 md:-ml-6 w-auto"
              columnClassName="pl-4 md:pl-6 bg-clip-padding"
            >
              {items}
            </Masonry>
          </div>
        </div>
      )}
    </div>
  );
}