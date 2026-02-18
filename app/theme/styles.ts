import { ViewStyle, TextStyle } from 'react-native';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, Theme } from './constants';

const getRadius = (theme: Theme) => theme.isDos ? 0 : BORDER_RADIUS.lg;
const getRadiusSm = (theme: Theme) => theme.isDos ? 0 : BORDER_RADIUS.md;
const getRadiusXl = (theme: Theme) => theme.isDos ? 0 : BORDER_RADIUS.xl;
const getRadiusFull = (theme: Theme) => theme.isDos ? 0 : BORDER_RADIUS.full;

export const g = {
  container: (theme: Theme): ViewStyle => ({
    flex: 1,
    backgroundColor: theme.background,
    padding: SPACING.lg,
  }),
  
  card: (theme: Theme): ViewStyle => ({
    backgroundColor: theme.backgroundModal,
    borderRadius: getRadius(theme),
    padding: SPACING.xl,
    borderWidth: theme.isDos ? 2 : 1,
    borderColor: theme.border,
  }),

  text: (theme: Theme): TextStyle => ({
    color: theme.text,
    fontSize: FONT_SIZES.md,
    fontFamily: theme.fontFamily,
  }),

  textLarge: (theme: Theme): TextStyle => ({
    color: theme.text,
    fontSize: FONT_SIZES.lg,
    fontFamily: theme.fontFamily,
  }),

  title: (theme: Theme): TextStyle => ({
    color: theme.text,
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    fontFamily: theme.fontFamily,
  }),

  subtitle: (theme: Theme): TextStyle => ({
    color: theme.focusedForeground,
    fontSize: FONT_SIZES.lg,
    fontFamily: theme.fontFamily,
  }),

  button: (theme: Theme): ViewStyle => ({
    backgroundColor: theme.buttonBackground,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md + 2,
    borderRadius: getRadiusXl(theme),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: theme.isDos ? 2 : 1,
    borderColor: theme.border,
  }),

  buttonText: (theme: Theme): TextStyle => ({
    color: theme.buttonText,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    fontFamily: theme.fontFamily,
  }),

  buttonPrimary: (theme: Theme): ViewStyle => ({
    backgroundColor: theme.focusedForeground,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md + 2,
    borderRadius: getRadiusXl(theme),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: theme.isDos ? 2 : 0,
    borderColor: theme.border,
  }),

  buttonPrimaryText: (theme: Theme): TextStyle => ({
    color: theme.isDos ? theme.background : (theme.mode === 'dark' ? '#000000' : '#ffffff'),
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    fontFamily: theme.fontFamily,
  }),

  input: (theme: Theme): ViewStyle => ({
    backgroundColor: theme.backgroundInput,
    borderWidth: theme.isDos ? 2 : 1,
    borderColor: theme.border,
    borderRadius: getRadiusSm(theme),
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  }),

  inputText: (theme: Theme): TextStyle => ({
    color: theme.text,
    fontSize: FONT_SIZES.md,
    fontFamily: theme.fontFamily,
  }),

  icon: (theme: Theme): TextStyle => ({
    color: theme.focusedForeground,
    fontSize: FONT_SIZES.xl,
    fontFamily: theme.fontFamily,
  }),

  iconButton: (theme: Theme): ViewStyle => ({
    width: 40,
    height: 40,
    borderRadius: getRadiusFull(theme),
    backgroundColor: theme.backgroundInput,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: theme.isDos ? 2 : 1,
    borderColor: theme.borderSubdued,
  }),

  row: (theme: Theme): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
  }),

  spaceBetween: (theme: Theme): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),

  centered: (theme: Theme): ViewStyle => ({
    justifyContent: 'center',
    alignItems: 'center',
  }),
};

export const spacing = SPACING;
export const fontSizes = FONT_SIZES;
export const borderRadius = BORDER_RADIUS;
