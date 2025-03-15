const TextBlock = ({ title, subtitle, body }) => {
  return (
    <section className="w-full">
      {title ? <h2 className="text-serif font-semibold">{title}</h2> : null}
      {subtitle ? (
        <h3 className="text-mono text-gray-700 dark:text-gray-400">
          {subtitle}
        </h3>
      ) : null}
      {body ? <p className="text-sans">{body}</p> : null}
    </section>
  );
};

export default TextBlock;
