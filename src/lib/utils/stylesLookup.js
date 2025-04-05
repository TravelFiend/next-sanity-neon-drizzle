// TODO: don't pass opacity in dynamically, use tailwindcss opacity classes instead
const setBgColor = color => {
  switch (color) {
    case 'white':
      return 'bg-white';
    case 'primary':
      return 'bg-primary';
    case 'secondary':
      return 'bg-secondary';
    case 'tertiary':
      return 'bg-tertiary';
    case 'accent':
      return 'bg-accent';
    case 'highlight':
      return 'bg-highlight';
    case 'black':
      return 'bg-black';
    default:
      return '';
  }
};

const setTextColor = color => {
  switch (color) {
    case 'white':
      return 'text-white';
    case 'primary':
      return 'text-primary';
    case 'secondary':
      return 'text-secondary';
    case 'tertiary':
      return 'text-tertiary';
    case 'accent':
      return 'text-accent';
    case 'highlight':
      return 'text-highlight';
    case 'black':
      return 'text-black';
    default:
      return '';
  }
};

const setTextOutline = (color, size) => {
  if (size === 'lg') {
    return color === 'primary'
      ? 'font-outline-primary-lg'
      : color === 'secondary'
        ? 'font-outline-secondary-lg'
        : color === 'tertiary'
          ? 'font-outline-tertiary-lg'
          : color === 'accent'
            ? 'font-outline-accent-lg'
            : color === 'highlight'
              ? 'font-outline-highlight-lg'
              : '';
  } else if (size === 'md') {
    return color === 'primary'
      ? 'font-outline-primary-md'
      : color === 'secondary'
        ? 'font-outline-secondary-md'
        : color === 'tertiary'
          ? 'font-outline-tertiary-md'
          : color === 'accent'
            ? 'font-outline-accent-md'
            : color === 'highlight'
              ? 'font-outline-highlight-md'
              : '';
  } else {
    return color === 'primary'
      ? 'font-outline-primary-sm'
      : color === 'secondary'
        ? 'font-outline-secondary-sm'
        : color === 'tertiary'
          ? 'font-outline-tertiary-sm'
          : color === 'accent'
            ? 'font-outline-accent-sm'
            : color === 'highlight'
              ? 'font-outline-highlight-sm'
              : '';
  }
};

const setOpacity = opacity => {
  switch (opacity) {
    case 10:
      return 'opacity-10';
    case 20:
      return 'opacity-20';
    case 30:
      return 'opacity-30';
    case 40:
      return 'opacity-40';
    case 50:
      return 'opacity-50';
    case 60:
      return 'opacity-60';
    case 70:
      return 'opacity-70';
    case 80:
      return 'opacity-80';
    case 90:
      return 'opacity-90';
    default:
      return 'opcaity-100';
  }
};

const setTextAlignment = lrc => {
  switch (lrc) {
    case 'left':
      return 'text-left';
    case 'right':
      return 'text-right';
    case 'center':
      return 'text-center';
    default:
      return '';
  }
};

const setElementHorizontalAlignment = lrc => {
  switch (lrc) {
    case 'left':
      return 'justify-start';
    case 'center':
      return 'justify-center';
    case 'right':
      return 'justify-end';
    default:
      return '';
  }
};

const setElementVerticalAlignment = tcb => {
  switch (tcb) {
    case 'top':
      return 'items-start';
    case 'center':
      return 'items-center';
    case 'bottom':
      return 'items-end';
    default:
      return '';
  }
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
