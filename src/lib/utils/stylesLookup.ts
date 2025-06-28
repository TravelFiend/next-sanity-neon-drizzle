type SiteColors =
  | 'white'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'highlight'
  | 'black';
type Opacity = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
type OutlineSize = 'sm' | 'md' | 'lg';
type HorizontalAlignment = 'left' | 'center' | 'right';
type VerticalAlignment = 'top' | 'center' | 'bottom';

const bgColorClasses: Record<SiteColors, string> = {
  white: 'bg-white',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  accent: 'bg-accent',
  highlight: 'bg-highlight',
  black: 'bg-black'
};

const setBgColor = (color?: SiteColors): string => {
  return color ? bgColorClasses[color] : '';
};

const textColorClasses: Record<SiteColors, string> = {
  white: 'text-white',
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  accent: 'text-accent',
  highlight: 'text-highlight',
  black: 'text-black'
};

const setTextColor = (color?: SiteColors): string => {
  return textColorClasses[color ?? 'white'];
};

const textOutlineClasses: Record<OutlineSize, Record<SiteColors, string>> = {
  sm: {
    white: 'font-outline-white-sm',
    primary: 'font-outline-primary-sm',
    secondary: 'font-outline-secondary-sm',
    tertiary: 'font-outline-tertiary-sm',
    accent: 'font-outline-accent-sm',
    highlight: 'font-outline-highlight-sm',
    black: 'font-outline-black-sm'
  },
  md: {
    white: 'font-outline-white-md',
    primary: 'font-outline-primary-md',
    secondary: 'font-outline-secondary-md',
    tertiary: 'font-outline-tertiary-md',
    accent: 'font-outline-accent-md',
    highlight: 'font-outline-highlight-md',
    black: 'font-outline-black-md'
  },
  lg: {
    white: 'font-outline-white-lg',
    primary: 'font-outline-primary-lg',
    secondary: 'font-outline-secondary-lg',
    tertiary: 'font-outline-tertiary-lg',
    accent: 'font-outline-accent-lg',
    highlight: 'font-outline-highlight-lg',
    black: 'font-outline-black-lg'
  }
};

const setTextOutline = (color: SiteColors, size: OutlineSize): string => {
  return textOutlineClasses[size][color] ?? '';
};

// TODO: don't pass opacity in dynamically, use tailwindcss opacity classes instead
const opacityClasses: Record<Opacity, string> = {
  10: 'opacity-10',
  20: 'opacity-20',
  30: 'opacity-30',
  40: 'opacity-40',
  50: 'opacity-50',
  60: 'opacity-60',
  70: 'opacity-70',
  80: 'opacity-80',
  90: 'opacity-90',
  100: 'opacity-100'
};

const setOpacity = (opacity?: Opacity): string => {
  return opacityClasses[opacity ?? 100];
};

const textAlignClasses: Record<HorizontalAlignment, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
};

const setTextAlignment = (lrc?: HorizontalAlignment): string => {
  return textAlignClasses[lrc ?? 'left'];
};

const JustifyClasses: Record<HorizontalAlignment, string> = {
  left: 'justify-left',
  center: 'justify-center',
  right: 'justify-end'
};

const setElementHorizontalAlignment = (lrc?: HorizontalAlignment): string => {
  return JustifyClasses[lrc ?? 'left'];
};

const VerticalAlignClasses: Record<VerticalAlignment, string> = {
  top: 'items-start',
  center: 'items-center',
  bottom: 'items-end'
};

const setElementVerticalAlignment = (tcb: VerticalAlignment): string => {
  return VerticalAlignClasses[tcb ?? 'items-start'];
};

export {
  setBgColor,
  setTextColor,
  setTextOutline,
  setOpacity,
  setTextAlignment,
  setElementHorizontalAlignment,
  setElementVerticalAlignment
};
