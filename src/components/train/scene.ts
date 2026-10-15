export const FRAME_W = 905
export const FRAME_H = 436

const HORIZON = 220
const F = 600 // zoom on hover later
const EYE = 5
const CX = 452
const VIEW_L = 150
const VIEW_R = 720
const PIVOT = { x: 530, y: 200 } // for rolls

const WINDOWS = [
  [353, 12, 356, 319],
  [162, 85, 98, 213],
] as const
const NEAR_GROUND = Math.max(1, ((F * EYE) / (Math.max(...WINDOWS.map(([, y, , h]) => y + h)) - HORIZON)) * 0.85)

const CRUISE = 20
const SHUTTER = 1 / 90
const WIND = 160
const ROLL_W = 5 * Math.PI * 0.6
const ROLL_ON = true
const CLOUD_LAYERS = [
  { D: 14000, width: [100, 150], base: [40, 90], cell: 420, count: [1, 2] },
  { D: 9000, width: [160, 230], base: [70, 130], cell: 600, count: [1, 2] },
  { D: 5500, width: [250, 330], base: [110, 170], cell: 850, count: [1, 2] },
] as const
const CLOUD_JITTER = 0.4

const HILLS = [
  { minHeight: 1.5, maxHeight: 5.5, minWidth: 50, maxWidth: 140, gap: 0.3, thickness: 9, seed: 91 }, // back
  { minHeight: 0.8, maxHeight: 3, minWidth: 30, maxWidth: 80, gap: 0.45, thickness: 7, seed: 92 }, // front
] as const

const SUN_POS = { x: 575, y: 150 }
const TREE_BASE = 0.585
type RGB = readonly [number, number, number]
type Item = { X: number; d: number; draw: () => void; flat?: boolean }

// palette
const SKY_HIGH: RGB = [15, 195, 217] // #0fc3d9
const SKY_LOW: RGB = [162, 237, 246] // #a2edf6
const WATER_DARK: RGB = [24, 167, 211] // #18a7d3
const WATER_LIGHT: RGB = [57, 210, 215] // #39d2d7
const SUN: RGB = [252, 252, 187] // #fcfcbb
const GRASS_MAIN: RGB = [190, 224, 113] // #bee071
const GRASS_SHADE: RGB = [95, 180, 73] // #5fb449
const GRASS_STREAKS: RGB = [193, 230, 130] // #c1e682
const WOOD: RGB = [176, 122, 57] // #b07a39
export const SKY_CSS = `linear-gradient(${rgb(SKY_HIGH)} 30%, ${rgb(SKY_LOW)} 50%)`

export interface TrainState {
  t: number
  cam: number
  v: number
  a: number
  roll: number
  rollV: number
}

export function createState(): TrainState {
  const cam = Math.random() * 1000000
  return { t: 0, cam, v: CRUISE * 0.5, a: 0, roll: 0, rollV: 0 }
}

export function step(s: TrainState, dt: number) {
  s.t += dt

  // set speed around cruise
  const target =
    CRUISE * (1 + 0.05 * Math.sin((s.t * 2 * Math.PI) / 41) + 0.025 * Math.sin((s.t * 2 * Math.PI) / 17 + 1))
  const wantA = clamp((target - s.v) * 0.3, -0.6, 0.8)
  s.a += (wantA - s.a) * Math.min(1, dt / 0.8)
  s.v = Math.max(0, s.v + s.a * dt)
  s.cam += s.v * dt

  // set roll
  const sub = 4
  const h = dt / sub
  const load = s.v / CRUISE
  for (let i = 0; i < sub; i++) {
    const cant = noise(s.cam / 40, 17) * 0.0015 * load
    s.rollV += (-(ROLL_W ** 2) * (s.roll - cant) - 2 * 0.15 * ROLL_W * s.rollV) * h
    s.roll += s.rollV * h
  }
}

