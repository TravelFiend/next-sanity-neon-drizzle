import conditionalClasses from '@/lib/utils/conditionalClasses';
import { setTextAlignment } from '@/lib/utils/stylesLookup';

const TextBox = ({ title, subtitle, body, alignment, className }) => {
  return (
    <div
      className={conditionalClasses(
        'w-full py-10',
        className,
        setTextAlignment(alignment)
      )}
    >
      {title ? (
        <h2 className="font-serif text-2xl font-semibold">{title}</h2>
      ) : null}
      {subtitle ? (
        <h3 className="font-mono text-gray-700 dark:text-gray-400">
          {subtitle}
        </h3>
      ) : null}
      {body ? <p className="font-sans">{body}</p> : null}
    </div>
  );
};

export default TextBox;
