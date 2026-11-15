import { useState } from 'react'
import LessonLayout from '@/pages/lessons/LessonLayout'
import placeholderOne from '@/tile_images/tile-placeholder-1.svg'
import placeholderTwo from '@/tile_images/tile-placeholder-2.svg'
import placeholderThree from '@/tile_images/tile-placeholder-3.svg'
import mahjCard from '@/tile_images/2026-national-mah-jongg-league-playing-card-8553468 copy.jpg'

const tileImages = [placeholderOne, placeholderTwo, placeholderThree]

const lessonGroups = [
	{
		title: 'The NMJL Card',
		description: 'Every year, the National Mah Jongg League (NJML) comes out with a new card. It lists the winning hands for that year. For American Mahjong, this is essential to gameplay so that everyone is playing by the same rules. They come out with a new card every year to keep the game fresh. Some players choose to memorize the card, but most players have it handy throughout the game as they decide which hand they are going for.',
		images: [mahjCard],
	},
  {
		title: 'Features of the Card',
		description: 'The inside of the card has sections that organize the types of hands. This can help a player narrow down what they are going to try and go for. In the 2026 card, there are 9 sections of types of hands. The back of the card has rules and information about the game.',
		images: [placeholderOne, placeholderTwo, placeholderThree],
	},
  {
		title: 'The Sections',
		description: 'The 2026 card has a section with special 2026-themed hands, then there are hands that use only even numbers (2468), Any Like Numbers is represented by 1s but 1-9 all apply as long as they match. Quints is similar to any like numbers, but you need jokers to accomplish these hands (since there are only 4 of each number per suit). Consecutive run is usually a pretty good starting place for new players, and it is conveniently located front and center on the card. Then you have the odd numbers (13579). All the way on the right is Winds and Dragons, which are hands that use very few or no number tiles. There is also the 369 section, and finally, singles and pairs, which is the hardest section to play.',
		images: [placeholderOne, placeholderTwo, placeholderThree],
	},
  {
		title: 'What does everything stand for?',
		description: 'In each line, there are a combination of letters and numbers representing the 14 tiles in that hand. The numbers are the number tiles, a D stands for Dragon, F stands for Flower, N for North Wind, E for East Wind, W for West Wind, S for South Wind, and any 0s on the card are Soaps (the white dragon).',
		images: [placeholderOne, placeholderTwo, placeholderThree],
	},
	{
		title: 'What do the colors mean?',
		description: 'The hands are not exact combinations of tiles. They are abstract, so a 1 on a hand can be a 1 crak, 1 bam, or a 1 dot. The colors represent a suit, but do not correspond to a fixed suit. It is just a means of showing which tiles must match in their suit, but you can choose bams, craks, or dots for that entire run or meld that is the same color. This applies to the Dragons as well. If you choose to go for a hand that has number tiles and dragons in a matching color, the dragons must be in a coordinating suit (Craks-Red, Bams-Green, Dots-White).',
		images: [placeholderTwo, placeholderThree, placeholderOne],
	},
	{
		title: 'What about the Cs, Xs, and Values?',
		description: (<>
      C stands for a <strong>Closed</strong> hand. We will cover exposures in a later lesson, but it just means you cannot make exposures and pick up from the discarded tiles except for calling Mahjong. Typically these hands are more difficult to get and have singles/pairs. The singles and pairs section of hands is actually made up of only Closed hands. X stands for <strong>Exposed</strong>. This means you can make exposures to get this hand. Usually beginners should start with Exposed hands. The point values on the righthand side of each line are for playing with money/betting on the game.
      </>
    ),
		images: [placeholderThree, placeholderOne, placeholderTwo],
	},
  {
		title: 'More to learn',
		description: (
			<>
				As you master the game, there is always more to learn! This{' '}
				<a
					href="https://mahjpalazzo.com/blogs/learn-mahjong/what-is-the-nmjl-card"
					target="_blank"
					rel="noreferrer"
					style={{ textDecoration: 'underline', textUnderlineOffset: '0.2em', color: 'inherit' }}
				>
					blog post
				</a>{' '}
				explains more about the card.
			</>
		),
		images: [placeholderThree, placeholderOne, placeholderTwo],
	},

] as const

export default function LessonFour() {
	const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
	const isFirstGroup = currentGroupIndex === 0
	const isLastGroup = currentGroupIndex === lessonGroups.length - 1
	const currentGroup = lessonGroups[currentGroupIndex]
	const currentGroupImages = currentGroup.images ?? tileImages

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
			title="Lesson 4"
			subtitle="The NMJL Card"
			leftContent={
				<div className="space-y-5">
					<div className="rounded-xl border border-border bg-background p-4">
						<p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
							{currentGroup.title}
						</p>
						<p className="mt-3 text-base leading-7 text-foreground/90">
							{currentGroup.description}
						</p>
					</div>

					<div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
						<div className="flex justify-start">
							{!isFirstGroup && (
								<button
									type="button"
									onClick={handlePrevious}
									className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-background"
									aria-label="Move to the previous group"
								>
									<span aria-hidden="true">←</span>
									<span>Previous</span>
								</button>
							)}
						</div>

						<div className="justify-self-center text-sm font-medium text-muted">
							{currentGroupIndex + 1} / {lessonGroups.length}
						</div>

						<div className="flex justify-end">
							{!isLastGroup && (
								<button
									type="button"
									onClick={handleNext}
									className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
									aria-label="Move to the next group"
								>
									<span>Next</span>
									<span aria-hidden="true">→</span>
								</button>
							)}
						</div>
					</div>
				</div>
			}
			rightContent={
				<div className="space-y-4">
					{currentGroupImages.length === 1 ? (
						<div className="rounded-xl border border-border bg-background p-2">
							<img
								src={currentGroupImages[0]}
								alt={`${currentGroup.title} image`}
								className="h-full w-full rounded-md object-cover"
							/>
						</div>
					) : (
						<div className="grid grid-cols-3 gap-3">
							{currentGroupImages.map((src, index) => (
								<div
									key={`${currentGroup.title}-${index}`}
									className="rounded-xl border border-border bg-background p-2"
								>
									<img
										src={src}
										alt={`${currentGroup.title} placeholder ${index + 1}`}
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
