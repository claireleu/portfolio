import About from '../components/About'
import Contact from '../components/Contact'
import Experience from '../components/Experience'
import FeaturedWork from '../components/FeaturedWork'
import Footer from '../components/Footer'
import Train from '../components/Train'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <main className="flex w-full max-w-[780px] flex-col items-start gap-[40px] px-[36px] pt-[40px] pb-[79px] sm:pt-[110px]">
        <About />
        <Train />
        <FeaturedWork />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
