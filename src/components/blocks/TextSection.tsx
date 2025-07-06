import type { TextBlock } from '@/sanity/types';
import TextBox from './TextBox';

type TextSectionProps = {
  textData: {
    _key: string;
  } & TextBlock;
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
