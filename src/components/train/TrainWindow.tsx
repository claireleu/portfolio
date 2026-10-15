'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { FRAME_H, FRAME_W, SKY_CSS, createState, drawScene, step } from './scene'

const MAX_FPS = 60
const CLOUDS = ['/animation/cloud-1.webp', '/animation/cloud-2.webp', '/animation/cloud-3.webp']

export default function TrainWindow({ className }: { className: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!container || !canvas || !ctx) return

    const state = createState()
    const load = (src: string) => Object.assign(new window.Image(), { src })
    const clouds = CLOUDS.map(load)
    const sprites = {
      tree: load('/animation/tree.webp'),
      bush: load('/animation/bush.webp'),
      pole: load('/animation/pole.webp'),
    }
    let width = 0
    let height = 0
    let dpr = 1
    let frame = 0
    let last = 0
    let onScreen = false

    const render = () => {
      if (!width || !height) return
      const s = Math.max(width / FRAME_W, height / FRAME_H)
      // clear canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // scale scene to fit train window dims
      ctx.setTransform(dpr * s, 0, 0, dpr * s, (dpr * (width - FRAME_W * s)) / 2, (dpr * (height - FRAME_H * s)) / 2)
      drawScene(ctx, state, true, clouds, sprites)
    }

    // animation loop
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      if (last && now - last < 1000 / MAX_FPS - 2) return
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0
      last = now
      step(state, dt)
      render()
    }

    const start = () => {
      if (frame || !onScreen) return
      last = 0
      frame = requestAnimationFrame(tick)
    }

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width
      height = entry.contentRect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      render()
    })

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) start()
      else stop()
    })

    resize.observe(container)
    visibility.observe(container)
    return () => {
      stop()
      resize.disconnect()
      visibility.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="View from a train window of Lake Ontario passing by"
      className={`relative isolate overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" style={{ background: SKY_CSS }} />
      <Image
        src="/animation/train-frame.webp"
        alt=""
        fill
        priority
        sizes="(min-width: 780px) 708px, calc(100vw - 72px)"
        className="object-cover"
      />
    </div>
  )
}
