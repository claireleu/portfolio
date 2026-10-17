import Image from 'next/image'
import Collage, { frame, photoShadow, type CollagePiece } from './Collage'
import DesignPage, { inlineLink } from './DesignPage'

const dir = '/design/hack-the-north'

const pins = [
  { src: 'htn-pin-1.webp', width: 755, height: 526, className: 'h-[76.46px] w-[110.71px]' },
  { src: 'htn-pin-2.webp', width: 849, height: 729, className: 'h-[98.33px] w-[114.49px]' },
  { src: 'htn-pin-3.webp', width: 657, height: 725, className: 'h-[101.51px] w-[92.44px]' },
  { src: 'htn-pin-4.webp', width: 865, height: 614, className: 'h-[80.2px] w-[113px]' },
]

const pieces: CollagePiece[] = [
  {
    key: 'teaser-site',
    tilt: -1,
    desktop: [34, 6, 332.91, 233.4, -3, 0],
    mobile: [29, 0, 332.91, 233.4, -3, 0],
    content: (
      <div className={frame}>
        <Image
          src={`${dir}/htn-teaser-site.webp`}
          alt="hack the north 2026 teaser site"
          width={1404}
          height={912}
          unoptimized
          loading="eager"
          className={`h-[194.84px] w-[300px] rounded-[2px] object-cover ${photoShadow}`}
        />
      </div>
    ),
  },
  {
    key: 't-shirt',
    tilt: 2,
    desktop: [25, 347.75, 281.39, 375.8, 0, 1],
    mobile: [83, 611, 261, 348.58, 0, 1],
    content: (
      <div className={frame}>
        <Image
          src={`${dir}/htn-t-shirt.webp`}
          alt="hack the north 2026 t-shirt"
          width={1103}
          height={1497}
          unoptimized
          loading="eager"
          className="h-[332.76px] w-[245.18px] object-cover min-[708px]:h-[358.75px] min-[708px]:w-[264.33px]"
        />
      </div>
    ),
  },
  {
    key: 'pins',
    tilt: 2,
    desktop: [166, 760.09, 448.72, 131.27, -2, 2],
    mobile: [232, 1194, 141.66, 375.06, 2, 4],
    content: (
      <div className={`flex flex-col items-center justify-center min-[708px]:flex-row ${frame}`}>
        {pins.map(({ src, width, height, className }, i) => (
          <Image
            key={src}
            src={`${dir}/${src}`}
            alt={`goose games enamel pin ${i + 1}`}
            width={width}
            height={height}
            unoptimized
            className={className}
          />
        ))}
      </div>
    ),
  },
  {
    key: 'swag-bag',
    tilt: -2,
    desktop: [367, 150.97, 287.32, 281.54, 2, 3],
    mobile: [62, 285, 287.32, 281.54, 2, 2],
    content: (
      <div className={frame}>
        <Image
          src={`${dir}/htn-swag-bag.webp`}
          alt="hack the north swag bag"
          width={1338}
          height={1310}
          unoptimized
          loading="eager"
          className={`h-[250px] w-[256px] object-cover ${photoShadow}`}
        />
      </div>
    ),
  },
  {
    key: 'laptop-case',
    tilt: 2,
    desktop: [313, 422.86, 350.17, 294.5, -4, 4],
    mobile: [32, 937, 350.17, 294.5, -4, 3],
    content: (
      <div className={frame}>
        <Image
          src={`${dir}/htn-laptop-case.webp`}
          alt="goose games laptop case"
          width={1358}
          height={1099}
          unoptimized
          loading="eager"
          className="h-[250px] w-[310px] object-cover"
        />
      </div>
    ),
  },
  {
    key: 'realm-1',
    tilt: -2,
    desktop: [342, 8, 172.55, 124.08, 0, 5],
    mobile: [41, 526, 172.55, 124.08, 0, 5],
    content: (
      <Image
        src={`${dir}/htn-realm-1.webp`}
        alt="website realm icon 1"
        width={1216}
        height={1224}
        unoptimized
        loading="eager"
        className="h-[124.08px] w-[172.55px] object-cover object-top"
      />
    ),
  },
  {
    key: 'realm-2',
    tilt: 2,
    desktop: [491, 669.96, 165.19, 108.59, 0, 6],
    mobile: [54, 1210, 165.19, 108.59, 0, 8],
    content: (
      <Image
        src={`${dir}/htn-realm-2.webp`}
        alt="website realm icon 2"
        width={1247}
        height={1136}
        unoptimized
        className="h-[108.59px] w-[165.19px] object-cover object-top"
      />
    ),
  },
  {
    key: 'realm-3',
    tilt: -2,
    desktop: [511, 0, 128.43, 152.04, 10, 7],
    mobile: [234, 485, 128.43, 152.04, 10, 10],
    content: (
      <Image
        src={`${dir}/htn-realm-3.webp`}
        alt="website realm icon 3"
        width={750}
        height={1286}
        unoptimized
        loading="eager"
        className="h-[135.6px] w-[106.5px] object-cover object-top"
      />
    ),
  },
  {
    key: 'realm-4',
    tilt: 2,
    desktop: [209, 203.54, 203.58, 186.27, 15, 8],
    mobile: [206, 162, 203.58, 186.27, 15, 6],
    content: (
      <Image
        src={`${dir}/htn-realm-4.webp`}
        alt="website realm icon 4"
        width={1259}
        height={1289}
        unoptimized
        loading="eager"
        className="h-[146.92px] w-[171.39px] object-cover object-top"
      />
    ),
  },
  {
    key: 'sticker',
    tilt: 2,
    desktop: [14, 704.51, 160.87, 205.04, -11, 9],
    mobile: [91, 1339, 128.12, 183.98, 0, 9],
    content: (
      <Image
        src={`${dir}/htn-dream-build-and-build-sticker.webp`}
        alt="dream big and build slogan sticker"
        width={830}
        height={1191}
        unoptimized
        className="h-[183.98px] w-[128.12px]"
      />
    ),
  },
  {
    key: 'teaser-site-board',
    tilt: 2,
    desktop: [0, 157, 214.12, 164.44, -2, 10],
    mobile: [0, 151, 214.12, 164.44, -2, 7],
    content: (
      <Image
        src={`${dir}/htn-teaser-site-board.webp`}
        alt="teaser site sound board illustration"
        width={1724}
        height={1299}
        unoptimized
        loading="eager"
        className="h-[157.25px] w-[208.76px]"
      />
    ),
  },
]

export default function HackTheNorth() {
  return (
    <DesignPage
      path="design"
      title="designing at canada’s largest hackathon"
      role="graphic design organiser"
      timeline="feb 2026 - present"
      description={
        <>
          this past year i worked on graphic design for{' '}
          <a href="https://hackthenorth.com" target="_blank" rel="noreferrer" className={inlineLink}>
            hack the north
          </a>
          . every year hack the north sets out on creating new branding and theme. this year, 2026, was an
          exploration of nature, adventure, and our retro tech roots. i had so much fun, and learned a lot throughout this process about
          designing within a system, creating within constraints, and designing for different mediums. below is some of my work from the past 8 months :)
        </>
      }
    >
      <Collage pieces={pieces} mobile={[409.6, 1569.06]} desktop={[663.2, 909.55]} className="min-[904px]:[zoom:1.3314]" />
    </DesignPage>
  )
}
