import TextBox from './TextBox';

const TextSection = ({ blockData }) => {
  const { title, subtitle, body, alignment } = blockData;

  return (
    <section className="w-full py-10">
      <TextBox
        title={title}
        subtitle={subtitle}
        body={body}
        alignment={alignment}
      />
    </section>
  );
};

export default TextSection;
