import { useState } from 'react'
import DesignCard from '../components/DesignCard.jsx'
import { creativeData } from '../lib/creativeData.js'

export default function Creative() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="w-full min-h-screen text-off-white px-[148px] pb-[100px]">
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
        <div className="max-w-[810px] mx-auto grid grid-cols-2 gap-x-[90px] gap-y-[60px]">
          {creativeData[activeCategory].map((item, idx) => (
            <DesignCard key={idx} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}