import LessonLayout from '@/pages/lessons/LessonLayout'
import placeholderOne from '@/tile_images/tile-placeholder-1.svg'

export default function LessonFive() {
  return (
    <LessonLayout
      title="Lesson 5"
      subtitle="Placeholder lesson scaffold"
      leftContent={
        <div className="space-y-4">
          <p className="text-base leading-7 text-foreground/90">
            Lesson 5 scaffold for future content.
          </p>
        </div>
      }
      rightContent={
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-background p-2">
            <img src={placeholderOne} alt="Lesson 5 placeholder tile" className="h-32 w-full rounded-md object-cover" />
          </div>
        </div>
      }
    />
  )
}
