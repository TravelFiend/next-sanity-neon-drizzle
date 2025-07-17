import TextBox from './TextBox';
import type { TextBlockRes } from '@sanityTypes/writtenTypes';

type TextSectionProps = {
  textData: {
    _key: string;
  } & TextBlockRes;
};

const TextSection: React.FC<TextSectionProps> = ({ textData }) => {
  const { title, subtitle, body, alignment } = textData;

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
