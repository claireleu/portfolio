import type { Metadata } from 'next'
import SummerHacks from '../../components/SummerHacks'

export const metadata: Metadata = {
  title: 'Summer Hacks · Claire Liu',
}

export default function SummerHacksPage() {
  return (
    <div className="flex min-h-screen flex-col items-center overflow-x-clip">
      <SummerHacks />
    </div>
  )
}
