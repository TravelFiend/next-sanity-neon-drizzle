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
    switch (color) {
      case 'primary':
        return 'font-outline-primary-lg';
      case 'secondary':
        return 'font-outline-secondary-lg';
      case 'tertiary':
        return 'font-outline-tertiary-lg';
      case 'accent':
        return 'font-outline-accent-lg';
      case 'highlight':
        return 'font-outline-highlight-lg';
    }
  } else if (size === 'md') {
    switch (color) {
      case 'primary':
        return 'font-outline-primary-md';
      case 'secondary':
        return 'font-outline-secondary-md';
      case 'tertiary':
        return 'font-outline-tertiary-md';
      case 'accent':
        return 'font-outline-accent-md';
      case 'highlight':
        return 'font-outline-highlight-md';
    }
  } else {
    switch (color) {
      case 'primary':
        return 'font-outline-primary-sm';
      case 'secondary':
        return 'font-outline-secondary-sm';
      case 'tertiary':
        return 'font-outline-tertiary-sm';
      case 'accent':
        return 'font-outline-accent-sm';
      case 'highlight':
        return 'font-outline-highlight-sm';
    }
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
