import conditionalClasses from '@/lib/utils/conditionalClasses';
import TextBox from './TextBox';
import CloudinaryImg from '../common/CloudinaryImg';

const ImageTextBlock = ({ blockData }) => {
  const { image, imageAlignment, text } = blockData;

  return (
    <section
      className={conditionalClasses(
        'flex w-full py-10',
        imageAlignment === 'left' ? 'flex-row' : 'flex-row-reverse'
      )}
    >
      <div className="relative h-auto w-1/2">
        <CloudinaryImg
          src={image?.imageAsset?.public_id}
          alt={image?.altText}
          className="h-auto object-cover"
          priority
          sizes="50vw"
        />
      </div>
      <TextBox
        className="w-1/2"
        title={text.title}
        subtitle={text.subtitle}
        body={text.body}
        alignment={text.alignment}
      />
    </section>
  );
};

export default ImageTextBlock;
