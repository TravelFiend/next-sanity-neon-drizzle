const TextBlock = ({ blockData }) => {
  const { title, subtitle, body, alignment } = blockData;

  return (
    <section className={`w-full text-${alignment}`}>
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

export default TextBlock;
