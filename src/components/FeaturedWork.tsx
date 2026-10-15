'use client'

import { useId, useState } from 'react'

type Work = { name: string; description: string }
type Group = {
  title: string
  works: Work[]
}

const groups: Group[] = [
  {
    title: '01  design',
    works: [
      { name: 'hack the north', description: 'designing for Canada’s largest hackathon stage' },
      { name: 'summer hacks', description: 'branding and product design for an outdoor hackathon!' },
      { name: 'uw computer science club', description: 'overseeing all club graphics as graphic design lead' },
    ],
  },
  {
    title: '02  projects',
    works: [
      { name: 'fashionkilla', description: 'digital smart closet for outfit generation' },
      { name: 'rouvia', description: 'agentic voice navigation' },
      { name: 'the riffler', description: 'a self playing guitar' },
    ],
  },
]

export default function FeaturedWork() {
  return (
    <section className="flex w-full flex-col gap-[10px] pt-[20px] break-words">
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
            {works.map(({ name, description }) => (
              <li key={name} className="group flex flex-col">
                <p className="font-medium">
                  <span className="hover-highlight">{name}</span>
                </p>
                <p className="font-normal">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
