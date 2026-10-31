export interface LessonSection {
  heading: string
  paragraphs: string[]
}

export interface LessonContent {
  id: string
  title: string
  summary: string
  sections: LessonSection[]
}

// Add your lesson content here. Do not create any Mahjong teaching material here unless it is text you have written yourself.
export const LESSONS: LessonContent[] = []
