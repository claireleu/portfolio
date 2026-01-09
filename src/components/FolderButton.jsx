import "./FolderButton.css"
import top from '../assets/folder-top.svg'
import bottom from '../assets/folder-bottom.svg'
import page from '../assets/folder-page.svg'

export default function FolderButton({ active }) {
  return (
    <div className="relative inline-block group cursor-pointer w-[85px] md:w-[100px] lg:w-[120px] aspect-[97.38/76.57] flex-shrink-0">
      <img src={bottom} alt="file-button-bottom" className="block w-full" />
      <img src={page} alt="file-button-page" className={`absolute z-20 left-0 w-full
                                                    transition-all duration-300 ease-out
                                                    group-hover:top-[-25%]
                                                    ${active ? 'top-[-25%]' : 'top-[0%]'}`}
      />
      <img src={top} alt="folder-button-top" className="folder-button-top w-full absolute top-0 left-[2%] z-30" />
    </div>
  )
}
