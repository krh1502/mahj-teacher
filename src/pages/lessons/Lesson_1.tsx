import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LessonLayout from '@/pages/lessons/LessonLayout'
import tablePlaceholder from '@/tile_images/table-placeholder.svg'
import placeholderOne from '@/tile_images/tile-placeholder-1.svg'
import placeholderTwo from '@/tile_images/tile-placeholder-2.svg'
import placeholderThree from '@/tile_images/tile-placeholder-3.svg'

const lessonGroups = [
	{
		title: 'Number Tiles',
		text: ( 
			<>
			These are the <strong>number tiles</strong>. They go from 1-9. There are 4 of each number in each of the 3 suits in an American Mahjong tile set.
			</>
		),
		imageCount: 9,
		layout: 'grid-cols-3',
	},
	{
		title: 'Winds',
		text: (
			<>
			These are the <strong>Winds</strong>. There is North, East, West, and South. In an American Mahjong set, there are 4 of each of the wind tiles.
			</>
		),
		imageCount: 4,
		layout: 'grid-cols-2',
	},
	{
		title: 'Dragons',
		text: (
			<>
			These are the <strong>Dragons</strong>. There are 3 kinds of Dragons, <strong>Red Dragon</strong>, <strong>Green Dragon</strong>, and <strong>White Dragon</strong>, which is sometimes called the “Soap.” In an American Mahjong set, there are 4 of each Dragon tile.
			</>
		),
		imageCount: 3,
		layout: 'dragon',
	},
	{
		title: 'Flowers',
		text: (
			<>
			These are <strong>Flower tiles</strong>. There are 8 flower tiles in an American Mahjong set, and they are always distinct from each other. The distinction carries no meaning in the American game. Sometimes they also will be labeled with a season and/or a number, but this can be disregarded in American Mahjong. Each flower tile acts the same in American Mahjong.
			</>
		),
		imageCount: 4,
		layout: 'grid-cols-2',
	},
	{
		title: 'Jokers',
		text: (
			<>
			Finally we have the <strong>Jokers</strong>. There are 8 jokers in an American Mahjong set. Depending on the tile set, they may be identical or distinctive, but they all mean the same thing.
			</>),
		imageCount: 1,
		layout: 'grid-cols-1',
	},
] as const

const activityCategories = [
	{ id: 'number', label: 'Number' },
	{ id: 'wind', label: 'Wind' },
	{ id: 'flower', label: 'Flower' },
	{ id: 'dragon', label: 'Dragon' },
	{ id: 'joker', label: 'Joker' },
] as const

const activityTiles = [
	{ id: '1-bam', name: '1 Bam', category: 'number', image: placeholderOne },
	{ id: '4-crak', name: '4 Crak', category: 'number', image: placeholderTwo },
	{ id: '9-dot', name: '9 Dot', category: 'number', image: placeholderThree },
	{ id: 'soap', name: 'Soap', category: 'dragon', image: placeholderOne },
	{ id: 'red-dragon', name: 'Red Dragon', category: 'dragon', image: placeholderTwo },
	{ id: 'green-dragon', name: 'Green Dragon', category: 'dragon', image: placeholderThree },
	{ id: 'flower', name: 'Flower', category: 'flower', image: placeholderOne },
	{ id: 'east-wind', name: 'East Wind', category: 'wind', image: placeholderTwo },
	{ id: 'north-wind', name: 'North Wind', category: 'wind', image: placeholderThree },
	{ id: 'joker', name: 'Joker', category: 'joker', image: placeholderOne },
] as const

const categoryLabelMap: Record<string, string> = {
	number: 'Number',
	wind: 'Wind',
	flower: 'Flower',
	dragon: 'Dragon',
	joker: 'Joker',
}

function shuffleTiles<T>(items: T[]) {
	const nextItems = [...items]
	for (let index = nextItems.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1))
		;[nextItems[index], nextItems[randomIndex]] = [nextItems[randomIndex], nextItems[index]]
	}
	return nextItems
}

