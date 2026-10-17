import TrainWindow from './train/TrainWindow'
import LocationDescription from './LocationDescription'

export default function Train() {
  return (
    <section className="flex w-full flex-col gap-[4px] text-[15.86px] font-normal break-words text-main-text">
      <TrainWindow className="aspect-[4/3] w-full sm:aspect-[1416/638]" />
      <LocationDescription />
    </section>
  )
}
