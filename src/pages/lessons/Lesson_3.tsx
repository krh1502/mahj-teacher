import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import LessonLayout from '@/pages/lessons/LessonLayout'
import NorthWind from '@/tile_images/north.jpg'
import SixBam from '@/tile_images/6-bam.jpg'
import FlowerOne from '@/tile_images/flower-1.jpg'
import FlowerTwo from '@/tile_images/flower-2.jpg'
import FlowerThree from '@/tile_images/flower-3.png'
import FlowerFour from '@/tile_images/flower-4.png'
import EightDot from '@/tile_images/8-dot.jpg'
import ThreeCrak from '@/tile_images/3-crak.jpg'
import Joker from '@/tile_images/joker.jpg'
import GreenDragon from '@/tile_images/green.jpg'
import SevenDot from '@/tile_images/7-dot.jpg'
import WestWind from '@/tile_images/west.jpg'
import FourCrak from '@/tile_images/4-crak.jpg'
import FourBam from '@/tile_images/4-bam.jpg'
import OneDot from '@/tile_images/1-dot.jpg'
import TwoDot from '@/tile_images/2-dot.jpg'
import ThreeDot from '@/tile_images/3-dot.jpg'
import SixCrak from '@/tile_images/6-crak.jpg'
import SevenCrak from '@/tile_images/7-crak.jpg'
import EightCrak from '@/tile_images/8-crak.jpg'
import NineCrak from '@/tile_images/9-crak.jpg'
import ThreeBam from '@/tile_images/3-bam.jpg'
import FiveBam from '@/tile_images/5-bam.jpg'
import SevenBam from '@/tile_images/7-bam.jpg'
import BirdBam from '@/tile_images/1-bam.jpg'

const tileImages = [
  NorthWind,
  SixBam,
  FlowerOne,
  FlowerTwo,
  FlowerThree,
  FlowerFour,
  EightDot,
  ThreeCrak,
  Joker,
  GreenDragon,
  SevenDot,
  WestWind,
  FourCrak,
  FourBam,
  OneDot,
  TwoDot,
  ThreeDot,
  SixCrak,
  SevenCrak,
  EightCrak,
  NineCrak,
  ThreeBam,
  FiveBam,
  SevenBam,
]

type Section = {
  id: string
  label: string
  count: number
}

type TileDefinition = {
  id: string
  name: string
  image?: string
  matchKey?: string
  suit?: 'dot' | 'crak' | 'bam'
  value?: number
  isJoker?: boolean
}

type RoundDefinition = {
  id: 'round-1' | 'round-2' | 'round-3'
  label: string
  sections: Section[]
  tiles: TileDefinition[]
  successMessage: ReactNode
  wrongCountMessage: ReactNode
  wrongMatchMessage: ReactNode
  jokerMessage?: ReactNode
  expectedKeyLayout?: Record<string, string[]>
  expectedRuns?: Record<string, { suit: 'dot' | 'crak' | 'bam'; values: number[] }>
}

type PopupState = {
  message: ReactNode
  success?: boolean
  actionLabel?: string
  onAction?: () => void
}

