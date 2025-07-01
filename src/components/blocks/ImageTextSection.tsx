import conditionalClasses from '@/lib/utils/conditionalClasses';
import TextBox from './TextBox';
import CloudinaryImg from '../common/CloudinaryImg';
import type { ImageTextBlock } from '@/sanity/types';

type ImageTextBlockProps = {
  imageTextData: ImageTextBlock;
};

const ImageTextBlock: React.FC<ImageTextBlockProps> = ({ imageTextData }) => {
  const { image, imageAlignment, text } = imageTextData;

  return (
    <section
      className={conditionalClasses(
        'flex w-full py-10',
        imageAlignment === 'left' ? 'flex-row' : 'flex-row-reverse'
      )}
    >
      <div className="relative h-auto w-1/2">
        <CloudinaryImg
          src={image.imageAsset.public_id!}
          alt={image.altText!}
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
