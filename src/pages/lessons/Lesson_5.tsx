import { useState } from 'react'
import LessonLayout from '@/pages/lessons/LessonLayout'
import placeholderOne from '@/tile_images/tile-placeholder-1.svg'
import FlowerOne from '@/tile_images/flower-1.jpg'
import FlowerTwo from '@/tile_images/flower-2.jpg'
import FlowerThree from '@/tile_images/flower-3.png'
import OneDot from '@/tile_images/1-dot.jpg'
import TwoDot from '@/tile_images/2-dot.jpg'
import ThreeDot from '@/tile_images/3-dot.jpg'
import FourDot from '@/tile_images/4-dot.jpg'
import FiveDot from '@/tile_images/5-dot.jpg'
import ThreeCrak from '@/tile_images/3-crak.jpg'
import FourCrak from '@/tile_images/4-crak.jpg'
import FiveCrak from '@/tile_images/5-crak.jpg'
import SixCrak from '@/tile_images/6-crak.jpg'
import SevenCrak from '@/tile_images/7-crak.jpg'
import TwoBam from '@/tile_images/2-bam.jpg'
import EightBam from '@/tile_images/8-bam.jpg'
import EightDot from '@/tile_images/8-dot.jpg'
import TwoCrak from '@/tile_images/2-crak.jpg'
import GreenDragon from '@/tile_images/green.jpg'
import RedDragon from '@/tile_images/red.jpg'
import Soap from '@/tile_images/soap.jpg'

/**
 * Represents a collection of lesson groups for a Mahjong teaching application.
 * Each lesson group contains a title and associated content.
 *
 * @constant lessonGroups
 * @type {Array<{ title: string, text: React.ReactNode }>}
 * @property {string} title - The title of the lesson group.
 * @property {React.ReactNode} text - The content of the lesson, which can include 
 *   JSX elements for rich formatting and interactivity.
 *
 * @example
 * const lessonGroups = [
 *   {
 *     title: 'Composing a Hand',
 *     text: (
 *       <>
 *         This lesson teaches you how to compose a hand from 14 tiles...
 *       </>
 *     ),
 *   },
 *   {
 *     title: 'Group 2',
 *     text: 'Add your lesson content here.',
 *   },
 *   {
 *     title: 'Group 3',
 *     text: 'Add your lesson content here.',
 *   },
 * ];
 */
const lessonGroups = [
	{
		title: 'Composing a Hand',
		text: (
			<>
				This lesson teaches you how to compose a hand from 14 tiles. After
				completing the content from this lesson, you will have 3 interactive
				activities to practice making a winning mahjong hand from what you have
				learned! Let&apos;s first focus on a simple line. If you have a 2026
				Mahjong card at home, you can follow along. It&apos;s the second line in
				the Consecutive Run section.
        <br />
        <br />
				<span className="text-lg font-bold text-[#1e3779]">FFF 1111 234 5555</span>
				<br />
				<br />
				Let&apos;s break this line down. <span className="text-lg font-bold text-[#1e3779]">FFF</span> The first meld is a <strong>pung</strong> of <strong>flower</strong> tiles.
				That's 3 flowers in a row.
				<br />
				<br />
				Then we have a <strong>kong</strong> of <strong>number</strong> tiles. Since this is a consecutive run, the
				Mahjong card indicates that any 5 consecutive numbers can compose this
				hand. The card shows <span className="text-lg font-bold text-[#1e3779]">1111 234 55555</span> as an example, but we could use <span className="text-lg font-bold text-[#1e3779]">2222 345 6666</span>, or any combination up to <span className="text-lg font-bold text-[#1e3779]">5555 678 9999</span>. So that Kong of 1s could be 1, 2, 3, 4, or 5.
				<br />
				<br />
				Then, we have a run of 3. If we start with <span className="text-lg font-bold text-[#1e3779]">1111</span>, then this must be <span className="text-lg font-bold text-[#1e3779]">234</span>,
				but for any consecutive numbers, it should just be the next 3 numbers
				following the kong.
				<br />
				<br />
				Finally we have another kong. Because we have 3 suits and 5 possible
				starting numbers, there are 15 total ways to make this line! Click &apos;Show
				Example&apos; to see some possible winning hands.
			</>
		),
	},
	{
		title: '2468 Hands',
		text: (
			<>
				That line was all tiles in the same suit. Let&apos;s try a more complicated hand this time, so you can see how the different colors on the card indicate the suits.
				<br />
				<br />
				From the 2468 section, find this line:
				<br />
				<br />
				<span className="text-lg font-bold text-[#74c476]">2222 DDD</span><span className="text-lg font-bold text-[#de0a26]"> 8888 DDD</span>
				<br />
				<br />
				For this line, the 2s and first 3 dragons must all be of one suit, and the 8s and last 3 dragons must be of a different suit. Click to see examples of this hand.
			</>
		),
	},
	{
		title: 'Group 3',
		text: 'Add your lesson content here.',
	},
] as const

