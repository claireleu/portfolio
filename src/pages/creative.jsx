import { useState } from 'react'
import DesignCard from '../components/DesignCard.jsx'
import { creativeData } from '../lib/creativeData.js'
import Masonry from 'react-masonry-css'

export default function Creative() {
  const [activeCategory, setActiveCategory] = useState(null);
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
    <div className="w-full min-h-screen text-off-white px-[10.28vw] pb-[100px]">
      <div className="flex gap-4 mb-12 justify-center">
        {["graphic", "product", "illustration"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full font-medium ${
              activeCategory === cat ? "bg-off-white text-dark-grey" : "bg-accent text-off-white"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
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