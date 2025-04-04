import conditionalClasses from '@/lib/utils/conditionalClasses';

const TextSection = ({ blockData }) => {
  const { title, subtitle, body, alignment } = blockData;

  return (
    <section
      className={conditionalClasses(
        'w-full py-10',
        alignment === 'left' ? 'text-left' : '',
        alignment === 'center' ? 'text-center' : '',
        alignment === 'right' ? 'text-right' : ''
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
    </section>
  );
};

export default TextSection;
