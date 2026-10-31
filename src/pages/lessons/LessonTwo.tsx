import LessonLayout from '@/pages/lessons/LessonLayout'
import placeholderOne from '@/tile_images/tile-placeholder-1.svg'
import placeholderTwo from '@/tile_images/tile-placeholder-2.svg'
import placeholderThree from '@/tile_images/tile-placeholder-3.svg'

const tileImages = [placeholderOne, placeholderTwo, placeholderThree]

export default function LessonTwo() {
  return (
    <LessonLayout
      title="Lesson 2"
      subtitle="Overview of the lesson"
      leftContent={
        <div className="space-y-4">
          <p className="text-base leading-7 text-foreground/90">
            This is the second lesson placeholder page. Add your written lesson content to this panel.
          </p>
          <p className="text-base leading-7 text-foreground/90">
            Keep the structure consistent: explanation, examples, and guided practice.
          </p>
          <div className="rounded-xl border border-dashed border-border bg-background p-4">
            <h2 className="text-lg font-semibold">Key ideas</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>Use the left column for longer instructional text.</li>
              <li>Use the right column for image references or exercises.</li>
              <li>Place each tile image in the tile_images folder when ready.</li>
            </ul>
          </div>
        </div>
      }
      rightContent={
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Visual reference</h2>
          <div className="grid grid-cols-3 gap-3">
            {tileImages.map((src, index) => (
              <div key={src} className="rounded-xl border border-border bg-background p-2">
                <img
                  src={src}
                  alt={`Placeholder tile ${index + 1}`}
                  className="h-24 w-full rounded-md object-cover"
                />
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-dashed border-border bg-background p-4 text-sm text-muted">
            Activity panel for matching, sorting, or recognition tasks.
          </div>
        </div>
      }
    />
  )
}
