import SocialLinks from './SocialLinks.jsx'

export default function Footer () {
    return (
        <div className="w-full flex flex-col gap-[10px] px-[70px] py-[7px] font-effra font-light text-light-grey">
            <div className="w-full h-[1px] bg-light-grey rounded-full"></div>
            <div className="flex items-center justify-between leading-[0.9]">
                <span>Made byClaire Liu © 2026</span>
                <SocialLinks className="text-light-grey"/>
            </div>
        </div>
    )
}
