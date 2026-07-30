export interface SceneMetadata {
	peakHeight: number;
	defaultSteps: number;
	chapterName: string;
}

export const SCENE_CONFIG = {
	'scene-1': {
		peakHeight: 0,
		defaultSteps: 5,
		chapterName: 'I. The Gray Labyrinth'
	},
	'scene-2': {
		peakHeight: 30,
		defaultSteps: 4,
		chapterName: 'II. The Kneeling Saint'
	},
	'scene-3': {
		peakHeight: 65,
		defaultSteps: 6,
		chapterName: 'III. The Velvety Sanctuary'
	},
	'scene-4': {
		peakHeight: 110,
		defaultSteps: 4,
		chapterName: 'IV. The Acorn Crown'
	}
} as const;

export type SceneConfig = typeof SCENE_CONFIG;
export type SceneId = keyof typeof SCENE_CONFIG;
