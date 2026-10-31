import { useMemo, useState } from 'react'
import LessonLayout from '@/pages/lessons/LessonLayout'
import placeholderOne from '@/tile_images/tile-placeholder-1.svg'

const tilePlaceholder = placeholderOne

const lessonGroups = [
	{
		title: 'Group 1',
		text: 'These are the number tiles. They go from 1-9. There are 4 of each number in each of the 3 suits in an American Mahjong tile set.',
		imageCount: 9,
		layout: 'grid-cols-3',
	},
	{
		title: 'Group 2',
		text: 'There are the Winds. There is North, East, West, and South. In an American Mahjong set, there are 4 of each of the wind tiles.',
		imageCount: 4,
		layout: 'grid-cols-2',
	},
	{
		title: 'Group 3',
		text: 'These are the Dragons. There are 3 kinds of Dragons, Red Dragon, Green Dragon, and White Dragon, which is sometimes called the “Soap.” In an American Mahjong set, there are 4 of each Dragon tile.',
		imageCount: 3,
		layout: 'dragon',
	},
	{
		title: 'Group 4',
		text: 'These are Flower tiles. There are 8 of these in an American Mahjong set, and they are always distinct from each other. The distinction carries no meaning in the American game. Sometimes they also will be labeled with a season and/or a number, but this can be disregarded in American Mahjong. Each flower tile acts the same in American Mahjong.',
		imageCount: 4,
		layout: 'grid-cols-2',
	},
	{
		title: 'Group 5',
		text: 'Finally we have the Jokers. There are 8 of these in an American Mahjong set. Depending on the tile set, they may be identical or distinctive, but they all mean the same thing.',
		imageCount: 1,
		layout: 'grid-cols-1',
	},
] as const

export default function LessonOne() {
	const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
	const currentGroup = lessonGroups[currentGroupIndex]

	const tileImages = useMemo(
		() =>
			Array.from({ length: currentGroup.imageCount }, (_, index) => ({
				id: `${currentGroup.title}-${index + 1}`,
				src: tilePlaceholder,
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
			title="Lesson 1"
			subtitle="Tile groups in an American Mahjong set"
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
					{currentGroup.layout === 'dragon' ? (
						<div className="space-y-3">
							<div className="grid grid-cols-2 gap-3">
								{tileImages.slice(0, 2).map((tile) => (
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
							<div className="flex justify-center">
								<div className="w-1/2 rounded-xl border border-border bg-background p-2">
									<img
										src={tileImages[2].src}
										alt={tileImages[2].id}
										className="h-24 w-full rounded-md object-cover"
									/>
								</div>
							</div>
						</div>
					) : (
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
					)}
				</div>
			}
		/>
	)
}