const roundDefinitions: RoundDefinition[] = [
  {
    id: 'round-1',
    label: 'Round 1',
    sections: [
      { id: 'single', label: 'Single', count: 1 },
      { id: 'pair', label: 'Pair', count: 2 },
      { id: 'pung', label: 'Pung', count: 3 },
      { id: 'kong', label: 'Kong', count: 4 },
      { id: 'quint', label: 'Quint', count: 5 },
      { id: 'sextet', label: 'Sextet', count: 6 },
    ],
    tiles: [
      { id: 'r1-bird-bam', name: 'Bird Bam', image: BirdBam, matchKey: 'bird-bam', isJoker: false },
      { id: 'r1-north-wind-1', name: 'North Wind', image: NorthWind, matchKey: 'north-wind', isJoker: false },
      { id: 'r1-north-wind-2', name: 'North Wind', image: NorthWind, matchKey: 'north-wind', isJoker: false },
      { id: 'r1-6-bam-1', name: '6 Bam', image: SixBam, matchKey: '6-bam', isJoker: false },
      { id: 'r1-6-bam-2', name: '6 Bam', image: SixBam, matchKey: '6-bam', isJoker: false },
      { id: 'r1-6-bam-3', name: '6 Bam', image: SixBam, matchKey: '6-bam', isJoker: false },
      { id: 'r1-flower-1', name: 'Flower', image: FlowerOne, matchKey: 'flower', isJoker: false },
      { id: 'r1-flower-2', name: 'Flower', image: FlowerTwo, matchKey: 'flower', isJoker: false },
      { id: 'r1-flower-3', name: 'Flower', image: FlowerThree, matchKey: 'flower', isJoker: false },
      { id: 'r1-flower-4', name: 'Flower', image: FlowerFour, matchKey: 'flower', isJoker: false },
      { id: 'r1-8-dot-1', name: '8 Dot', image: EightDot, matchKey: '8-dot', isJoker: false },
      { id: 'r1-8-dot-2', name: '8 Dot', image: EightDot, matchKey: '8-dot', isJoker: false },
      { id: 'r1-8-dot-3', name: '8 Dot', image: EightDot, matchKey: '8-dot', isJoker: false },
      { id: 'r1-8-dot-4', name: '8 Dot', image: EightDot, matchKey: '8-dot', isJoker: false },
      { id: 'r1-3-crak-1', name: '3 Crak', image: ThreeCrak, matchKey: '3-crak', isJoker: false },
      { id: 'r1-3-crak-2', name: '3 Crak', image: ThreeCrak, matchKey: '3-crak', isJoker: false },
      { id: 'r1-3-crak-3', name: '3 Crak', image: ThreeCrak, matchKey: '3-crak', isJoker: false },
      { id: 'r1-3-crak-4', name: '3 Crak', image: ThreeCrak, matchKey: '3-crak', isJoker: false },
      { id: 'r1-joker-1', name: 'Joker', image: Joker, matchKey: 'joker', isJoker: true },
      { id: 'r1-joker-2', name: 'Joker', image: Joker, matchKey: 'joker', isJoker: true },
      { id: 'r1-joker-3', name: 'Joker', image: Joker, matchKey: 'joker', isJoker: true },
    ],
    successMessage: 'Nice job! Next challenge →',
    wrongCountMessage: 'Good try. Check the definitions of Pung and Kong again and count how many tiles are in each meld',
    wrongMatchMessage: 'Good try. Check that all of the tiles in a meld match each other.',
    jokerMessage: (
      <>
        Good try. However, you uncovered one of the cardinal rules of Mahjong! You can <strong>never</strong> use a joker by itself or in a pair.
      </>
    ),
    expectedKeyLayout: {
      single: ['bird-bam'],
      pair: ['north-wind'],
      pung: ['6-bam'],
      kong: ['flower', '8-dot', '3-crak'],
      quint: ['flower', '8-dot', '3-crak'],
      sextet: ['flower', '8-dot', '3-crak'],
    },
  },
  {
    id: 'round-2',
    label: 'Round 2',
    sections: [
      { id: 'single', label: 'Single', count: 1 },
      { id: 'pair', label: 'Pair', count: 2 },
      { id: 'pung', label: 'Pung', count: 3 },
      { id: 'kong', label: 'Kong', count: 4 },
      { id: 'quint', label: 'Quint', count: 5 },
      { id: 'sextet', label: 'Sextet', count: 6 },
    ],
    tiles: [
      { id: 'r2-green-dragon', name: 'Green Dragon', image: GreenDragon, matchKey: 'green-dragon', isJoker: false },
      { id: 'r2-7-dot-1', name: '7 Dot', image: SevenDot, matchKey: '7-dot', isJoker: false },
      { id: 'r2-7-dot-2', name: '7 Dot', image: SevenDot, matchKey: '7-dot', isJoker: false },
      { id: 'r2-west-wind-1', name: 'West Wind', image: WestWind, matchKey: 'west-wind', isJoker: false },
      { id: 'r2-west-wind-2', name: 'West Wind', image: WestWind, matchKey: 'west-wind', isJoker: false },
      { id: 'r2-west-wind-3', name: 'West Wind', image: WestWind, matchKey: 'west-wind', isJoker: false },
      { id: 'r2-4-crak-1', name: '4 Crak', image: FourCrak, matchKey: '4-crak', isJoker: false },
      { id: 'r2-4-crak-2', name: '4 Crak', image: FourCrak, matchKey: '4-crak', isJoker: false },
      { id: 'r2-4-crak-3', name: '4 Crak', image: FourCrak, matchKey: '4-crak', isJoker: false },
      { id: 'r2-4-crak-4', name: '4 Crak', image: FourCrak, matchKey: '4-crak', isJoker: false },
      { id: 'r2-4-bam-1', name: '4 Bam', image: FourBam, matchKey: '4-bam', isJoker: false },
      { id: 'r2-4-bam-2', name: '4 Bam', image: FourBam, matchKey: '4-bam', isJoker: false },
      { id: 'r2-4-bam-3', name: '4 Bam', image: FourBam, matchKey: '4-bam', isJoker: false },
      { id: 'r2-4-bam-4', name: '4 Bam', image: FourBam, matchKey: '4-bam', isJoker: false },
      { id: 'r2-flower-1', name: 'Flower', image: FlowerOne, matchKey: 'flower', isJoker: false },
      { id: 'r2-flower-2', name: 'Flower', image: FlowerTwo, matchKey: 'flower', isJoker: false },
      { id: 'r2-flower-3', name: 'Flower', image: FlowerThree, matchKey: 'flower', isJoker: false },
      { id: 'r2-flower-4', name: 'Flower', image: FlowerFour, matchKey: 'flower', isJoker: false },
      { id: 'r2-flower-5', name: 'Flower', image: FlowerOne, matchKey: 'flower', isJoker: false },
      { id: 'r2-flower-6', name: 'Flower', image: FlowerTwo, matchKey: 'flower', isJoker: false },
      { id: 'r2-joker', name: 'Joker', image: Joker, matchKey: 'joker', isJoker: true },
    ],
    successMessage: 'Nice job! Next challenge →',
    wrongCountMessage: 'Good try. Check the definitions of Pung and Kong again and count how many tiles are in each meld',
    wrongMatchMessage: 'Good try. Check that all of the tiles in a meld match each other.',
    jokerMessage: (
      <>
        Good try. However, you uncovered one of the cardinal rules of Mahjong! You can <strong>never</strong> use a joker by itself or in a pair.
      </>
    ),
    expectedKeyLayout: {
      single: ['green-dragon'],
      pair: ['7-dot'],
      pung: ['west-wind'],
      kong: ['4-crak', '4-bam'],
      quint: ['4-crak', '4-bam'],
      sextet: ['flower'],
    },
  },
  {
    id: 'round-3',
    label: 'Round 3',
    sections: [
      { id: 'run-3', label: 'Run of 3', count: 3 },
      { id: 'run-4', label: 'Run of 4', count: 4 },
      { id: 'run-5', label: 'Run of 5', count: 5 },
    ],
    tiles: [
      { id: 'r3-1-dot', name: '1 Dot', image: OneDot, suit: 'dot', value: 1 },
      { id: 'r3-2-dot', name: '2 Dot', image: TwoDot, suit: 'dot', value: 2 },
      { id: 'r3-3-dot', name: '3 Dot', image: ThreeDot, suit: 'dot', value: 3 },
      { id: 'r3-6-crak', name: '6 Crak', image: SixCrak, suit: 'crak', value: 6 },
      { id: 'r3-7-crak', name: '7 Crak', image: SevenCrak, suit: 'crak', value: 7 },
      { id: 'r3-8-crak', name: '8 Crak', image: EightCrak, suit: 'crak', value: 8 },
      { id: 'r3-9-crak', name: '9 Crak', image: NineCrak, suit: 'crak', value: 9 },
      { id: 'r3-3-bam', name: '3 Bam', image: ThreeBam, suit: 'bam', value: 3 },
      { id: 'r3-4-bam', name: '4 Bam', image: FourBam, suit: 'bam', value: 4 },
      { id: 'r3-5-bam', name: '5 Bam', image: FiveBam, suit: 'bam', value: 5 },
      { id: 'r3-6-bam', name: '6 Bam', image: SixBam, suit: 'bam', value: 6 },
      { id: 'r3-7-bam', name: '7 Bam', image: SevenBam, suit: 'bam', value: 7 },
    ],
    successMessage: 'Nice job! Looks like you’re ready for Lesson 4',
    wrongCountMessage: 'Good try. Check each section again and count how many tiles are in each run',
    wrongMatchMessage: 'Good try. Check that all of the tiles in a run are of the same suit.',
    expectedRuns: {
      'run-3': { suit: 'dot', values: [1, 2, 3] },
      'run-4': { suit: 'crak', values: [6, 7, 8, 9] },
      'run-5': { suit: 'bam', values: [3, 4, 5, 6, 7] },
    },
  },
]

