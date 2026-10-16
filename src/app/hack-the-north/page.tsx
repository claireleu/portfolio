import type { Metadata } from 'next'
import HackTheNorth from '../../components/HackTheNorth'

export const metadata: Metadata = {
  title: 'Hack the North · Claire Liu',
}

export default function HackTheNorthPage() {
  return (
    <div className="flex min-h-screen flex-col items-center overflow-x-clip">
      <HackTheNorth />
    </div>
  )
}
