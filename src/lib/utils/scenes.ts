export interface SceneMetadata {
	peakHeight: number;
	defaultSteps: number;
}

export const SCENE_CONFIG = {
	'scene-1': { peakHeight: 0, defaultSteps: 5 },
	'scene-2': { peakHeight: 30, defaultSteps: 4 },
	'scene-3': { peakHeight: 65, defaultSteps: 6 },
	'scene-4': { peakHeight: 110, defaultSteps: 4 }
} as const;

export type SceneConfig = typeof SCENE_CONFIG;