const exampleOne = [
	FlowerOne,
	FlowerTwo,
	FlowerThree,
	OneDot,
	OneDot,
	OneDot,
	OneDot,
	TwoDot,
	ThreeDot,
	FourDot,
	FiveDot,
	FiveDot,
	FiveDot,
	FiveDot,
]

const exampleTwo = [
	FlowerOne,
	FlowerTwo,
	FlowerThree,
	ThreeCrak,
	ThreeCrak,
	ThreeCrak,
	ThreeCrak,
	FourCrak,
	FiveCrak,
	SixCrak,
	SevenCrak,
	SevenCrak,
	SevenCrak,
	SevenCrak,
]

const exampleThree = [
	TwoBam,
	TwoBam,
	TwoBam,
	TwoBam,
	GreenDragon,
	GreenDragon,
	GreenDragon,
	EightDot,
	EightDot,
	EightDot,
	EightDot,
	Soap,
	Soap,
	Soap,
]

const exampleFour = [
	TwoCrak,
	TwoCrak,
	TwoCrak,
	TwoCrak,
	RedDragon,
	RedDragon,
	RedDragon,
	EightBam,
	EightBam,
	EightBam,
	EightBam,
	GreenDragon,
	GreenDragon,
	GreenDragon,
]

const emptyExample = Array.from({ length: 14 }, () => placeholderOne)

function TileExample({ title, tiles }: { title: string; tiles: string[] }) {
	return (
		<div className="rounded-2xl border border-border bg-surface p-4">
			<p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-primary">
				{title}
			</p>
			<div className="grid grid-cols-7 gap-2 sm:grid-cols-14">
				{tiles.map((src, index) => (
					<div
						key={`${title}-${index}`}
						className="flex min-h-20 items-center justify-center rounded-xl border border-border bg-background p-1"
					>
						<img
							src={src}
							alt={`Example tile ${index + 1}`}
							className="h-16 w-full rounded-md object-contain"
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default function LessonFive() {
	const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
	const [showExample, setShowExample] = useState(false)
	const [exampleViewed, setExampleViewed] = useState(false)
	const currentGroup = lessonGroups[currentGroupIndex]
	const isFirstGroup = currentGroupIndex === 0
	const isLastGroup = currentGroupIndex === lessonGroups.length - 1

	function handlePrevious() {
		if (!isFirstGroup) {
			setCurrentGroupIndex((previous) => previous - 1)
			setShowExample(false)
			setExampleViewed(false)
		}
	}

	function handleNext() {
		if (!isLastGroup && exampleViewed) {
			setCurrentGroupIndex((previous) => previous + 1)
			setShowExample(false)
			setExampleViewed(false)
		}
	}

	return (
		<LessonLayout
			title="Lesson 5"
			subtitle="Composing a Hand"
			leftContent={
				<div className="space-y-5">
					<div className="rounded-xl border border-border bg-background p-4">
						<p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary">
							{currentGroup.title}
						</p>
						<div className="mt-3 text-base leading-7 text-foreground/90">
							{currentGroup.text}
						</div>

						<button
							type="button"
							onClick={() => {
								if (!showExample) setExampleViewed(true)
								setShowExample((visible) => !visible)
							}}
							className="mt-5 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
						>
							{showExample ? 'Hide Example' : 'Show Example'}
						</button>
					</div>

					{showExample && (
						<div className="space-y-4">
							{currentGroupIndex === 0 ? (
								<>
									<TileExample title="Example 1" tiles={exampleOne} />
									<TileExample title="Example 2" tiles={exampleTwo} />
								</>
							) : currentGroupIndex === 1 ? (
								<>
									<TileExample title="Example 1" tiles={exampleThree} />
									<TileExample title="Example 2" tiles={exampleFour} />
								</>
							) : (
								<TileExample title="Example" tiles={emptyExample} />
							)}
						</div>
					)}

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
									disabled={!exampleViewed}
									className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
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
		/>
	)
}
