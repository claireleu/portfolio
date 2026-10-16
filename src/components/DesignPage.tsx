import type { ReactNode } from 'react'
import BackButton from './BackButton'

type DesignPageProps = {
  path: string
  title: string
  description: ReactNode
  role: string
  timeline: string
  children: ReactNode
}

export const inlineLink = 'font-medium underline-line [background-position-y:calc(100%-2px)]'

export default function DesignPage({ path, title, description, role, timeline, children }: DesignPageProps) {
  return (
    <main className="flex w-full flex-col items-center gap-[140px] py-[91px]">
      <header className="flex w-full max-w-[708px] flex-col gap-[56px] px-[10px] break-words">
        <BackButton path={path} />
        <div className="flex flex-col gap-[15px]">
          <h1 className="text-[18px] leading-[19px] font-medium">{title}</h1>
          <p className="text-[15.86px]">{description}</p>
          <div className="flex w-full flex-col gap-y-[4px] text-[15.86px] min-[708px]:flex-row min-[708px]:justify-between">
            <p className="w-[225px] max-w-full">
              <span className="font-medium min-[708px]:block">role:</span> {role}
            </p>
            <p className="w-[225px] max-w-full">
              <span className="font-medium min-[708px]:block">timeline:</span> {timeline}
            </p>
          </div>
        </div>
      </header>

      <div className="flex w-full justify-center">{children}</div>
    </main>
  )
}
