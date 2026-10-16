import Image from 'next/image'

type Job = {
  company: string
  href: string
  role: string
  points: string[]
  logo: string
}

const jobs: Job[] = [
  {
    company: 'shopify',
    href: 'https://www.shopify.com/ca',
    role: 'software engineering intern',
    points: [
      'built typescript client side apis for sidekick interactions with shopify admin ui components, from search bars to index tables.',
      'improved sidekick nested and paginated filter resolution using graphql and elasticsearch.',
    ],
    logo: '/experience/shopify.webp',
  },
  {
    company: 'ontario ministry of transportation',
    href: 'https://www.ontario.ca/page/ministry-transportation',
    role: 'junior tech analyst',
    points: [
      'automated integration testing for driver’s licence systems using python, ssh, selenium, and oracle.',
      'built C# .NET desktop tools for validating driver’s licence records against xml schemas.',
      'implemented application monitoring and log analysis using azure application insights and log4j.',
    ],
    logo: '/experience/mto.webp',
  },
  {
    company: 'uw data science club',
    href: 'https://www.uwdatascience.ca/',
    role: 'software developer',
    points: ['developed club website landing page with three.js'],
    logo: '/experience/uwdsc.webp',
  },
]

export default function Experience() {
  return (
    <section className="flex w-full flex-col gap-[22px] break-words">
      <h2 className="text-[18px] font-medium">experience</h2>
      <ul className="flex w-full flex-col gap-[25px]">
        {jobs.map(({ company, href, role, points, logo }) => (
          <li key={company} className="flex w-full flex-col items-start gap-[8px] sm:flex-row sm:gap-[13px]">
            <Image src={logo} alt="" width={30} height={30} className="size-[30px] shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col text-[15.86px]">
              <h3 className="font-medium">
                <a href={href} target="_blank" rel="noreferrer">
                  {company}
                </a>
              </h3>
              <p>{role}</p>
              <ul className="list-disc text-[15.86px] opacity-59">
                {points.map((point) => (
                  <li key={point} className="ms-[21px]">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
