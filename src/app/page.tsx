import About from '../components/About'
import Train from '../components/Train'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-[5px] py-[5px]">
      <main className="flex w-full max-w-[780px] flex-col items-start gap-[44px] px-[36px] pt-[40px] pb-[186px] sm:pt-[64px]">
        <div className="@container flex w-full flex-col gap-[44px] sm:max-h-[calc(100svh-93px)]">
          <About />
          <Train />
        </div>
      </main>
    </div>
  )
}
