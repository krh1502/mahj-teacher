import { useMemo, useState } from 'react'
import LessonLayout from '@/pages/lessons/LessonLayout'
import placeholderOne from '@/tile_images/tile-placeholder-1.svg'
import placeholderTwo from '@/tile_images/tile-placeholder-2.svg'
import placeholderThree from '@/tile_images/tile-placeholder-3.svg'

const tilePlaceholders = [placeholderOne, placeholderTwo, placeholderThree]

const lessonGroups = [
  {
    title: 'The 3 Suits',
    text: 'This lesson will introduce the 3 suits in Mahjong. You can think of them similarly to suits in a deck of playing cards, like clubs or hearts. In Mahjong, we have the Bams, short for Bamboo, Craks, and Dots. Only number tiles and dragons have suits. Click through to learn about each suit and its corresponding dragon.',
    imageCount: 4,
    layout: 'grid-cols-2',
  },
  {
    title: 'Bams (Bamboos)',
    text: 'The Bams are usually represented by straight lines. The number of lines correlates to the number on the tile. The green dragon goes with the Bams. A good way to remember this is that bamboo shoots are green.',
    imageCount: 4,
    layout: 'grid-cols-2',
  },
  {
    title: 'Craks',
    text: 'The craks are represented by Chinese characters. The red dragon corresponds to the craks. One way to remember this is by thinking of when your skin "Cracks", the blood is red. Kind of gross, but it helps to remember!',
    imageCount: 4,
    layout: 'grid-cols-2',
  },
  {
    title: 'Dots',
    text: 'The dots are usually represented by small dots. The number of dots is the number on the tile. The corresponding dragon is the <b>white dragon</b>. The white dragon is often called the "Soap", as it looks like a bar of soap in a classic tile set.',
    imageCount: 4,
    layout: 'grid-cols-2',
  }
] as const


export default function LessonTwo() {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
  const currentGroup = lessonGroups[currentGroupIndex]

  const tileImages = useMemo(
    () =>
      Array.from({ length: currentGroup.imageCount }, (_, index) => ({
        id: `${currentGroup.title}-${index + 1}`,
        src: tilePlaceholders[Math.floor(Math.random() * tilePlaceholders.length)],
      })),
    [currentGroup.imageCount, currentGroup.title],
  )

  const isLastGroup = currentGroupIndex === lessonGroups.length - 1
  const isFirstGroup = currentGroupIndex === 0

  function handlePrevious() {
    if (!isFirstGroup) {
      setCurrentGroupIndex((previous) => previous - 1)
    }
  }

  function handleNext() {
    if (!isLastGroup) {
      setCurrentGroupIndex((previous) => previous + 1)
    }
  }

  return (
    <LessonLayout
      title="Lesson 2"
      subtitle="Tile Suits"
      leftContent={
        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
              {currentGroup.title}
            </p>
            <p className="mt-3 text-base leading-7 text-foreground/90">
              {currentGroup.text}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={isFirstGroup}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Move to the previous group"
            >
              <span aria-hidden="true">←</span>
              <span>Previous</span>
            </button>

            <div className="text-sm font-medium text-muted">
              {currentGroupIndex + 1} / {lessonGroups.length}
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={isLastGroup}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-primary/40"
              aria-label="Move to the next group"
            >
              <span>Next</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      }
      rightContent={
        <div className="space-y-4">
          {
            <div className={`grid ${currentGroup.layout} gap-3`}>
              {tileImages.map((tile) => (
                <div
                  key={tile.id}
                  className="rounded-xl border border-border bg-background p-2"
                >
                  <img
                    src={tile.src}
                    alt={tile.id}
                    className="h-24 w-full rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
          }
        </div>
      }
    />
  )
}
