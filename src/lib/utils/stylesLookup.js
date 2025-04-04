// possible color values: 'primary', 'secondary', 'tertiary', 'accent', 'highlight'
const colorSelector = color => {
  switch (color) {
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
    default:
      return '';
  }
};

// possible aligment values: 'left', 'center', 'right'
const setTextAlignment = lrc => {
  switch (lrc) {
    case 'left':
      return 'text-left';
    case 'right':
      return 'text-right';
    default:
      return 'text-center';
  }
};

export { colorSelector, setTextAlignment };
