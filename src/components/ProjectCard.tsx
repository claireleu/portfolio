'use client'

import Image from 'next/image'
import { ArrowUpRight, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export type Project = {
  name: string
  image: { src: string; width: number; height: number; alt: string; className: string; frameClassName?: string }
  description: string
  github?: string
}

function closeGently(dialog: HTMLDialogElement) {
  if (dialog.dataset.closing !== undefined) return
  dialog.dataset.closing = ''
  Promise.allSettled(dialog.getAnimations().map((a) => a.finished)).then(() => dialog.close())
}

type ProjectCardProps = { project: Project; className?: string; children: ReactNode }

export default function ProjectCard({ project: { name, image, description, github }, className = '', children }: ProjectCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" aria-haspopup="dialog" onClick={() => setOpen(true)} className={`cursor-pointer text-left ${className}`}>
        {children}
      </button>
      {open &&
        createPortal(
          <dialog
            ref={(el) => {
              if (el && !el.open) el.showModal()
            }}
            aria-label={name}
            onClose={() => setOpen(false)}
            onCancel={(e) => {
              e.preventDefault()
              closeGently(e.currentTarget)
            }}
            onClick={(e) => e.target === e.currentTarget && closeGently(e.currentTarget)}
            className="m-auto animate-card-in data-closing:animate-card-out motion-reduce:animate-none w-[558px] max-w-[calc(100vw-20px)] rounded-[8px] border border-[#e1e1e1] bg-background text-main-text shadow-[0px_7px_1px_0px_rgba(0,0,0,0.05)] backdrop:bg-transparent"
          >
            <div className="flex flex-col items-start gap-[19px] px-[45px] py-[40px] break-words">
              <div className="flex w-full max-w-[454px] items-start justify-between gap-[10px]">
                <h2 className="text-[18px] leading-[19px] font-medium">{name}</h2>
                <button
                  type="button"
                  aria-label="close"
                  onClick={(e) => {
                    const dialog = e.currentTarget.closest('dialog')
                    if (dialog) closeGently(dialog)
                  }}
                  className="shrink-0 cursor-pointer text-secondary-text opacity-50 transition-opacity hover:opacity-100"
                >
                  <X size={19} aria-hidden="true" />
                </button>
              </div>
              <div className={`relative w-full max-w-[466px] overflow-hidden ${image.frameClassName ?? 'aspect-[466/303]'}`}>
                <Image src={image.src} alt={image.alt} width={image.width} height={image.height} unoptimized className={image.className} />
              </div>
              <div className="flex w-full max-w-[454px] flex-col items-start gap-[15px] text-[15.86px]">
                <p>{description}</p>
                {github && (
                  <a href={github} target="_blank" rel="noreferrer" className="flex items-center gap-[3px] text-secondary-text">
                    <span className="underline decoration-from-font [text-underline-position:from-font]">view on github</span>
                    <ArrowUpRight size={13.2} aria-hidden="true" className="shrink-0" />
                  </a>
                )}
              </div>
            </div>
          </dialog>,
          document.body,
        )}
    </>
  )
}
