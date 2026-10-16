import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'

export type Spot = [x: number, y: number, w: number, h: number, rotate: number, z: number]
export type Size = [w: number, h: number]

export type CollagePiece = { key: string; desktop: Spot; mobile: Spot; tilt?: number; content: ReactNode }

export const frame = 'rounded-[9px] border border-[#e8e8e8] bg-white p-[10px]'
export const photoShadow = 'shadow-[0px_1px_1px_0px_rgba(0,0,0,0.2)]'

function spotVars(prefix: string, [x, y, w, h, rotate, z]: Spot) {
  return {
    [`--${prefix}x`]: `${x}px`,
    [`--${prefix}y`]: `${y}px`,
    [`--${prefix}w`]: `${w}px`,
    [`--${prefix}h`]: `${h}px`,
    [`--${prefix}r`]: `${rotate}deg`,
    [`--${prefix}z`]: z,
  }
}

function sizeVars(prefix: string, [w, h]: Size) {
  return { [`--${prefix}w`]: `${w}px`, [`--${prefix}h`]: `${h}px` }
}

type CollageImageProps = {
  src: string
  alt: string
  width: number
  height: number
  mobile: Size
  desktop: Size
  eager?: boolean
  className?: string
}

export function CollageImage({ src, alt, width, height, mobile, desktop, eager, className = '' }: CollageImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      loading={eager ? 'eager' : undefined}
      style={{ ...sizeVars('mi', mobile), ...sizeVars('di', desktop) } as CSSProperties}
      className={`h-(--mih) w-(--miw) min-[708px]:h-(--dih) min-[708px]:w-(--diw) ${className}`}
    />
  )
}

const stillPiece = 'shrink-0 rotate-(--mr) min-[708px]:rotate-(--dr)'
const tiltPiece =
  'shrink-0 transition-[rotate,scale] duration-300 ease-in-out [--hover-tilt:0deg] rotate-[calc(var(--mr)+var(--hover-tilt))] hover:scale-[1.03] hover:[--hover-tilt:var(--tilt)] min-[708px]:rotate-[calc(var(--dr)+var(--hover-tilt))]'

const spot =
  'absolute top-(--my) left-(--mx) z-(--mz) flex h-(--mh) w-(--mw) items-center justify-center drop-shadow-[0px_8px_0px_rgba(0,0,0,0.08)] min-[708px]:top-(--dy) min-[708px]:left-(--dx) min-[708px]:z-(--dz) min-[708px]:h-(--dh) min-[708px]:w-(--dw)'
const raiseOnHover = 'has-[:hover]:z-20 min-[708px]:has-[:hover]:z-20'

type CollageProps = { pieces: CollagePiece[]; mobile: Size; desktop: Size; className?: string }

export default function Collage({ pieces, mobile, desktop, className = '' }: CollageProps) {
  return (
    <div
      style={{ ...sizeVars('cm', mobile), ...sizeVars('cd', desktop) } as CSSProperties}
      className={`relative h-(--cmh) w-(--cmw) shrink-0 min-[708px]:h-(--cdh) min-[708px]:w-(--cdw) ${className}`}
    >
      {pieces.map(({ key, desktop, mobile, tilt, content }) => (
        <div
          key={key}
          style={
            {
              ...spotVars('m', mobile),
              ...spotVars('d', desktop),
              ...(tilt === undefined ? {} : { '--tilt': `${tilt}deg` }),
            } as CSSProperties
          }
          className={tilt === undefined ? spot : `${spot} ${raiseOnHover}`}
        >
          <div className={tilt === undefined ? stillPiece : tiltPiece}>{content}</div>
        </div>
      ))}
    </div>
  )
}