// going to add option to turn off scroll/motion later
export function drawScene(
  ctx: CanvasRenderingContext2D,
  s: TrainState,
  motion: boolean,
  clouds: readonly HTMLImageElement[],
  sprites: { tree: HTMLImageElement; bush: HTMLImageElement; pole: HTMLImageElement },
) {
  const cam = s.cam
  const roll = ROLL_ON ? s.roll : 0
  const sx = (X: number, d: number) => CX + (F * (X - cam)) / d
  const sy = (z: number, d: number) => HORIZON + (F * (EYE - z)) / d
  const blur = (d: number) => (motion ? ((s.v * F) / d) * SHUTTER : 0)

  const cells = (d: number, L: number, pad: number, shift = 0): [number, number] => [
    Math.floor((cam - shift + ((VIEW_L - CX) * d) / F - pad) / L),
    Math.floor((cam - shift + ((VIEW_R - CX) * d) / F + pad) / L),
  ]

  const landX0 = cam + ((VIEW_L - 90 - CX) * 100) / F
  const landX1 = cam + ((VIEW_R + 90 - CX) * 100) / F
  const ridges = HILLS.map((_, i) => hillsIn(i, landX0, landX1))

  // z of hill
  const terrain = (X: number, d: number, shore = shoreAt(X)) => {
    let z = 0
    for (let i = 0; i < HILLS.length; i++) {
      const u = (d - ridgeDepth(X, i, shore)) / HILLS[i].thickness
      if (Math.abs(u) < 1) z += ridgeHeight(ridges[i], X) * 0.5 * (1 + Math.cos(Math.PI * u))
    }
    return z
  }

  const fine = (d: number) => Math.max(0.2, (d * 3) / F)

  ctx.save()
  ctx.beginPath()
  for (const [x, y, w, h] of WINDOWS) ctx.rect(x, y, w, h)
  ctx.clip()

  ctx.translate(PIVOT.x, PIVOT.y)
  ctx.rotate(roll)
  ctx.translate(-PIVOT.x, -PIVOT.y)

  drawSky()
  drawClouds()
  drawWater()
  drawBoats()
  drawLand()
  drawPoles()
  drawHedge()
  drawMast()

  ctx.restore()

  function drawSky() {
    const g = ctx.createLinearGradient(0, -40, 0, HORIZON)
    g.addColorStop(0, rgb(SKY_HIGH))
    g.addColorStop(0.65, rgb(SKY_HIGH))
    g.addColorStop(1, rgb(SKY_LOW))
    ctx.fillStyle = g
    ctx.fillRect(VIEW_L - 80, -60, VIEW_R - VIEW_L + 160, HORIZON + 61)

    // sun
    const GLOW = 24 // px; glow radius, just past the sun's 13 px edge
    const glow = ctx.createRadialGradient(SUN_POS.x, SUN_POS.y, 0, SUN_POS.x, SUN_POS.y, GLOW)
    glow.addColorStop(0, rgb(SUN, 0.9))
    glow.addColorStop(13 / GLOW, rgb(SUN, 0.5))
    glow.addColorStop(1, rgb(SUN, 0))
    ctx.fillStyle = glow
    ctx.fillRect(SUN_POS.x - GLOW, SUN_POS.y - GLOW, GLOW * 2, GLOW * 2)
    ctx.fillStyle = rgb(SUN)
    circle(SUN_POS.x, SUN_POS.y, 13)
  }

  function drawClouds() {
    const list = []
    for (let b = 0; b < CLOUD_LAYERS.length; b++) {
      const { D, width, base, cell, count } = CLOUD_LAYERS[b]
      const L = (cell * D) / F
      const [k0, k1] = cells(D, L, (width[1] * D) / F, WIND * s.t)
      for (let k = k0; k <= k1; k++) {
        const r = rng(k, 31 + b)
        const n = count[0] + Math.floor(r() * (count[1] - count[0] + 1))
        for (let j = 0; j < n; j++) {
          const d = D * (1 + (r() - 0.5) * 0.08)
          const X = (k + (j + 0.5 + (r() - 0.5) * CLOUD_JITTER) / n) * L + WIND * s.t
          const W = ((width[0] + r() * (width[1] - width[0])) * D) / F
          const alt = ((base[0] + r() * (base[1] - base[0])) * D) / F
          const img = clouds[Math.floor(r() * clouds.length)]
          list.push({ X, d, W, alt, img })
        }
      }
    }
    list.sort((a, b) => b.d - a.d)
    for (const c of list) {
      if (!c.img?.naturalWidth) continue 
      const w = (c.W * F) / c.d
      const h = (w * c.img.naturalHeight) / c.img.naturalWidth
      const x = sx(c.X, c.d)
      if (x + w / 2 < VIEW_L || x - w / 2 > VIEW_R) continue
      const y = HORIZON - (F * c.alt) / c.d
      ctx.drawImage(c.img, x - w / 2, y - h * 0.9, w, h)
    }
  }



  function drawWater() {
    ctx.fillStyle = rgb(WATER_DARK)
    ctx.fillRect(VIEW_L - 80, HORIZON, VIEW_R - VIEW_L + 160, 260)
    waterPatches()

    ctx.save()
    ctx.translate(SUN_POS.x, HORIZON)
    ctx.scale(1, 4)
    const glitter = ctx.createRadialGradient(0, 0, 0, 0, 0, 32)
    glitter.addColorStop(0, rgb(SUN, 0.75))
    glitter.addColorStop(1, rgb(SUN, 0))
    ctx.fillStyle = glitter
    ctx.fillRect(-40, 0, 80, 32)
    ctx.restore()

    const SLICES = 32
    const NEAR = 40
    const FAR = 5000
    ctx.fillStyle = rgb(SUN)
    const dark = new Path2D()
    for (let i = 0; i < SLICES; i++) {
      const di = FAR * (NEAR / FAR) ** (i / (SLICES - 1))
      const L = (di * 70) / F
      const [k0, k1] = cells(di * 1.05, L, 10)
      for (let k = k0; k <= k1; k++) {
        const r = rng(k, 1000 + i)
        for (let j = 0; j < 2; j++) {
          const X = (k + r()) * L
          const d = di * (1 + (r() - 0.5) * 0.08)
          const size = 1.5 + r() * 4.5
          const light = r() < 0.55
          const speed = 1.5 + r() * 3
          const phase = r() * 6.283
          if (d < shoreAt(X)) continue
          const k2 = F / d
          const x = sx(X, d)
          const y = sy(0, d)
          const len = Math.max(1.2, size * k2) + blur(d)
          const th = clamp(0.12 * k2, 0.5, 2.5)
          if (light) {
            const gl = Math.exp(-(((x - SUN_POS.x) / (6 + (y - HORIZON) * 1.4)) ** 2))
            const tw = 0.5 + 0.5 * Math.sin(s.t * speed + phase)
            ctx.globalAlpha = 0.18 + 0.75 * gl * tw
            ctx.fillRect(x - len / 2, y - th / 2, len, th)
          } else {
            dark.rect(x - len / 2, y - th / 2, len, th)
          }
        }
      }
    }
    ctx.globalAlpha = 0.16
    ctx.fillStyle = rgb(SKY_HIGH)
    ctx.fill(dark)
    ctx.globalAlpha = 1
  }

  function waterPatches() {
    const SLICES = 14
    const NEAR = 60
    const FAR = 3000
    for (let i = 0; i < SLICES; i++) {
      const di = FAR * (NEAR / FAR) ** (i / (SLICES - 1))
      const L = (di * 70) / F
      const [k0, k1] = cells(di, L, L)
      for (let k = k0; k <= k1; k++) {
        const r = rng(k, 5000 + i)
        if (r() > 0.75) continue
        const X = (k + r()) * L
        const d = di * (1 + (r() - 0.5) * 0.2)
        const R = ((30 + r() * 60) * d) / F
        const a = 0.45 + r() * 0.4
        const k2 = F / d
        const b = blur(d)
        const w = R * k2 + b / 2
        const h = Math.max(2.5, (R * k2 * EYE) / d)
        ctx.globalAlpha = a
        ctx.drawImage(softDot(WATER_LIGHT), sx(X, d) + b / 2 - w, sy(0, d) - h, w * 2, h * 2)
      }
    }
    ctx.globalAlpha = 1
  }

  function drawBoats() {
    const L = 650
    const [k0, k1] = cells(1800, L, 20)
    for (let k = k0; k <= k1; k++) {
      const r = rng(k, 41)
      if (r() > 0.4) continue
      const X = (k + r()) * L
      const d = 450 + r() * 1350
      const dir = r() < 0.5 ? -1 : 1
      const rock = Math.sin(s.t * (0.8 + r() * 0.5) + r() * 6.283) * 0.04
      const k2 = F / d
      const x = sx(X, d)
      const y = sy(0, d)
      ctx.fillStyle = rgb([93, 90, 82])
      ctx.fillRect(x - 3 * k2, y - 0.9 * k2, 6 * k2, Math.max(0.8, 0.9 * k2))
      const tx = x + rock * 9 * k2
      const ty = y - 9 * k2
      ctx.strokeStyle = ctx.fillStyle
      ctx.lineWidth = 0.6
      line(x, y - 0.9 * k2, tx, ty)
      ctx.fillStyle = rgb(SUN)
      ctx.beginPath()
      ctx.moveTo(tx, ty)
      ctx.lineTo(x + dir * 4.2 * k2, y - 1.4 * k2)
      ctx.lineTo(x, y - 1.4 * k2)
      ctx.fill()
    }
  }

  function drawLand() {
    const edge = (offset: number, closed: boolean) => {
      const p = new Path2D()
      for (let X = landX0; X <= landX1; ) {
        const d = shoreAt(X) - offset
        p.lineTo(sx(X, d), sy(0, d))
        X += fine(d)
      }
      if (closed) {
        p.lineTo(VIEW_R + 100, 480)
        p.lineTo(VIEW_L - 100, 480)
      }
      return p
    }

    ctx.fillStyle = rgb([233, 219, 184])
    ctx.fill(edge(0, true))

    ctx.strokeStyle = rgb(SUN, 0.7)
    ctx.lineWidth = 0.8
    ctx.stroke(edge(0, false))

    const field = edge(3, true)
    ctx.fillStyle = grass()
    ctx.fill(field)

    const items: Item[] = []
    grassPatches(items)
    trees(items)
    const blades = grassBlades()
    const layers: Item[][] = [[], [], []]
    for (const it of items) layers[it.d > ridgeDepth(it.X, 0) ? 0 : it.d > ridgeDepth(it.X, 1) ? 1 : 2].push(it)
    let ridge = field
    for (let i = 0; i < layers.length; i++) {
      layers[i].sort((a, b) => Number(!!b.flat) - Number(!!a.flat) || b.d - a.d)
      ctx.save()
      ctx.clip(ridge)
      for (const it of layers[i]) if (it.flat) it.draw()
      ctx.restore()
      ctx.fillStyle = rgb(GRASS_STREAKS, 0.55)
      ctx.fill(blades[i])
      for (const it of layers[i]) if (!it.flat) it.draw()
      if (i < HILLS.length) ridge = drawRidge(i)
    }
  }

  function grass() {
    return rgb(GRASS_MAIN)
  }

  function drawRidge(i: number): Path2D {
    const hills = ridges[i]
    const crest = (X0: number, X1: number, to: CanvasPath = ctx) => {
      for (let X = X0; X <= X1; ) {
        const d = ridgeDepth(X, i)
        to.lineTo(sx(X, d), sy(ridgeHeight(hills, X), d))
        X += fine(d)
      }
    }

    const shape = new Path2D()
    crest(landX0, landX1, shape)
    shape.lineTo(VIEW_R + 100, 480)
    shape.lineTo(VIEW_L - 100, 480)
    ctx.fillStyle = grass()
    ctx.fill(shape)

    for (const hill of hills) {
      const X0 = hill.xc - hill.w / 2
      const X1 = hill.xc + hill.w / 2
      const d = ridgeDepth(hill.xc, i)
      if (sx(X1, d) < VIEW_L - 20 || sx(X0, d) > VIEW_R + 20) continue
      const top = sy(hill.h, d)
      const foot = sy(0, d)

      ctx.beginPath()
      crest(X0, X1)
      ctx.lineTo(sx(X1, d), foot)
      ctx.lineTo(sx(X0, d), foot)
      const g = ctx.createLinearGradient(0, top, 0, foot)
      g.addColorStop(0, rgb(GRASS_SHADE, 0.4))
      g.addColorStop(1, rgb(GRASS_SHADE, 0))
      ctx.fillStyle = g
      ctx.fill()

      ctx.beginPath()
      crest(X0, X1)
      ctx.strokeStyle = rgb(GRASS_SHADE, 0.3)
      ctx.lineWidth = 1
      ctx.stroke()
    }
    return shape
  }

  function grassPatches(items: Item[]) {
    const NEAR = NEAR_GROUND
    const FAR = 85
    const SLICES = Math.ceil(Math.log(FAR / NEAR) / Math.log(1.136)) + 1
    for (let i = 0; i < SLICES; i++) {
      const di = FAR * (NEAR / FAR) ** (i / (SLICES - 1))
      const grow = (di / 10) ** 1.15
      const L = 7 * grow
      const [k0, k1] = cells(di, L, 10 * grow)
      for (let k = k0; k <= k1; k++) {
        const r = rng(k, 3000 + i)
        if (r() > 0.3) continue
        const X = (k + r()) * L
        const d = di * (1 + (r() - 0.5) * 0.12)
        const R = (2 + r() * 5) * grow
        const a = 0.35 + r() * 0.35
        if (d > shoreAt(X) - 3) continue
        items.push({
          X,
          d,
          flat: true,
          draw: () => {
            const k2 = F / d
            const b = blur(d)
            const z = terrain(X, d)
            const tall = 1 + 2 * Math.min(1, z)
            const w = R * k2 + b / 2
            const h = Math.max(0.3, (tall * EYE) / d) * R * k2
            ctx.globalAlpha = a
            ctx.drawImage(softDot(GRASS_SHADE), sx(X, d) + b / 2 - w, sy(z, d) - h, w * 2, h * 2)
            ctx.globalAlpha = 1
          },
        })
      }
    }
  }

  function grassBlades() {
    const paths = [new Path2D(), new Path2D(), new Path2D()]
    const NEAR = NEAR_GROUND
    const FAR = 85
    const STEP = 1 + 0.17 / EYE
    const SLICES = Math.ceil(Math.log(FAR / NEAR) / Math.log(STEP)) + 1
    for (let i = 0; i < SLICES; i++) {
      const di = FAR * (NEAR / FAR) ** (i / (SLICES - 1))
      const L = (di * 8) / F
      const k2 = F / di
      const b = blur(di) * 0.3 
      const [k0, k1] = cells(di * 1.04, L, 4)
      for (let k = k0; k <= k1; k++) {
        const r = rng(k, 4000 + i)
        const X = (k + r()) * L
        const d = di * (1 + (r() - 0.5) * 0.07)
        const h = (0.24 + r() * 0.28) * k2
        const hw = Math.max(0.8, (0.07 + r() * 0.05) * k2) / 2
        const lean = (r() - 0.5) * 0.8
        if (r() > 0.6 + 0.4 * noise(X / 30, 31)) continue
        const shore = shoreAt(X)
        if (d > shore - 3.2) continue
        const path = paths[d > ridgeDepth(X, 0, shore) ? 0 : d > ridgeDepth(X, 1, shore) ? 1 : 2]
        const x = sx(X, d)
        const y = sy(terrain(X, d, shore), d)
        const tx = x + lean * h
        path.moveTo(x - hw, y)
        path.lineTo(tx, y - h)
        path.lineTo(tx + b, y - h)
        path.lineTo(x + hw + b, y)
        path.closePath()
      }
    }
    return paths
  }

  function trees(items: Item[]) {
    const scatter = (L: number, dMin: number, dMax: number, seed: number, chance: (X: number) => number, kinds: number[]) => {
      const [k0, k1] = cells(dMax, L, 15)
      for (let k = k0; k <= k1; k++) {
        const r = rng(k, seed)
        for (let j = 0; j < 2; j++) {
          const X = (k + r()) * L
          const d = dMin + r() * (dMax - dMin)
          const kind = kinds[Math.floor(r() * kinds.length)]
          const size = 0.8 + r() * 0.5
          const flip = r() < 0.5
          if (r() < chance(X) && d < shoreAt(X) - 2) items.push({ X, d, draw: () => drawTree(X, d, kind, size, flip) })
        }
      }
    }
    scatter(16, 38, 82, 51, (X) => 0.05 + 0.6 * Math.max(0, noise(X / 160, 11)), [0, 0, 1, 2, 2])
    scatter(9, 40, 82, 53, (X) => 0.25 + 0.3 * noise(X / 90, 12), [2])
  }

  function plant(img: HTMLImageElement, x: number, yb: number, h: number, ax: number, ay: number, flip: boolean) {
    if (!img.naturalWidth) return
    const w = (h * img.naturalWidth) / img.naturalHeight
    ctx.save()
    ctx.translate(x, yb)
    if (flip) ctx.scale(-1, 1)
    ctx.drawImage(img, -ax * w, -ay * h, w, h)
    ctx.restore()
  }

  function drawTree(X: number, d: number, kind: number, size: number, flip: boolean) {
    const k = F / d
    const yb = sy(terrain(X, d), d)
    smear(sx(X, d), blur(d), (x) => {
      if (kind === 0) plant(sprites.tree, x, yb, 8.8 * size * k, TREE_BASE, 1, flip)
      else if (kind === 1) plant(sprites.tree, x, yb, 10.5 * size * k, TREE_BASE, 1, flip)
      else plant(sprites.bush, x, yb, 3.3 * size * k, 0.5, 0.95, flip)
    })
  }


  function drawPoles() {
    const D = 36
    const SPAN = 45
    const TOP = 10
    const ARM = 9.2
    const SAG = 1.1
    const wires = [D + 0.8, D - 0.8]
    const poleX = (n: number) => n * SPAN + (hash(n, 61) - 0.5) * 4
    const base = (n: number) => terrain(poleX(n), D)
    const [n0, n1] = cells(D, SPAN, SPAN)

    const drawWire = (wd: number) => {
      ctx.beginPath()
      for (let n = n0; n <= n1; n++) {
        const a = poleX(n)
        const b = poleX(n + 1)
        const za = base(n)
        const zb = base(n + 1)
        for (let i = 0; i <= 16; i++) {
          const u = i / 16
          const X = a + (b - a) * u
          ctx.lineTo(sx(X, wd), sy(za + (zb - za) * u + ARM - SAG * 4 * u * (1 - u), wd))
        }
      }
      ctx.strokeStyle = 'rgba(80,70,58,0.6)'
      ctx.lineWidth = 0.4
      ctx.stroke()
    }

    drawWire(wires[0])
    for (let n = n0; n <= n1; n++) {
      const X = poleX(n)
      const z = base(n)
      smear(sx(X, D), blur(D), (x) => plant(sprites.pole, x, sy(z, D), (TOP * F) / D, 0.5, 1, false))
      ctx.strokeStyle = rgb(WOOD)
      ctx.lineWidth = (0.14 * F) / D
      line(sx(X, wires[0]), sy(z + ARM, wires[0]), sx(X, wires[1]), sy(z + ARM, wires[1]))
    }
    drawWire(wires[1])
  }

  function drawHedge() {
    const L = 5
    const [k0, k1] = cells(25, L, 6)
    const bushes = []
    for (let k = k0; k <= k1; k++) {
      const r = rng(k, 71)
      const X = (k + r()) * L
      const d = 21 + r() * 4
      const size = 0.6 + r() * 0.5
      const keep = r() < 0.35 + 0.6 * noise(X / 60, 21)
      const flip = r() < 0.5
      if (keep) bushes.push({ X, d, size, flip })
    }
    bushes.sort((a, b) => b.d - a.d)
    for (const b of bushes) {
      const k = F / b.d
      const yb = sy(0, b.d)
      smear(sx(b.X, b.d), blur(b.d), (x) => plant(sprites.bush, x, yb, 2.6 * b.size * k, 0.5, 0.95, b.flip))
    }
  }

  function drawMast() {
    const D = 7
    const SPACING = 520
    const [n0, n1] = cells(D, SPACING, 10)
    for (let n = n0; n <= n1; n++) {
      const X = n * SPACING + hash(n, 81) * 200
      bar(sx(X, D), sy(7.5, D), sy(0, D), (0.35 * F) / D, blur(D), [62, 62, 54], 0.9)
    }
  }

  function smear(x: number, b: number, draw: (x: number) => void) {
    if (b >= 1.5) {
      ctx.globalAlpha = 0.35
      draw(x - b / 2)
      draw(x + b / 2)
      ctx.globalAlpha = 1
    }
    draw(x)
  }

  function bar(x: number, top: number, bottom: number, w: number, b: number, c: RGB, alpha: number) {
    if (b < 0.5) {
      ctx.fillStyle = rgb(c, alpha)
      ctx.fillRect(x - w / 2, top, w, bottom - top)
      return
    }
    const total = w + b
    const ramp = Math.min(w, b) / total
    const peak = alpha * Math.min(1, w / b)
    const g = ctx.createLinearGradient(x - total / 2, 0, x + total / 2, 0)
    g.addColorStop(0, rgb(c, 0))
    g.addColorStop(ramp, rgb(c, peak))
    g.addColorStop(1 - ramp, rgb(c, peak))
    g.addColorStop(1, rgb(c, 0))
    ctx.fillStyle = g
    ctx.fillRect(x - total / 2, top, total, bottom - top)
  }

  function circle(x: number, y: number, r: number) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  function line(x0: number, y0: number, x1: number, y1: number) {
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x1, y1)
    ctx.stroke()
  }
}

