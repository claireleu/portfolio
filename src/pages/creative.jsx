import { useState } from 'react';
import DesignCard from '../components/DesignCard.jsx';
import trophies from '../assets/design/trophies.svg';
import chwebsite from '../assets/design/chwebsite.svg';
import chstickers from '../assets/design/chstickers.svg';
import chshirts from '../assets/design/chshirts.svg';
import chbadges from '../assets/design/chbadges.svg';
import cscinstagram1 from '../assets/design/cscinstagram1.svg';
import cscinstagram2 from '../assets/design/cscinstagram2.svg';
import cscinstagram3 from '../assets/design/cscinstagram3.svg';

export default function Creative() {
  const [activeCategory, setActiveCategory] = useState(null);

  const designData = {
    graphic: [
      { imageSrc: cscinstagram1, purpose: "UW Computer Science Club" },
      { imageSrc: cscinstagram2, purpose: "UW Computer Science Club" },
      { imageSrc: cscinstagram3, purpose: "UW Computer Science Club" },
    ],
    product: [
      { imageSrc: trophies, purpose: "Chess Hacks", description: "Glass Trophies", tools: ["Blender"] },
      { imageSrc: chwebsite, purpose: "Chess Hacks", description: "Website", tools: ["Figma"] },
      { imageSrc: chstickers, purpose: "Chess Hacks", description: "Stickers", tools: ["Figma", "Procreate"] },
      { imageSrc: chshirts, purpose: "Chess Hacks", description: "Hacker Shirts", tools: ["Figma", "Procreate"] },
      { imageSrc: chbadges, purpose: "Chess Hacks", description: "Hacker Badges", tools: ["Figma"] },
    ],
    illustration: [],
  };

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

      {/* Cards */}
      {activeCategory && (
        <div className="max-w-[810px] mx-auto grid grid-cols-2 gap-x-[90px] gap-y-[60px]">
          {designData[activeCategory].map((item, idx) => (
            <DesignCard key={idx} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}