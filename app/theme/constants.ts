export type ThemeMode = 'light' | 'dark';
export type ThemeName = 'terminal';

export interface Theme {
  mode: ThemeMode;
  themeName: ThemeName;
  overlay: string;
  background: string;
  backgroundModal: string;
  backgroundModalFooter: string;
  backgroundInput: string;
  border: string;
  borderSubdued: string;
  text: string;
  button: string;
  buttonText: string;
  buttonForeground: string;
  buttonBackground: string;
  focusedForeground: string;
  focusedForegroundSubdued: string;
  tint: string;
  fontFamily: string;
  isDos: boolean;
}

const terminalTheme: Theme = {
  mode: 'light',
  themeName: 'terminal',
  overlay: 'rgba(255, 255, 255, 0.6)',
  background: '#ffffff',
  backgroundModal: '#f5f5f5',
  backgroundModalFooter: '#ebebeb',
  backgroundInput: '#fafafa',
  border: '#000000',
  borderSubdued: 'rgba(0, 0, 0, 0.3)',
  text: '#000000',
  button: '#ffffff',
  buttonText: '#000000',
  buttonForeground: '#000000',
  buttonBackground: '#000000',
  focusedForeground: '#ffffff',
  focusedForegroundSubdued: 'rgba(255, 255, 255, 0.7)',
  tint: '#000000',
  fontFamily: 'XanhMono',
  isDos: true,
};

export const themes: Record<ThemeName, Theme> = {
  terminal: terminalTheme,
};

export const THEME_ORDER: ThemeName[] = ['terminal'];

export { terminalTheme };

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 36,
} as const;

export const FONT_WEIGHTS = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const BORDER_RADIUS = {
  sm: 0,
  md: 0,
  lg: 0,
  xl: 0,
  full: 0,
} as const;
