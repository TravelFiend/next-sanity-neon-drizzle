import DOMPurify from 'isomorphic-dompurify';

const cleanSVG = (dirtySVG: string): string => {
  return DOMPurify.sanitize(dirtySVG, {
    USE_PROFILES: { svg: true, svgFilters: true }
  });
};

export default cleanSVG;
