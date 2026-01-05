import top from '../assets/folder-top.svg'
import bottom from '../assets/folder-bottom.svg'
import page from '../assets/folder-page.svg'

export default function FolderButton({ active }) {
  return (
    <div className="relative inline-block group cursor-pointer sm:w-[12vw] md:w-[10vw] lg:w-[7vw] aspect-[97.38/76.57]">
      <img src={bottom} alt="file-button-bottom" className="block w-full" />
      <img src={page} alt="file-button-page" className={`absolute z-20 left-0
                                                    transition-all duration-300 ease-out
                                                    group-hover:top-[-40%]
                                                    ${active ? 'top-[-40%]' : 'top-[-10%]'}`}
      />
      <img src={top} alt="folder-button-top" className="absolute top-[4%] left-[2%] z-30" />
    </div>
  )
}
