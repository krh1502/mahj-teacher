import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LessonLayout from '@/pages/lessons/LessonLayout'
import placeholderOne from '@/tile_images/tile-placeholder-1.svg'
import placeholderTwo from '@/tile_images/tile-placeholder-2.svg'
import placeholderThree from '@/tile_images/tile-placeholder-3.svg'
import SixDot from '@/tile_images/6-dot.jpg'
import EightBam from '@/tile_images/8-bam.jpg'
import ThreeCrak from '@/tile_images/3-crak.jpg'
import FiveDot from '@/tile_images/5-dot.jpg'
import OneBam from '@/tile_images/1-bam.jpg'
import FourBam from '@/tile_images/4-bam.jpg'
import SevenBam from '@/tile_images/7-bam.jpg'
import GreenDragon from '@/tile_images/green.jpg'
import TwoCrak from '@/tile_images/2-crak.jpg'
import FiveCrak from '@/tile_images/5-crak.jpg'
import NineCrak from '@/tile_images/9-crak.jpg'
import RedDragon from '@/tile_images/red.jpg'
import ThreeDot from '@/tile_images/3-dot.jpg'
import EightDot from '@/tile_images/8-dot.jpg'
import Soap from '@/tile_images/soap.jpg'
import FiveBam from '@/tile_images/5-bam.jpg'
import SevenCrak from '@/tile_images/7-crak.jpg'

const tilePlaceholders = [placeholderOne, placeholderTwo, placeholderThree]

const lessonGroups = [
	{
		title: 'The 3 Suits',
		text: (
			<>
				This lesson will introduce the <strong>3 suits</strong> in Mahjong. You can think of them similarly to suits in a deck of playing cards, like clubs or hearts. In Mahjong, we have the <strong>Bams</strong>, short for Bamboo, <strong>Craks</strong>, and <strong>Dots</strong>. Only number tiles and dragons have suits. Click through to learn about each suit and its corresponding dragon.
			</>
		),
		imageCount: 4,
		layout: 'grid-cols-2',
		images: [SixDot, EightBam, ThreeCrak, FiveDot],
	},
	{
		title: 'Bams (Bamboos)',
		text: (
			<>
				The <strong>Bams</strong> are usually represented by straight lines. The number of lines correlates to the number on the tile. The <strong>green dragon</strong> goes with the Bams. A good way to remember this is that bamboo shoots are green.
			</>
		),
		imageCount: 4,
		layout: 'grid-cols-2',
		images: [OneBam, FourBam, SevenBam, GreenDragon],
	},
	{
		title: 'Craks',
		text: (
			<>
				The <strong>craks</strong> are represented by Chinese characters. The <strong>red dragon</strong> corresponds to the craks. One way to remember this is by thinking of when your skin "Cracks", the blood is red. Kind of gross, but it helps to remember!
			</>
		),
		imageCount: 4,
		layout: 'grid-cols-2',
		images: [TwoCrak, FiveCrak, NineCrak, RedDragon],
	},
	{
		title: 'Dots',
		text: (
			<>
				The <strong>dots</strong> are usually represented by small dots. The number of dots is the number on the tile. The corresponding dragon is the <strong>white dragon</strong>. The white dragon is often called the "Soap", as it looks like a bar of soap in a classic tile set.
			</>
		),
		imageCount: 4,
		layout: 'grid-cols-2',
		images: [ThreeDot, SixDot, EightDot, Soap],
	},
] as const

const activityCategories = [
	{ id: 'bam', label: 'Bam' },
	{ id: 'crak', label: 'Crak' },
	{ id: 'dot', label: 'Dot' },
] as const

const activityTiles = [
	{ id: 'bird-bam', name: 'Bird Bam', category: 'bam', image: OneBam },
	{ id: '5-bam', name: '5 Bam', category: 'bam', image: FiveBam },
	{ id: '8-bam', name: '8 Bam', category: 'bam', image: EightBam },
	{ id: 'green-dragon', name: 'Green Dragon', category: 'bam', image: GreenDragon },
	{ id: '3-dot', name: '3 Dot', category: 'dot', image: ThreeDot },
	{ id: '6-dot', name: '6 Dot', category: 'dot', image: SixDot },
	{ id: 'soap', name: 'Soap', category: 'dot', image: Soap },
	{ id: '2-crak', name: '2 crak', category: 'crak', image: TwoCrak },
	{ id: '7-crak', name: '7 crak', category: 'crak', image: SevenCrak },
	{ id: 'red-dragon', name: 'Red Dragon', category: 'crak', image: RedDragon },
] as const

const categoryLabelMap: Record<string, string> = {
	bam: 'Bam',
	crak: 'Crak',
	dot: 'Dot',
}

function shuffleTiles<T>(items: T[]) {
	const nextItems = [...items]
	for (let index = nextItems.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1))
		;[nextItems[index], nextItems[randomIndex]] = [nextItems[randomIndex], nextItems[index]]
	}
	return nextItems
}

