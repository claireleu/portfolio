'use client'

import Link from 'next/link'
import { useId, useState } from 'react'
import ProjectCard, { type Project } from './ProjectCard'

type Work = { name: string; description: string; href?: string; project?: Project }
type Group = {
  title: string
  works: Work[]
}

const groups: Group[] = [
  {
    title: '01  design',
    works: [
      {
        name: 'hack the north',
        description: 'designing for canada’s largest hackathon stage',
        href: '/hack-the-north',
      },
      {
        name: 'summer hacks',
        description: 'branding and product design for an outdoor hackathon',
        href: '/summer-hacks',
      },
    ],
  },
  {
    title: '02  projects',
    works: [
      {
        name: 'fashionkilla',
        description: 'digital smart closet for outfit generation',
        project: {
          name: 'fashionkilla',
          image: {
            src: '/projects/project-fashionkilla.webp',
            width: 1260,
            height: 819,
            alt: 'fashionkilla app home screen',
            className: 'size-full object-cover',
          },
          description:
            'digital closet app using a vector database to provide accurate and personalised outfit recomendations. mlh best use of mongodb and mlh best ui/ux at technova 5.',
          github: 'https://github.com/claireleu/Fashionkilla',
        },
      },
      {
        name: 'rouvia',
        description: 'agentic voice navigation',
        project: {
          name: 'rouvia',
          image: {
            src: '/projects/project-rouvia.webp',
            width: 1520,
            height: 820,
            alt: 'rouvia route planning map',
            className: 'size-full object-cover object-left',
          },
          description:
            'a voice-based navigation app that processes natural language into intelligent route planning. built for hack the north 2025',
          github: 'https://github.com/archangelinux/rouvia',
        },
      },
      {
        name: 'the riffler',
        description: 'a self playing guitar',
        project: {
          name: 'riffler',
          image: {
            src: '/projects/project-riffler.webp',
            width: 1698,
            height: 1266,
            alt: 'guitar wired to an arduino and servomotors',
            className: 'absolute top-[-39.604%] left-1/2 h-auto w-[132.618%] max-w-none -translate-x-1/2',
          },
          description:
            'a self playing guitar that reads and parses guitar pro (.gp5) sheet music. made with an arduino, and servomotors. finalist at hack canada 2025.',
        },
      },
      {
        name: 'duoslango',
        description: 'ai generated duolingo style slang lessons',
        project: {
          name: 'duoslango',
          image: {
            src: '/projects/project-duoslango.webp',
            width: 2810,
            height: 1374,
            alt: 'duoslango fill in the blank lesson',
            className: 'absolute top-1/2 left-[0.198%] h-auto w-[98.745%] -translate-y-1/2',
            frameClassName: 'aspect-[466/225]',
          },
          description:
            'and simple web app that teaches users slang with dynamically generated duolingo style lessons. built with flask, gemini api, react, and tailwind css.',
          github: 'https://github.com/claireleu/Duoslango',
        },
      },
    ],
  },
]

export default function FeaturedWork() {
  return (
    <section className="flex w-full flex-col gap-[10px] break-words">
      <h2 className="text-[18px] font-medium">featured work</h2>
      {groups.map((group) => (
        <WorkGroup key={group.title} {...group} />
      ))}
    </section>
  )
}

function WorkGroup({ title, works }: Group) {
  const [open, setOpen] = useState(true)
  const listId = useId()

  return (
    <div className="flex w-full flex-col">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className="flex h-[37px] w-full cursor-pointer items-center justify-between rounded-[5px] py-[7px] pr-[15px] text-left"
      >
        <span className="w-[100px] text-[18px] font-medium whitespace-pre text-main-text">
          <span className="underline-line pb-[1px]">{title}</span>
        </span>
      </button>
      <div
        id={listId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="flex flex-col gap-[10px] pt-[10px] text-[15.86px] text-main-text">
            {works.map(({ name, description, href, project }) => {
              const label = (
                <span className={project ? 'group-hover:font-semibold group-focus-visible:font-semibold' : 'hover-highlight'}>{name}</span>
              )
              return (
                <li key={name} className="flex flex-col">
                  <p className="font-medium">
                    {href ? (
                      <Link href={href} className="group">
                        {label}
                      </Link>
                    ) : project ? (
                      <ProjectCard project={project} className="group">
                        {label}
                      </ProjectCard>
                    ) : (
                      <span className="group">{label}</span>
                    )}
                  </p>
                  <p className="font-normal">{description}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
