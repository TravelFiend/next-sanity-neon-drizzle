import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

const cleanSVG = (dirtySVG: string): string => {
  return purify.sanitize(dirtySVG, {
    USE_PROFILES: { svg: true, svgFilters: true }
  });
};

export default cleanSVG;
