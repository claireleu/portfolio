import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BackButton({ path }: { path: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex w-fit items-center text-[15.86px] text-secondary-text">
      <Link href="/" className="group flex items-center gap-[3px] font-medium">
        <ArrowLeft size={17} aria-hidden="true" className="shrink-0" />
        <span className="inline-grid">
          <span className="col-start-1 row-start-1 group-hover:font-semibold">home</span>
          <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-semibold">
            home
          </span>
        </span>
      </Link>
      <span aria-current="page" className="whitespace-pre"> / {path}</span>
    </nav>
  )
}
