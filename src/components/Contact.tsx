const links = [
  { label: 'email', href: 'mailto:claireliu6829@gmail.com' },
  { label: 'linkedin', href: 'https://linkedin.com/in/claireleu' },
  { label: 'github', href: 'https://github.com/claireleu' },
]

export default function Contact() {
  return (
    <nav aria-label="Contact" className="flex w-full flex-wrap items-center gap-[12px] text-[15.86px] py-[20px]">
      {links.map(({ label, href }) => {
        const external = href.startsWith('http')
        return (
          <a
            key={label}
            href={href}
            {...(external && { target: '_blank', rel: 'noreferrer' })}
            className="underline-line [background-position-y:calc(100%-1.33px)]"
          >
            {label}
          </a>
        )
      })}
    </nav>
  )
}
