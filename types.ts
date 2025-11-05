
export type ThemeMode = 'light' | 'dark';

export type ColorPalette = {
  'primary': string;
  'primary-focus': string;
  'secondary': string;
  'accent': string;
  'background-primary': string;
  'background-secondary': string;
  'card-background': string;
  'card-border': string;
  'text-title': string;
  'text-primary': string;
  'text-secondary': string;
  'text-on-primary': string;
};

export type Theme = {
  name: string;
  light: ColorPalette;
  dark: ColorPalette;
};

export type FileData = {
  id: string;
  file: File;
  status: 'pending' | 'getting_pages' | 'processing' | 'completed' | 'error';
  content: string;
  totalPages: number;
  pageSelection: string;
};

export type Agent = {
  id:string;
  name: string;
  prompt: string;
  provider: 'Gemini';
  model: 'gemini-2.5-flash' | 'gemini-2.5-pro';
  temperature: number;
  maxTokens: number;
};

export type AgentResult = {
  status: 'pending' | 'running' | 'completed' | 'error';
  output: string;
};

export type OcrMethod = 'direct' | 'llm';