export default function LessonTwo() {
	const navigate = useNavigate()
	const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
	const [showActivity, setShowActivity] = useState(false)
	const [activityTilesState, setActivityTilesState] = useState(
		activityTiles.map((tile) => ({ ...tile, placed: false }))
	)
	const [draggedTileId, setDraggedTileId] = useState<string | null>(null)
	const [dropStatus, setDropStatus] = useState<Record<string, 'correct' | 'incorrect' | null>>({
		bam: null,
		crak: null,
		dot: null,
	})
	const [popup, setPopup] = useState<
		| { type: 'correct'; tileName: string; categoryName: string }
		| { type: 'incorrect'; tileName: string }
		| { type: 'special'; tileName: string }
		| { type: 'completion' }
		| null
	>(null)
	const [tileOrder] = useState<string[]>(() => shuffleTiles(activityTiles.map((tile) => tile.id)))

	const currentGroup = lessonGroups[currentGroupIndex]
	const isLessonContentComplete = currentGroupIndex === lessonGroups.length - 1
	const isActivityComplete = activityTilesState.every((tile) => tile.placed)

	const tileImages = useMemo(
		() =>
			Array.from({ length: currentGroup.imageCount }, (_, index) => ({
				id: `${currentGroup.title}-${index + 1}`,
				src: 'images' in currentGroup
					? currentGroup.images[index] ?? placeholderOne
					: tilePlaceholders[Math.floor(Math.random() * tilePlaceholders.length)],
			})),
		[currentGroup]
	)

	const shuffledAvailableTiles = useMemo(
		() =>
			activityTilesState
				.filter((tile) => !tile.placed)
				.sort((a, b) => tileOrder.indexOf(a.id) - tileOrder.indexOf(b.id)),
		[activityTilesState, tileOrder]
	)

	const isLastGroup = currentGroupIndex === lessonGroups.length - 1
	const isFirstGroup = currentGroupIndex === 0

	const placedTilesByCategory = activityCategories.reduce(
		(acc, category) => {
			acc[category.id] = activityTilesState.filter(
				(tile) => tile.placed && tile.category === category.id
			)
			return acc
		},
		{} as Record<string, typeof activityTilesState>
	)

	function handlePrevious() {
		if (!isFirstGroup) {
			setCurrentGroupIndex((previous) => previous - 1)
		}
	}

	function handleNext() {
		if (isLessonContentComplete) {
			setShowActivity(true)
			return
		}
		setCurrentGroupIndex((previous) => previous + 1)
	}

	function handleTileDragStart(tileId: string) {
		const tile = activityTilesState.find((entry) => entry.id === tileId)
		if (!tile || tile.placed) return
		setDraggedTileId(tileId)
	}

	function handleTileDrop(categoryId: string) {
		if (!draggedTileId) return

		const tile = activityTilesState.find((entry) => entry.id === draggedTileId)
		if (!tile || tile.placed) {
			setDraggedTileId(null)
			return
		}

		const isCorrect = tile.category === categoryId
		if (isCorrect) {
			setActivityTilesState((previous) =>
				previous.map((entry) =>
					entry.id === tile.id ? { ...entry, placed: true } : entry
				)
			)
			setDropStatus((previous) => ({ ...previous, [categoryId]: 'correct' }))
			if (tile.id === 'bird-bam') {
				setPopup({ type: 'special', tileName: tile.name })
			} else {
				setPopup({
					type: 'correct',
					tileName: tile.name,
					categoryName: categoryLabelMap[categoryId],
				})
			}
		} else {
			setDropStatus((previous) => ({ ...previous, [categoryId]: 'incorrect' }))
			setPopup({ type: 'incorrect', tileName: tile.name })
		}

		setDraggedTileId(null)
	}

	function closePopup() {
		const wasIncorrect = popup?.type === 'incorrect'
		const wasCompletion = popup?.type === 'completion'
		setPopup(null)
		if (wasIncorrect) {
			setDropStatus((previous) => {
				const nextStatus = { ...previous }
				for (const key of Object.keys(nextStatus)) {
					nextStatus[key] = null
				}
				return nextStatus
			})
		}
		if (wasCompletion) {
			navigate('/lessons/3')
		}
	}

	if (isActivityComplete && popup?.type !== 'completion') {
		setPopup({ type: 'completion' })
	}

	return (
		<div className="space-y-8">
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

						<div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
							<div className="flex justify-start">
								{!isFirstGroup && (
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
										disabled={isLastGroup && showActivity}
										className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-primary/40"
										aria-label={isLessonContentComplete ? 'Start the knowledge check activity' : 'Move to the next group'}
									>
										{isLessonContentComplete ? (
											<span>Next</span>
										) : (
											<>
												<span>Next</span>
												<span aria-hidden="true">→</span>
											</>
										)}
									</button>
								)}
							</div>
						</div>
					</div>
				}
				rightContent={
					<div className="flex w-full justify-center">
						<div className="mx-auto w-fit max-w-full">
							<div className={`grid ${currentGroup.layout} justify-center gap-3`}>
								{tileImages.map((tile) => (
									<div
										key={tile.id}
										className="w-28 rounded-xl border border-border bg-background p-2"
									>
										<img
											src={tile.src}
											alt={tile.id}
											className="h-24 w-full rounded-md object-contain"
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				}
			/>

			{!showActivity && isLessonContentComplete && (
				<div className="flex justify-end">
					<button
						type="button"
						onClick={handleNext}
						className="rounded-md bg-primary px-5 py-3 text-base font-medium text-primary-foreground hover:bg-primary-hover"
					>
						Finished learning. Click here to start knowledge check
					</button>
				</div>
			)}

			{showActivity && (
				<div
					className="relative overflow-hidden rounded-3xl border border-[#8F7466] bg-[#8F7466]"
				>
					<div className="relative z-10 p-6">
						<div className="mb-5">
							<h2 className="text-2xl font-semibold text-white">Activity</h2>
							<p className="mt-2 max-w-2xl text-sm leading-6 text-white/90">
								Using what you learned in the lesson, practice sorting the tiles into their categories.
							</p>
						</div>

						<div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
							<div className="rounded-2xl border border-white/30 bg-black/10 p-4 backdrop-blur-[2px]">
								<div className="grid grid-cols-2 gap-3">
									{shuffledAvailableTiles.map((tile) => (
										<div
											key={tile.id}
											draggable
											onDragStart={() => handleTileDragStart(tile.id)}
											className="mx-auto w-fit cursor-grab rounded-xl border border-white/40 bg-white/10 p-1 text-center shadow-sm active:cursor-grabbing"
										>
											<img
												src={tile.image}
												alt={tile.name}
												className="h-32 w-24 rounded-md object-contain"
											/>
										</div>
									))}
								</div>
							</div>

							<div className="flex flex-col gap-3">
								{activityCategories.map((category) => (
									<div
										key={category.id}
										onDragOver={(event) => event.preventDefault()}
										onDrop={() => handleTileDrop(category.id)}
										className={`flex min-h-[138px] flex-col rounded-xl border-2 border-dashed p-3 transition-colors ${
											dropStatus[category.id] === 'correct'
												? 'border-green-400 bg-green-400/10'
												: dropStatus[category.id] === 'incorrect'
													? 'border-red-400 bg-red-400/10'
													: 'border-white/80 bg-white/5'
										}`}
									>
										<div className="flex min-h-[110px] flex-col items-center justify-center text-center">
											<p className="text-base font-semibold text-white">{category.label}</p>
											<div className="mt-2 flex w-full flex-wrap justify-center gap-2">
												{placedTilesByCategory[category.id]?.map((tile) => (
													<div
														key={tile.id}
														className="w-fit rounded-md border border-white/40 bg-white/10 p-1"
													>
														<img
															src={tile.image}
															alt={tile.name}
															className="mx-auto h-20 w-16 rounded-md object-contain"
														/>
													</div>
												))}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}

			{popup ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
					<div
						className={`w-full max-w-md rounded-2xl border p-6 shadow-xl ${
							popup.type === 'correct'
								? 'border-green-500 bg-green-700 text-white'
								: popup.type === 'incorrect'
									? 'border-red-500 bg-red-700 text-white'
									: popup.type === 'special'
										? 'border-amber-500 bg-amber-700 text-white'
										: 'border-green-500 bg-green-700 text-white'
						}`}
					>
						{popup.type === 'correct' ? (
							<p className="text-base leading-7 text-white">
								Correct, this tile was a {popup.tileName}, and it fits into the {popup.categoryName} tiles.
							</p>
						) : popup.type === 'incorrect' ? (
							<p className="text-base leading-7 text-white">
								Good try, but not quite. Try another tile type.
							</p>
						) : popup.type === 'special' ? (
							<div className="space-y-3 text-white">
								<p className="text-base leading-7">
									Congrats! You uncovered a special tile, which is the 1 Bam. In most American Mahjong sets, this is called the bird bam and will picture a bird. Some people have special rules or traditions when they discard the Bird Bam. Learn more <a href="https://en.wikipedia.org/wiki/Mahjong_tiles#Bamboo" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">here</a>.
								</p>
							</div>
						) : (
							<div className="space-y-4">
								<p className="text-base leading-7 text-white">
									Great Job! Move on to lesson 3 here.
								</p>
								<button
									type="button"
									onClick={() => navigate('/lessons/3')}
									className="inline-flex w-full items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-100"
								>
									Go to Lesson 3
								</button>
							</div>
						)}
						{popup.type !== 'completion' && popup.type !== 'special' && (
							<div className="mt-5 flex justify-end">
								<button
									type="button"
									onClick={closePopup}
									className={`rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors ${
										popup.type === 'correct'
											? 'bg-white text-green-900 hover:bg-green-100'
											: 'bg-white text-red-900 hover:bg-red-100'
									}`}
								>
									Close
								</button>
							</div>
						)}
						{popup.type === 'special' && (
							<div className="mt-5 flex justify-end">
								<button
									type="button"
									onClick={closePopup}
									className="rounded-md bg-white px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-100"
								>
									Close
								</button>
							</div>
						)}
					</div>
				</div>
			) : null}
		</div>
	)
}
