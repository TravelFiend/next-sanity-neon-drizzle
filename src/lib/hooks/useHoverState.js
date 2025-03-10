import { useState } from 'react';

const useHoverState = () => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return { isHovered, onMouseEnter, onMouseLeave };
};

export default useHoverState;
