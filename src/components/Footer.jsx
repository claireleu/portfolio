import SocialLinks from './SocialLinks.jsx'

export default function Footer () {
    return (
        <div className="w-full flex flex-col gap-[10px] px-[70px] py-[7px] font-inconsolata text-light-grey">
            <div className="w-full h-[2px] bg-accent rounded-full"></div>
            <div className="flex items-center justify-between leading-[0.9]">
                <span>© 2026 made by Claire Liu</span>
                <SocialLinks className="text-light-grey"/>
            </div>
        </div>
    )
}