function shuffleTiles<T>(items: T[]) {
  const nextItems = [...items]
  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[nextItems[index], nextItems[randomIndex]] = [nextItems[randomIndex], nextItems[index]]
  }
  return nextItems
}

function getRoundTiles(round: RoundDefinition) {
  return shuffleTiles([...round.tiles])
}

function getSectionTiles(round: RoundDefinition, placements: Record<string, string>) {
  return round.sections.reduce(
    (acc, section) => {
      acc[section.id] = Object.entries(placements)
        .filter(([, sectionId]) => sectionId === section.id)
        .map(([tileId]) => round.tiles.find((tile) => tile.id === tileId))
        .filter(Boolean) as TileDefinition[]
      return acc
    },
    {} as Record<string, TileDefinition[]>
  )
}

function isCorrectRoundSection(round: RoundDefinition, sectionId: string, tiles: TileDefinition[]) {
  const section = round.sections.find((item) => item.id === sectionId)
  if (!section || tiles.length !== section.count) {
    return false
  }

  if (round.id === 'round-3') {
    const expected = round.expectedRuns?.[sectionId]
    if (!expected) return false

    const uniqueSuit = new Set(tiles.map((tile) => tile.suit))
    if (uniqueSuit.size !== 1) return false

    const sortedValues = [...tiles]
      .map((tile) => tile.value)
      .sort((a, b) => (a ?? 0) - (b ?? 0))

    return (
      tiles.every((tile) => tile.suit === expected.suit) &&
      sortedValues.join(',') === expected.values.slice().sort((a, b) => a - b).join(',')
    )
  }

  const expectedKeys = round.expectedKeyLayout?.[sectionId] ?? []
  const nonJokers = tiles.filter((tile) => !tile.isJoker)

  if (tiles.some((tile) => tile.isJoker && (sectionId === 'single' || sectionId === 'pair'))) {
    return false
  }

  if (nonJokers.length === 0) {
    return false
  }

  if (tiles.some((tile) => tile.isJoker)) {
    const jokerCount = tiles.filter((tile) => tile.isJoker).length
    if (sectionId === 'quint' && jokerCount !== 1) return false
    if (sectionId === 'sextet' && jokerCount !== 2) return false
    if (sectionId !== 'quint' && sectionId !== 'sextet') return false
  }

  const uniqueMatches = new Set(nonJokers.map((tile) => tile.matchKey))
  if (uniqueMatches.size !== 1) return false

  const key = [...uniqueMatches][0]
  return !!key && expectedKeys.includes(key)
}

