import TrainWindow from './train/TrainWindow'
import Weather from './Weather'

export default function Train() {
  return (
    <section className="flex w-full flex-col gap-[4px] text-[15.86px] font-normal break-words text-main-text">
      <TrainWindow className="aspect-[4/3] w-full sm:aspect-[1416/638]" />
      <div className="flex w-full flex-wrap items-center justify-between gap-x-[16px]">
        <Weather />
        <p>10:26:02 local time</p>
      </div>
    </section>
  )
}
