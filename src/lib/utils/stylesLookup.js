// TODO: don't pass opacity in dynamically, use tailwindcss opacity classes instead
const bgColorSelector = (color, opacity) => {
  switch (color) {
    case 'primary':
      return `bg-primary${opacity ? `/${opacity}` : ''}`;
    case 'secondary':
      return `bg-secondary${opacity ? `/${opacity}` : ''}`;
    case 'tertiary':
      return `bg-tertiary${opacity ? `/${opacity}` : ''}`;
    case 'accent':
      return `bg-accent${opacity ? `/${opacity}` : ''}`;
    case 'highlight':
      return `bg-highlight${opacity ? `/${opacity}` : ''}`;
    default:
      return '';
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
  bgColorSelector,
  setOpacity,
  setTextAlignment,
  setElementHorizontalAlignment,
  setElementVerticalAlignment
};