export default function LessonThree() {
  const navigate = useNavigate()
  const [roundIndex, setRoundIndex] = useState(0)
  const [showActivity, setShowActivity] = useState(false)
  const [draggedTileId, setDraggedTileId] = useState<string | null>(null)
  const [popup, setPopup] = useState<PopupState | null>(null)
  const [placements, setPlacements] = useState<Record<string, string>>({})
  const [tileTray, setTileTray] = useState<TileDefinition[]>(() => getRoundTiles(roundDefinitions[0]))

  const activeRound = roundDefinitions[roundIndex]
  const sectionTiles = useMemo(
    () => getSectionTiles(activeRound, placements),
    [activeRound, placements]
  )
  const leftTiles = useMemo(
    () => tileTray.filter((tile) => !placements[tile.id]),
    [placements, tileTray]
  )
  const canSubmitRound = leftTiles.length === 0

  const getTileImage = (tile: TileDefinition, index: number) => {
    if (tile.image) {
      return tile.image
    }

    const identity = tile.matchKey ?? tile.name ?? `${tile.suit ?? 'tile'}-${tile.value ?? index}`
    const hash = [...identity].reduce((sum, char) => sum + char.charCodeAt(0), 0)
    return tileImages[hash % tileImages.length]
  }

  useEffect(() => {
    setPopup(null)
    setPlacements({})
    setTileTray(getRoundTiles(activeRound))
  }, [activeRound])

  function handleSubmitRound() {
    if (!canSubmitRound) {
      setPopup({
        message: 'You still have tiles left to place before checking your answer.',
        actionLabel: 'Try again',
        onAction: () => setPopup(null),
      })
      return
    }

    const allCountsMatch = activeRound.sections.every(
      (section) => (sectionTiles[section.id] ?? []).length === section.count
    )

    if (!allCountsMatch) {
      setPopup({
        message: activeRound.wrongCountMessage,
        actionLabel: 'Try again',
        onAction: () => setPopup(null),
      })
      return
    }

    const hasIncorrectSection = activeRound.sections.some((section) => {
      const tiles = sectionTiles[section.id] ?? []
      return !isCorrectRoundSection(activeRound, section.id, tiles)
    })

    if (hasIncorrectSection) {
      const hadJokerInSingleOrPair = activeRound.sections.some((section) => {
        const tiles = sectionTiles[section.id] ?? []
        return (section.id === 'single' || section.id === 'pair') && tiles.some((tile) => tile.isJoker)
      })

      setPopup({
        message: hadJokerInSingleOrPair ? activeRound.jokerMessage ?? activeRound.wrongMatchMessage : activeRound.wrongMatchMessage,
        actionLabel: 'Try again',
        onAction: () => setPopup(null),
      })
      return
    }

    const isFinalRound = roundIndex === roundDefinitions.length - 1
    setPopup({
      message: activeRound.successMessage,
      success: true,
      actionLabel: isFinalRound ? 'Go to Lesson 4' : 'Next challenge',
      onAction: isFinalRound
        ? () => navigate('/lessons/4')
        : () => setRoundIndex((previous) => previous + 1),
    })
  }

  function handleTileDragStart(tileId: string) {
    setDraggedTileId(tileId)
  }

  function handleTileDrop(sectionId: string) {
    if (!draggedTileId) return

    setPlacements((previous) => {
      const next = { ...previous }
      Object.keys(next).forEach((tileId) => {
        if (tileId === draggedTileId) {
          delete next[tileId]
        }
      })
      next[draggedTileId] = sectionId
      return next
    })
    setDraggedTileId(null)
  }

  function handleDropToTray() {
    if (!draggedTileId) return

    setPlacements((previous) => {
      const next = { ...previous }
      delete next[draggedTileId]
      return next
    })
    setDraggedTileId(null)
  }

  return (
    <>
      <LessonLayout
        title="Grouping tiles"
        subtitle="Melds and sets"
        leftContent={
          <div className="space-y-4">
            <p className="text-base leading-7 text-foreground/90">
              Now that you have learned the tiles, you will learn how to group them. In American Mahjong, tiles can be in <strong>sets of like tiles</strong> or <strong>runs of consecutive numbers</strong> from the same suit. Groups of tiles are called <strong>melds</strong>. Tiles can be part of a winning hand as a single, a pair, a pung (meld of 3), a kong (meld of 4), a quintet, or a sextet. The learning activity that follows will challenge you to group the set of given tiles into proper groups. These are the building blocks of hands you will eventually compose during gameplay.
            </p>
          </div>
        }
      />

      {!showActivity && (
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => setShowActivity(true)}
            className="rounded-md bg-primary px-5 py-3 text-base font-medium text-primary-foreground hover:bg-primary-hover"
          >
            Finished learning. Click here to start knowledge check
          </button>
        </div>
      )}

      {showActivity && (
        <div className="mt-8 rounded-[32px] border border-emerald-200/30 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_30%),linear-gradient(135deg,#1f5c45,#0f2d26)] p-3 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.06)]">
          <div className="m-3 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-white">Activity</h2>
            <span className="rounded-full border border-emerald-100/30 bg-emerald-950/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-emerald-50">
              {activeRound.label}
            </span>
          </div>

          <div className="rounded-[28px] border border-emerald-100/20 bg-[#173f34]/90 p-3">
            <div className="flex min-h-[420px] flex-col justify-between gap-3">
              <div className={activeRound.id === 'round-3' ? 'flex flex-wrap justify-center gap-3' : 'grid gap-3 md:grid-cols-4'}>
                {activeRound.sections.map((section) => (
                  <div
                    key={section.id}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => handleTileDrop(section.id)}
                    className={
                      activeRound.id === 'round-3'
                        ? 'min-h-[150px] min-w-[180px] flex-1 basis-[180px] rounded-2xl border-2 border-dashed border-emerald-100/50 bg-[#215b4a]/80 p-3 shadow-inner'
                        : `min-h-[150px] rounded-2xl border-2 border-dashed border-emerald-100/50 bg-[#215b4a]/80 p-3 shadow-inner ${section.id === 'quint' || section.id === 'sextet' ? 'md:col-span-2' : ''}`
                    }
                  >
                    <div className="mb-2 text-center text-sm font-semibold uppercase tracking-[0.08em] text-emerald-50">{section.label}</div>
                    <div className="flex h-full w-full flex-nowrap items-center justify-center gap-2 overflow-visible px-2 pb-2 pt-1">
                      {(sectionTiles[section.id] ?? []).map((tile, index) => (
                        <div
                          key={tile.id}
                          draggable
                          onDragStart={() => handleTileDragStart(tile.id)}
                          className="flex h-[84px] w-[60px] shrink-0 flex-col items-center justify-center rounded-xl border border-emerald-100/40 bg-white/10 p-1 shadow-sm"
                        >
                          <img src={getTileImage(tile, index)} alt={tile.name} className="h-[58px] w-full rounded-md object-contain" />
                          <div className="mt-1 text-[8px] font-medium text-white/95 text-center leading-tight">{tile.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleDropToTray}
                className="rounded-2xl border border-emerald-100/30 bg-[#0f2c26]/70 p-3 shadow-inner"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-emerald-50">Tiles</p>
                  <span className="text-xs text-emerald-100/80">{leftTiles.length} remaining</span>
                </div>

                <div className="flex min-h-[120px] flex-wrap items-end justify-center gap-3">
                  {leftTiles.map((tile, index) => (
                    <div
                      key={tile.id}
                      draggable
                      onDragStart={() => handleTileDragStart(tile.id)}
                      className="flex h-28 w-20 cursor-grab flex-col items-center justify-center rounded-xl border border-emerald-100/40 bg-white/10 p-2 text-center shadow-sm active:cursor-grabbing"
                    >
                      <img src={getTileImage(tile, index)} alt={tile.name} className="h-20 w-full rounded-md object-contain" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSubmitRound}
                  className="rounded-md bg-primary px-5 py-3 text-base font-medium text-primary-foreground hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!canSubmitRound}
                >
                  Check my groups
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className={`w-full max-w-md rounded-2xl border p-6 shadow-xl ${popup.success ? 'border-green-500 bg-green-700 text-white' : 'border-red-500 bg-red-700 text-white'}`}>
            <p className="text-base leading-7 text-white">{popup.message}</p>
            {popup.actionLabel && (
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={popup.onAction}
                  className="rounded-md bg-white px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-100"
                >
                  {popup.actionLabel}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