export default function LessonOne() {
	const navigate = useNavigate()
	const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
	const [showActivity, setShowActivity] = useState(false)
	const [activityTilesState, setActivityTilesState] = useState(
		activityTiles.map((tile) => ({
			...tile,
			placed: false,
		}))
	)
	const [draggedTileId, setDraggedTileId] = useState<string | null>(null)
	const [dropStatus, setDropStatus] = useState<Record<string, 'correct' | 'incorrect' | null>>({
		number: null,
		wind: null,
		flower: null,
		dragon: null,
		joker: null,
	})
	const [popup, setPopup] = useState<
		| { type: 'correct'; tileName: string; categoryName: string }
		| { type: 'incorrect'; tileName: string }
		| { type: 'completion' }
		| null
	>(null)
	const [tileOrder] = useState<string[]>(() =>
		shuffleTiles(activityTiles.map((tile) => tile.id))
	)

	const currentGroup = lessonGroups[currentGroupIndex]
	const isLessonContentComplete = currentGroupIndex === lessonGroups.length - 1
	const isActivityComplete = activityTilesState.every((tile) => tile.placed)

	const tileImages = useMemo(
		() =>
			Array.from({ length: currentGroup.imageCount }, (_, index) => ({
				id: `${currentGroup.title}-${index + 1}`,
				src: placeholderOne,
			})),
		[currentGroup.imageCount, currentGroup.title]
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
		if (!tile || tile.placed) {
			return
		}
		setDraggedTileId(tileId)
	}

	function handleTileDrop(categoryId: string) {
		if (!draggedTileId) {
			return
		}

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
			setPopup({
				type: 'correct',
				tileName: tile.name,
				categoryName: categoryLabelMap[categoryId],
			})
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
			navigate('/lessons/2')
		}
	}

	if (isActivityComplete && popup?.type !== 'completion') {
		setPopup({ type: 'completion' })
	}

	return (
		<div className="space-y-8">
			<LessonLayout
				title="Lesson 1"
				subtitle="Types of Tiles"
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
					className="relative overflow-hidden rounded-3xl border border-border bg-surface"
					style={{
						backgroundImage: `url(${tablePlaceholder})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					<div className="absolute inset-0 bg-foreground/15" />

					<div className="relative z-10 p-6">
						<div className="mb-5">
							<h2 className="text-2xl font-semibold text-white">Activity</h2>
							<p className="mt-2 max-w-2xl text-sm leading-6 text-white/90">
								Using what you learned in the lesson, practice sorting the tiles into their categories.
							</p>
						</div>

						<div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
							<div className="rounded-2xl border border-white/30 bg-black/10 p-4 backdrop-blur-[2px]">
								<div className="grid grid-cols-2 gap-3">
									{shuffledAvailableTiles.map((tile) => (
										<div
											key={tile.id}
											draggable
											onDragStart={() => handleTileDragStart(tile.id)}
											className="cursor-grab rounded-xl border border-white/40 bg-white/10 p-2 text-center shadow-sm active:cursor-grabbing"
										>
											<img
												src={tile.image}
												alt={tile.name}
												className="h-20 w-full rounded-md object-cover"
											/>
											<div className="mt-2 text-[10px] font-medium text-white/95">
												{tile.name}
											</div>
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
														className="w-[110px] rounded-md border border-white/40 bg-white/10 p-2"
													>
														<img
															src={tile.image}
															alt={tile.name}
															className="mx-auto h-14 w-full rounded-md object-cover"
														/>
														<div className="mt-1 text-[9px] font-medium text-white/95">
															{tile.name}
														</div>
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
									: 'border-green-500 bg-green-700 text-white'
						}`}
					>
						{popup.type === 'correct' ? (
							<p className="text-base leading-7 text-white">
								Correct, this tile was a {popup.tileName}, and it fits into the {popup.categoryName} tiles.
							</p>
						) : popup.type === 'incorrect' ? (
							<p className="text-base leading-7 text-white">
								Good try. This is {popup.tileName.startsWith('East') || popup.tileName.startsWith('East ') || popup.tileName.startsWith('East Wind') ? 'an' : 'a'} {popup.tileName}, try another tile type.
							</p>
						) : (
							<div className="space-y-4">
								<p className="text-base leading-7 text-white">
									Great Job! Move on to lesson 2 here.
								</p>
								<button
									type="button"
									onClick={() => navigate('/lessons/2')}
									className="inline-flex w-full items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-100"
								>
									Go to Lesson 2
								</button>
							</div>
						)}
						{popup.type !== 'completion' && (
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
					</div>
				</div>
			) : null}
		</div>
	)
}