// landscape
function shoreAt(X: number) {
  return 66 + 12 * noise(X / 260, 7) + 4 * noise(X / 70, 8)
}

function ridgeDepth(X: number, ridge: number, shore = shoreAt(X)) {
  const back = shore - 9
  return ridge === 0 ? back : Math.max(37, back * 0.7)
}

interface Hill {
  xc: number
  w: number
  h: number
}

function hillsIn(ridge: number, X0: number, X1: number): Hill[] {
  const H = HILLS[ridge]
  const L = H.maxWidth
  const hills = []
  for (let c = Math.floor(X0 / L) - 1; c <= Math.floor(X1 / L) + 1; c++) {
    const r = rng(c, H.seed)
    if (r() < H.gap) continue
    const w = H.minWidth + r() * (H.maxWidth - H.minWidth)
    const h = H.minHeight + r() * (H.maxHeight - H.minHeight)
    hills.push({ xc: c * L + w / 2 + r() * (L - w), w, h })
  }
  return hills
}

function ridgeHeight(hills: Hill[], X: number) {
  for (const { xc, w, h } of hills) {
    const u = (X - xc) / (w / 2)
    if (Math.abs(u) < 1) return h * 0.5 * (1 + Math.cos(Math.PI * u))
  }
  return 0
}

// ---- helpers ----
function rgb(c: RGB, a = 1) {
  return `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`
}

