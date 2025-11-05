
import type { Theme } from './types';

export const themes: Record<string, Theme> = {
  rose: {
    name: 'Rose',
    light: {
      'primary': '#e11d48', 'primary-focus': '#be123c', 'secondary': '#f43f5e', 'accent': '#831843',
      'background-primary': '#fff1f2', 'background-secondary': '#ffe4e6', 'card-background': '#ffffff', 'card-border': '#fecdd3',
      'text-title': '#881337', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#ffffff',
    },
    dark: {
      'primary': '#f43f5e', 'primary-focus': '#e11d48', 'secondary': '#fb7185', 'accent': '#f9a8d4',
      'background-primary': '#1c1917', 'background-secondary': '#292524', 'card-background': '#292524', 'card-border': '#44403c',
      'text-title': '#fda4af', 'text-primary': '#d6d3d1', 'text-secondary': '#a8a29e', 'text-on-primary': '#ffffff',
    },
  },
  lavender: {
    name: 'Lavender',
    light: {
      'primary': '#7c3aed', 'primary-focus': '#6d28d9', 'secondary': '#a78bfa', 'accent': '#c4b5fd',
      'background-primary': '#f5f3ff', 'background-secondary': '#ede9fe', 'card-background': '#ffffff', 'card-border': '#ddd6fe',
      'text-title': '#5b21b6', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#ffffff',
    },
    dark: {
      'primary': '#a78bfa', 'primary-focus': '#8b5cf6', 'secondary': '#c4b5fd', 'accent': '#a78bfa',
      'background-primary': '#181825', 'background-secondary': '#232333', 'card-background': '#232333', 'card-border': '#4c3f78',
      'text-title': '#ddd6fe', 'text-primary': '#d6d3d1', 'text-secondary': '#a8a29e', 'text-on-primary': '#1e1b4b',
    },
  },
  sunflower: {
    name: 'Sunflower',
    light: {
      'primary': '#f59e0b', 'primary-focus': '#d97706', 'secondary': '#fbbf24', 'accent': '#fcd34d',
      'background-primary': '#fffbeb', 'background-secondary': '#fef3c7', 'card-background': '#ffffff', 'card-border': '#fde68a',
      'text-title': '#b45309', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#ffffff',
    },
    dark: {
      'primary': '#fbbf24', 'primary-focus': '#f59e0b', 'secondary': '#fcd34d', 'accent': '#fbbf24',
      'background-primary': '#1c1917', 'background-secondary': '#292524', 'card-background': '#292524', 'card-border': '#44403c',
      'text-title': '#fde047', 'text-primary': '#d6d3d1', 'text-secondary': '#a8a29e', 'text-on-primary': '#422006',
    },
  },
  lily: {
    name: 'Lily',
    light: {
      'primary': '#f8fafc', 'primary-focus': '#e2e8f0', 'secondary': '#e0f2fe', 'accent': '#bae6fd',
      'background-primary': '#f0f9ff', 'background-secondary': '#f0f9ff', 'card-background': '#ffffff', 'card-border': '#e0f2fe',
      'text-title': '#0c4a6e', 'text-primary': '#334155', 'text-secondary': '#64748b', 'text-on-primary': '#0c4a6e',
    },
    dark: {
      'primary': '#e0f2fe', 'primary-focus': '#bae6fd', 'secondary': '#7dd3fc', 'accent': '#e0f2fe',
      'background-primary': '#111827', 'background-secondary': '#1f2937', 'card-background': '#1f2937', 'card-border': '#374151',
      'text-title': '#f0f9ff', 'text-primary': '#d1d5db', 'text-secondary': '#9ca3af', 'text-on-primary': '#082f49',
    },
  },
  orchid: {
    name: 'Orchid',
    light: {
      'primary': '#c026d3', 'primary-focus': '#a21caf', 'secondary': '#d946ef', 'accent': '#e879f9',
      'background-primary': '#fdf2f8', 'background-secondary': '#fce7f3', 'card-background': '#ffffff', 'card-border': '#fbcfe8',
      'text-title': '#86198f', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#ffffff',
    },
    dark: {
      'primary': '#d946ef', 'primary-focus': '#c026d3', 'secondary': '#e879f9', 'accent': '#d946ef',
      'background-primary': '#1c1917', 'background-secondary': '#292524', 'card-background': '#292524', 'card-border': '#44403c',
      'text-title': '#f0abfc', 'text-primary': '#d6d3d1', 'text-secondary': '#a8a29e', 'text-on-primary': '#ffffff',
    },
  },
  marigold: {
    name: 'Marigold',
    light: {
      'primary': '#f97316', 'primary-focus': '#ea580c', 'secondary': '#fb923c', 'accent': '#fdba74',
      'background-primary': '#fff7ed', 'background-secondary': '#ffedd5', 'card-background': '#ffffff', 'card-border': '#fed7aa',
      'text-title': '#c2410c', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#ffffff',
    },
    dark: {
      'primary': '#fb923c', 'primary-focus': '#f97316', 'secondary': '#fdba74', 'accent': '#fb923c',
      'background-primary': '#1c1917', 'background-secondary': '#292524', 'card-background': '#292524', 'card-border': '#44403c',
      'text-title': '#ffedd5', 'text-primary': '#d6d3d1', 'text-secondary': '#a8a29e', 'text-on-primary': '#431407',
    },
  },
  tulip: {
    name: 'Tulip',
    light: {
      'primary': '#ec4899', 'primary-focus': '#db2777', 'secondary': '#f472b6', 'accent': '#f9a8d4',
      'background-primary': '#fdf2f8', 'background-secondary': '#fce7f3', 'card-background': '#ffffff', 'card-border': '#fbcfe8',
      'text-title': '#be185d', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#ffffff',
    },
    dark: {
      'primary': '#f472b6', 'primary-focus': '#ec4899', 'secondary': '#f9a8d4', 'accent': '#f472b6',
      'background-primary': '#1c1917', 'background-secondary': '#292524', 'card-background': '#292524', 'card-border': '#44403c',
      'text-title': '#fce7f3', 'text-primary': '#d6d3d1', 'text-secondary': '#a8a29e', 'text-on-primary': '#500724',
    },
  },
  daisy: {
    name: 'Daisy',
    light: {
      'primary': '#fef08a', 'primary-focus': '#fde047', 'secondary': '#fef9c3', 'accent': '#ffffff',
      'background-primary': '#fefce8', 'background-secondary': '#fef9c3', 'card-background': '#ffffff', 'card-border': '#fef08a',
      'text-title': '#854d0e', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#ca8a04',
    },
    dark: {
      'primary': '#fde047', 'primary-focus': '#facc15', 'secondary': '#fef08a', 'accent': '#fde047',
      'background-primary': '#1c1917', 'background-secondary': '#292524', 'card-background': '#292524', 'card-border': '#44403c',
      'text-title': '#fefce8', 'text-primary': '#d6d3d1', 'text-secondary': '#a8a29e', 'text-on-primary': '#422006',
    },
  },
  peony: {
    name: 'Peony',
    light: {
      'primary': '#fecdd3', 'primary-focus': '#fda4af', 'secondary': '#fda4af', 'accent': '#fb7185',
      'background-primary': '#fff1f2', 'background-secondary': '#ffe4e6', 'card-background': '#ffffff', 'card-border': '#fecdd3',
      'text-title': '#9f1239', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#9f1239',
    },
    dark: {
      'primary': '#fb7185', 'primary-focus': '#f43f5e', 'secondary': '#fda4af', 'accent': '#fb7185',
      'background-primary': '#1c1917', 'background-secondary': '#292524', 'card-background': '#292524', 'card-border': '#44403c',
      'text-title': '#ffe4e6', 'text-primary': '#d6d3d1', 'text-secondary': '#a8a29e', 'text-on-primary': '#500724',
    },
  },
  'bluebell': {
    name: 'Bluebell',
    light: {
      'primary': '#60a5fa', 'primary-focus': '#3b82f6', 'secondary': '#93c5fd', 'accent': '#bfdbfe',
      'background-primary': '#eff6ff', 'background-secondary': '#dbeafe', 'card-background': '#ffffff', 'card-border': '#bfdbfe',
      'text-title': '#1e40af', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#ffffff',
    },
    dark: {
      'primary': '#60a5fa', 'primary-focus': '#3b82f6', 'secondary': '#93c5fd', 'accent': '#60a5fa',
      'background-primary': '#111827', 'background-secondary': '#1f2937', 'card-background': '#1f2937', 'card-border': '#374151',
      'text-title': '#dbeafe', 'text-primary': '#d1d5db', 'text-secondary': '#9ca3af', 'text-on-primary': '#1e3a8a',
    },
  },
   poppy: {
    name: 'Poppy',
    light: {
      'primary': '#ef4444', 'primary-focus': '#dc2626', 'secondary': '#f87171', 'accent': '#fca5a5',
      'background-primary': '#fef2f2', 'background-secondary': '#fee2e2', 'card-background': '#ffffff', 'card-border': '#fecaca',
      'text-title': '#991b1b', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#ffffff',
    },
    dark: {
      'primary': '#f87171', 'primary-focus': '#ef4444', 'secondary': '#fca5a5', 'accent': '#f87171',
      'background-primary': '#1c1917', 'background-secondary': '#292524', 'card-background': '#292524', 'card-border': '#44403c',
      'text-title': '#fecaca', 'text-primary': '#d6d3d1', 'text-secondary': '#a8a29e', 'text-on-primary': '#450a0a',
    },
  },
  iris: {
    name: 'Iris',
    light: {
      'primary': '#8b5cf6', 'primary-focus': '#7c3aed', 'secondary': '#a78bfa', 'accent': '#c4b5fd',
      'background-primary': '#f5f3ff', 'background-secondary': '#ede9fe', 'card-background': '#ffffff', 'card-border': '#ddd6fe',
      'text-title': '#5b21b6', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#ffffff',
    },
    dark: {
      'primary': '#a78bfa', 'primary-focus': '#8b5cf6', 'secondary': '#c4b5fd', 'accent': '#a78bfa',
      'background-primary': '#181825', 'background-secondary': '#232333', 'card-background': '#232333', 'card-border': '#4c3f78',
      'text-title': '#ddd6fe', 'text-primary': '#d6d3d1', 'text-secondary': '#a8a29e', 'text-on-primary': '#1e1b4b',
    },
  },
  carnation: {
    name: 'Carnation',
    light: {
      'primary': '#f472b6', 'primary-focus': '#ec4899', 'secondary': '#f9a8d4', 'accent': '#fbcfe8',
      'background-primary': '#fdf2f8', 'background-secondary': '#fce7f3', 'card-background': '#ffffff', 'card-border': '#fbcfe8',
      'text-title': '#9d174d', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#ffffff',
    },
    dark: {
      'primary': '#f9a8d4', 'primary-focus': '#f472b6', 'secondary': '#fbcfe8', 'accent': '#f9a8d4',
      'background-primary': '#1c1917', 'background-secondary': '#292524', 'card-background': '#292524', 'card-border': '#44403c',
      'text-title': '#fce7f3', 'text-primary': '#d6d3d1', 'text-secondary': '#a8a29e', 'text-on-primary': '#500724',
    },
  },
  dandelion: {
    name: 'Dandelion',
    light: {
      'primary': '#eab308', 'primary-focus': '#ca8a04', 'secondary': '#facc15', 'accent': '#fde047',
      'background-primary': '#fefce8', 'background-secondary': '#fef9c3', 'card-background': '#ffffff', 'card-border': '#fef08a',
      'text-title': '#854d0e', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#ffffff',
    },
    dark: {
      'primary': '#facc15', 'primary-focus': '#eab308', 'secondary': '#fde047', 'accent': '#facc15',
      'background-primary': '#1c1917', 'background-secondary': '#292524', 'card-background': '#292524', 'card-border': '#44403c',
      'text-title': '#fef9c3', 'text-primary': '#d6d3d1', 'text-secondary': '#a8a29e', 'text-on-primary': '#422006',
    },
  },
  hibiscus: {
    name: 'Hibiscus',
    light: {
      'primary': '#e11d48', 'primary-focus': '#be123c', 'secondary': '#fb7185', 'accent': '#fda4af',
      'background-primary': '#fff1f2', 'background-secondary': '#ffe4e6', 'card-background': '#ffffff', 'card-border': '#fecdd3',
      'text-title': '#9f1239', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#ffffff',
    },
    dark: {
      'primary': '#fb7185', 'primary-focus': '#f43f5e', 'secondary': '#fda4af', 'accent': '#fb7185',
      'background-primary': '#1c1917', 'background-secondary': '#292524', 'card-background': '#292524', 'card-border': '#44403c',
      'text-title': '#ffe4e6', 'text-primary': '#d6d3d1', 'text-secondary': '#a8a29e', 'text-on-primary': '#500724',
    },
  },
  heather: {
    name: 'Heather',
    light: {
      'primary': '#a855f7', 'primary-focus': '#9333ea', 'secondary': '#c084fc', 'accent': '#d8b4fe',
      'background-primary': '#faf5ff', 'background-secondary': '#f3e8ff', 'card-background': '#ffffff', 'card-border': '#e9d5ff',
      'text-title': '#6b21a8', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#ffffff',
    },
    dark: {
      'primary': '#c084fc', 'primary-focus': '#a855f7', 'secondary': '#d8b4fe', 'accent': '#c084fc',
      'background-primary': '#181825', 'background-secondary': '#232333', 'card-background': '#232333', 'card-border': '#4c3f78',
      'text-title': '#f3e8ff', 'text-primary': '#d6d3d1', 'text-secondary': '#a8a29e', 'text-on-primary': '#3b0764',
    },
  },
  'cherry-blossom': {
    name: 'Cherry Blossom',
    light: {
      'primary': '#fbcfe8', 'primary-focus': '#f9a8d4', 'secondary': '#fce7f3', 'accent': '#ffffff',
      'background-primary': '#fdf2f8', 'background-secondary': '#fce7f3', 'card-background': '#ffffff', 'card-border': '#fbcfe8',
      'text-title': '#9d174d', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#9d174d',
    },
    dark: {
      'primary': '#f9a8d4', 'primary-focus': '#f472b6', 'secondary': '#fbcfe8', 'accent': '#f9a8d4',
      'background-primary': '#1c1917', 'background-secondary': '#292524', 'card-background': '#292524', 'card-border': '#44403c',
      'text-title': '#fce7f3', 'text-primary': '#d6d3d1', 'text-secondary': '#a8a29e', 'text-on-primary': '#500724',
    },
  },
  'forget-me-not': {
    name: 'Forget-Me-Not',
    light: {
      'primary': '#93c5fd', 'primary-focus': '#60a5fa', 'secondary': '#bfdbfe', 'accent': '#dbeafe',
      'background-primary': '#eff6ff', 'background-secondary': '#dbeafe', 'card-background': '#ffffff', 'card-border': '#bfdbfe',
      'text-title': '#1e40af', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#1e3a8a',
    },
    dark: {
      'primary': '#93c5fd', 'primary-focus': '#60a5fa', 'secondary': '#bfdbfe', 'accent': '#93c5fd',
      'background-primary': '#111827', 'background-secondary': '#1f2937', 'card-background': '#1f2937', 'card-border': '#374151',
      'text-title': '#dbeafe', 'text-primary': '#d1d5db', 'text-secondary': '#9ca3af', 'text-on-primary': '#172554',
    },
  },
  'jade-vine': {
    name: 'Jade Vine',
    light: {
      'primary': '#2dd4bf', 'primary-focus': '#14b8a6', 'secondary': '#5eead4', 'accent': '#99f6e4',
      'background-primary': '#f0fdfa', 'background-secondary': '#ccfbf1', 'card-background': '#ffffff', 'card-border': '#99f6e4',
      'text-title': '#0f766e', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#ffffff',
    },
    dark: {
      'primary': '#5eead4', 'primary-focus': '#2dd4bf', 'secondary': '#99f6e4', 'accent': '#5eead4',
      'background-primary': '#042f2e', 'background-secondary': '#064e47', 'card-background': '#064e47', 'card-border': '#0d766e',
      'text-title': '#ccfbf1', 'text-primary': '#d6d3d1', 'text-secondary': '#a8a29e', 'text-on-primary': '#042f2e',
    },
  },
  'night-sky': {
    name: 'Petunia',
    light: {
      'primary': '#4f46e5', 'primary-focus': '#4338ca', 'secondary': '#6366f1', 'accent': '#818cf8',
      'background-primary': '#eef2ff', 'background-secondary': '#e0e7ff', 'card-background': '#ffffff', 'card-border': '#c7d2fe',
      'text-title': '#312e81', 'text-primary': '#525252', 'text-secondary': '#71717a', 'text-on-primary': '#ffffff',
    },
    dark: {
      'primary': '#6366f1', 'primary-focus': '#4f46e5', 'secondary': '#818cf8', 'accent': '#6366f1',
      'background-primary': '#1e1b4b', 'background-secondary': '#312e81', 'card-background': '#312e81', 'card-border': '#4338ca',
      'text-title': '#e0e7ff', 'text-primary': '#d6d3d1', 'text-secondary': '#a8a29e', 'text-on-primary': '#ffffff',
    },
  },
};

export const flowerNames = Object.keys(themes).map(key => ({
  id: key,
  name: themes[key].name,
}));
