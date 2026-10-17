import Collage, { CollageImage, frame, type CollagePiece, type Size, type Spot } from './Collage'
import DesignPage, { inlineLink } from './DesignPage'

const dir = '/design/summer-hacks'

type Shot = {
  key: string
  alt: string
  width: number
  height: number
  desktop: Spot
  mobile: Spot
  desktopSize?: Size
  mobileSize?: Size
  framed?: boolean
  eager?: boolean
}

function shot({ key, alt, width, height, desktop, mobile, desktopSize, mobileSize, framed, eager }: Shot, tilt: number): CollagePiece {
  const image = (
    <CollageImage
      src={`${dir}/${key}.webp`}
      alt={alt}
      width={width}
      height={height}
      eager={eager}
      desktop={desktopSize ?? [desktop[2], desktop[3]]}
      mobile={mobileSize ?? [mobile[2], mobile[3]]}
    />
  )
  return { key, desktop, mobile, tilt, content: framed ? <div className={frame}>{image}</div> : image }
}

const sections: { key: string; desktop: Size; mobile: Size; shots: Shot[] }[] = [
  {
    key: 'v1',
    desktop: [745.274, 625.611],
    mobile: [334.116, 532.046],
    shots: [
      {
        key: 'sh-v1-lemon-cover',
        alt: 'summer hacks lemon cover concept',
        width: 1063,
        height: 1376,
        framed: true,
        eager: true,
        desktop: [381, 0, 269.926, 327.218, -6, 0],
        desktopSize: [218.873, 283.247],
        mobile: [117.13, 0, 194.701, 236.027, -6, 0],
        mobileSize: [157.876, 204.31],
      },
      {
        key: 'sh-v1-blueberry-cover',
        alt: 'summer hacks blueberry cover concept',
        width: 1063,
        height: 1376,
        framed: true,
        eager: true,
        desktop: [284, 309, 257.527, 316.611, 4, 1],
        desktopSize: [216.518, 280.199],
        mobile: [118.08, 303.67, 185.758, 228.376, 4, 1],
        mobileSize: [156.177, 202.112],
      },
      {
        key: 'sh-v1-orange-cover',
        alt: 'summer hacks orange cover concept',
        width: 1063,
        height: 1376,
        framed: true,
        eager: true,
        desktop: [0, 126, 242.412, 304.994, 1, 2],
        desktopSize: [216.593, 280.296],
        mobile: [13.23, 209.9, 174.855, 219.996, 1, 2],
        mobileSize: [156.231, 202.182],
      },
      {
        key: 'sh-v1-tent',
        alt: 'tent illustration',
        width: 1123,
        height: 555,
        eager: true,
        desktop: [79.94, 425, 203.868, 100.612, 0, 3],
        mobile: [31.97, 424.13, 147.053, 72.573, 0, 3],
      },
      {
        key: 'sh-v1-lemonade',
        alt: 'lemonade illustration',
        width: 810,
        height: 987,
        eager: true,
        desktop: [562.36, 195.08, 182.912, 199.677, 21, 4],
        desktopSize: [133.494, 162.639],
        mobile: [0, 91.61, 131.937, 144.03, 21, 4],
        mobileSize: [96.291, 117.314],
      },
      {
        key: 'sh-v1-map',
        alt: 'map illustration',
        width: 1269,
        height: 827,
        eager: true,
        desktop: [210.08, 182.08, 223.053, 205.464, -34, 5],
        desktopSize: [186.932, 121.747],
        mobile: [173.86, 204.13, 155.374, 125.186, -18, 5],
        mobileSize: [134.836, 87.818],
      },
      {
        key: 'sh-v1-marshmallow',
        alt: 'marshmallow skewer illustration',
        width: 635,
        height: 2044,
        eager: true,
        desktop: [530, 303, 77.045, 248, 0, 6],
        mobile: [276.33, 282, 57.784, 186, 0, 6],
      },
      {
        key: 'sh-v1-compass',
        alt: 'compass illustration',
        width: 951,
        height: 970,
        eager: true,
        desktop: [203.94, 76, 145.586, 148.601, 0, 7],
        mobile: [34.65, 7.93, 105.013, 107.188, 0, 7],
      },
    ],
  },
  {
    key: 'v2',
    desktop: [760.526, 638.469],
    mobile: [292, 791.74],
    shots: [
      {
        key: 'sh-v2-post-1',
        alt: 'summer hacks coming soon post',
        width: 1601,
        height: 2001,
        framed: true,
        desktop: [243.91, 30.95, 248.301, 294.758, 5, 0],
        desktopSize: [204.482, 255.587],
        mobile: [39.94, 0, 183.963, 218.382, 5, 0],
        mobileSize: [151.498, 189.361],
      },
      {
        key: 'sh-v2-post-3',
        alt: 'summer hacks applications open post',
        width: 1575,
        height: 1968,
        framed: true,
        desktop: [471.61, 309.81, 288.92, 325.112, 15, 1],
        desktopSize: [204.482, 255.665],
        mobile: [33.34, 568.26, 190.465, 223.481, 7, 1],
        mobileSize: [151.498, 189.419],
      },
      {
        key: 'sh-v2-post-5',
        alt: 'summer hacks applications due tonight post',
        width: 1601,
        height: 2001,
        framed: true,
        desktop: [3.4, 219.91, 261.334, 304.829, -8, 2],
        desktopSize: [204.482, 255.587],
        mobile: [98.54, 417.12, 177.244, 213.073, -3, 2],
        mobileSize: [151.498, 189.361],
      },
      {
        key: 'sh-v2-post-2',
        alt: 'summer hacks hacker apps open post',
        width: 1601,
        height: 2001,
        framed: true,
        desktop: [247.52, 346.23, 225.086, 276.131, 0, 3],
        desktopSize: [204.482, 255.528],
        mobile: [0.74, 268.94, 166.763, 204.582, 0, 3],
        mobileSize: [151.498, 189.316],
      },
      {
        key: 'sh-v2-post-4',
        alt: 'summer hacks 3 days until apps due post',
        width: 1601,
        height: 2001,
        framed: true,
        desktop: [474.77, 0, 243.804, 291.22, -4, 4],
        desktopSize: [204.482, 255.587],
        mobile: [111.37, 147.76, 180.631, 215.76, -4, 4],
        mobileSize: [151.498, 189.361],
      },
      {
        key: 'sh-v2-pear',
        alt: 'pear illustration',
        width: 367,
        height: 545,
        desktop: [422.58, 223.39, 139.087, 181.265, -11, 5],
        desktopSize: [109.95, 163.285],
        mobile: [185.22, 614.19, 103.047, 134.296, -11, 5],
        mobileSize: [81.461, 120.976],
      },
      {
        key: 'sh-v2-apple',
        alt: 'apple illustration',
        width: 371,
        height: 391,
        desktop: [131.32, 497.39, 136.717, 141.081, 14, 6],
        desktopSize: [111.587, 117.578],
        mobile: [14.08, 457.13, 101.292, 104.525, 14, 6],
        mobileSize: [82.673, 87.112],
      },
      {
        key: 'sh-v2-orange',
        alt: 'orange illustration',
        width: 482,
        height: 549,
        desktop: [96.53, 4.83, 213.33, 218.251, -35, 7],
        desktopSize: [144.92, 164.962],
        mobile: [0, 142.9, 158.053, 161.699, -35, 7],
        mobileSize: [107.369, 122.218],
      },
      {
        key: 'sh-v2-lemon',
        alt: 'lemon illustration',
        width: 469,
        height: 341,
        desktop: [0, 192.39, 138.758, 100.839, 0, 8],
        mobile: [172.63, 334.14, 102.804, 74.71, 0, 8],
      },
    ],
  },
  {
    key: 'v3',
    desktop: [869.892, 668.032],
    mobile: [320, 936.47],
    shots: [
      {
        key: 'sh-v3-mood',
        alt: 'summer hacks moodboard',
        width: 2063,
        height: 1032,
        framed: true,
        desktop: [0, 0, 425.362, 259.277, -7, 0],
        desktopSize: [381.508, 190.754],
        mobile: [0, 186.57, 320, 195.054, -7, 0],
        mobileSize: [287.008, 143.504],
      },
      {
        key: 'sh-v3-post-1',
        alt: 'summer hacks build under open skies post',
        width: 1170,
        height: 1462,
        framed: true,
        desktop: [437, 32, 235.819, 289.623, 0, 1],
        desktopSize: [215.215, 269.019],
        mobile: [37.62, 0, 177.407, 217.883, 0, 1],
        mobileSize: [161.906, 202.383],
      },
      {
        key: 'sh-v3-post-2',
        alt: 'summer hacks join the waitlist post',
        width: 1170,
        height: 1462,
        framed: true,
        desktop: [315, 293, 260.881, 309.938, -5, 2],
        desktopSize: [215.864, 269.829],
        mobile: [104.34, 358.63, 181.681, 221.565, -1, 4],
        mobileSize: [162.394, 202.993],
      },
      {
        key: 'sh-v3-post-3',
        alt: 'summer hacks activities post',
        width: 1169,
        height: 1461,
        framed: true,
        desktop: [593, 249, 276.893, 321.384, 9, 3],
        desktopSize: [214.091, 267.614],
        mobile: [125.74, 713.61, 184.021, 222.856, 2, 3],
        mobileSize: [161.061, 201.326],
      },
      {
        key: 'sh-v3-post-4',
        alt: 'summer hacks mentor applications post',
        width: 1161,
        height: 1451,
        framed: true,
        desktop: [28, 251, 269.075, 315.867, 7, 4],
        desktopSize: [214.969, 268.711],
        mobile: [12.04, 518.27, 202.426, 237.627, 7, 2],
        mobileSize: [161.721, 202.151],
      },
      {
        key: 'sh-v3-sticker-1',
        alt: 'take a byte sticker',
        width: 712,
        height: 660,
        desktop: [265, 207, 150.073, 139.207, 0, 5],
        mobile: [8.27, 394.9, 112.9, 104.725, 0, 5],
      },
      {
        key: 'sh-v3-sticker-2',
        alt: 'build under open skies sticker',
        width: 883,
        height: 655,
        desktop: [190, 538, 175.405, 130.032, 0, 6],
        mobile: [179.8, 592.75, 131.957, 97.823, 0, 6],
      },
      {
        key: 'sh-v3-sticker-3',
        alt: 'idea test kitchen sticker',
        width: 708,
        height: 858,
        desktop: [673, 71, 178.34, 204.069, -10, 7],
        desktopSize: [149.192, 180.91],
        mobile: [184.31, 60.12, 134.166, 153.521, -10, 7],
        mobileSize: [112.237, 136.099],
      },
      {
        key: 'sh-v3-sticker-4',
        alt: 'summer hacks lemon sticker',
        width: 658,
        height: 699,
        desktop: [543.26, 493.19, 143.944, 149.372, -14, 8],
        desktopSize: [117.257, 124.709],
        mobile: [30.85, 744.78, 108.289, 112.373, -14, 8],
        mobileSize: [88.212, 93.819],
      },
    ],
  },
]

export default function SummerHacks() {
  return (
    <DesignPage
      path="design"
      title="designing for an outdoor hackathon"
      role="graphic design director"
      timeline="oct 2025 - aug 2026"
      description={
        <>
          <a href="https://www.summerhacks.ca/" target="_blank" rel="noreferrer" className={inlineLink}>
            summer hacks
          </a>{' '}
          is a hackathon reimagined for the outdoors. as graphic design director i worked with the design team to explore how our
          branding could highlight moving away from the traditional hackathon space. below are some initial explorations and final
          designs.
        </>
      }
    >
      <div className="flex flex-col items-center gap-[104px] min-[708px]:gap-[110px] min-[708px]:[zoom:0.7511] min-[904px]:[zoom:1]">
        {sections.map(({ key, desktop, mobile, shots }) => (
          <Collage key={key} pieces={shots.map((s, i) => shot(s, i % 2 ? -2 : 2))} desktop={desktop} mobile={mobile} />
        ))}
      </div>
    </DesignPage>
  )
}