const dots = new Map<string, HTMLCanvasElement>()
function softDot(c: RGB) {
  const key = c.join()
  let dot = dots.get(key)
  if (!dot) {
    dot = document.createElement('canvas')
    dot.width = dot.height = 64
    const g2 = dot.getContext('2d')!
    const g = g2.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, rgb(c, 1))
    g.addColorStop(1, rgb(c, 0))
    g2.fillStyle = g
    g2.fillRect(0, 0, 64, 64)
    dots.set(key, dot)
  }
  return dot
}

function clamp(x: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, x))
}

function hash(n: number, seed: number) {
  let h = Math.imul(n ^ Math.imul(seed, 0x9e3779b1), 0x85ebca6b)
  h ^= h >>> 13
  h = Math.imul(h, 0xc2b2ae35)
  h ^= h >>> 16
  return (h >>> 0) / 4294967296
}

function rng(cell: number, seed: number) {
  const base = Math.floor(hash(cell, seed) * 2 ** 30)
  let i = 0
  return () => hash(base + i++, seed + 1)
}

function noise(x: number, seed: number) {
  const i = Math.floor(x)
  const f = x - i
  const u = f * f * (3 - 2 * f)
  return (hash(i, seed) * (1 - u) + hash(i + 1, seed) * u) * 2 - 1
}
