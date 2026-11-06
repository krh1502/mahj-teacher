import LessonLayout from '@/pages/lessons/LessonLayout'
import placeholderOne from '@/tile_images/tile-placeholder-1.svg'
import placeholderTwo from '@/tile_images/tile-placeholder-2.svg'
import placeholderThree from '@/tile_images/tile-placeholder-3.svg'

const tileImages = [placeholderOne, placeholderTwo, placeholderThree]

export default function LessonThree() {
  return (
    <LessonLayout
      title="Lesson 3"
      subtitle="Overview of the lesson"
      leftContent={
        <div className="space-y-4">
          <p className="text-base leading-7 text-foreground/90">
            This is the third lesson placeholder page. Add your lesson explanation here.
          </p>
          <p className="text-base leading-7 text-foreground/90">
            The interface is intentionally simple right now so you can focus on content and interaction design.
          </p>
          <div className="rounded-xl border border-dashed border-border bg-background p-4">
            <h2 className="text-lg font-semibold">Learning goals</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>Introduce the concept in the left panel.</li>
              <li>Show examples or tiles in the right panel.</li>
              <li>Add interactivity later without changing the page structure.</li>
            </ul>
          </div>
        </div>
      }
      rightContent={
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Practice panel</h2>
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
            Add an exercise, checklist, or drag-and-drop task here when you are ready.
          </div>
        </div>
      }
    />
  )
}
