import LessonLayout from '@/pages/lessons/LessonLayout'
import placeholderOne from '@/tile_images/tile-placeholder-1.svg'
import placeholderTwo from '@/tile_images/tile-placeholder-2.svg'
import placeholderThree from '@/tile_images/tile-placeholder-3.svg'

const tileImages = [placeholderOne, placeholderTwo, placeholderThree]

export default function LessonFour() {
  return (
    <LessonLayout
      title="Lesson 4"
      subtitle="Placeholder lesson scaffold"
      leftContent={
        <div className="space-y-4">
          <p className="text-base leading-7 text-foreground/90">
            Lesson 4 scaffold for future content.
          </p>
        </div>
      }
      rightContent={
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {tileImages.map((src, index) => (
              <div key={`${src}-${index}`} className="rounded-xl border border-border bg-background p-2">
                <img src={src} alt={`Lesson 4 placeholder ${index + 1}`} className="h-24 w-full rounded-md object-cover" />
              </div>
            ))}
          </div>
        </div>
      }
    />
  )
}
