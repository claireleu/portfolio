import Image from 'next/image'

type Job = {
  company: string
  href: string
  role: string
  dates: string
  description: string
  logo: string
}

const jobs: Job[] = [
  {
    company: 'shopify',
    href: 'https://www.shopify.com/ca',
    role: 'software engineering intern',
    dates: 'may 2026 - aug 2026',
    description:
      'built typescript client side apis for sidekick interactions with shopify admin ui components. improved sidekick nested and paginated filter resolution using graphql and elasticsearch.',
    logo: '/experience/shopify.webp',
  },
  {
    company: 'ontario ministry of transportation',
    href: 'https://www.ontario.ca/page/ministry-transportation',
    role: 'junior tech analyst',
    dates: 'may 2025 - aug 2025',
    description:
      'automated integration testing for driver’s licence systems. built c#/.net tools to validate driver record files against xml schemas. implemented application monitoring and log analysis on azure devops.',
    logo: '/experience/mto.webp',
  },
  {
    company: 'uw data science club',
    href: 'https://www.uwdatascience.ca/',
    role: 'software developer',
    dates: 'sept 2025 - dec 2025',
    description: 'developed club website landing page with three.js',
    logo: '/experience/uwdsc.webp',
  },
]

export default function Experience() {
  return (
    <section className="flex w-full flex-col gap-[22px] break-words">
      <h2 className="text-[18px] font-medium">experience</h2>
      <ul className="flex w-full flex-col gap-[25px]">
        {jobs.map(({ company, href, role, dates, description, logo }) => (
          <li key={company} className="flex w-full flex-col items-start gap-[8px] sm:flex-row sm:gap-[13px]">
            <Image src={logo} alt="" width={30} height={30} className="size-[30px] shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col text-[15.86px]">
              <div className="flex w-full flex-wrap items-center justify-between gap-x-[10px]">
                <h3 className="font-medium">
                  <a href={href} target="_blank" rel="noreferrer">
                    {company}
                  </a>
                </h3>
                <p className="text-[14px] whitespace-nowrap text-secondary-text">{dates}</p>
              </div>
              <p>{role}</p>
              <p className="text-[14px] text-secondary-text">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
