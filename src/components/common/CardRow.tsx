import conditionalClasses from '@/lib/utils/conditionalClasses';
import CloudinaryImg from './CloudinaryImg';
import type { CarouselBlock } from '@sanityTypes/generatedTypes';

type CardRowProps = {
  cards: CarouselBlock['images'];
};

const CardRow: React.FC<CardRowProps> = ({ cards }) => {
  if (!cards || !Array.isArray(cards) || !cards.length) {
    throw new Error('Invalid cards data provided to CardRow component');
  }

  return (
    <div
      className="flex h-full w-full items-center justify-between"
      role="list"
    >
      {cards.map((card, idx) => (
        <div
          key={card.imageAsset.public_id || idx}
          className={conditionalClasses(
            'relative h-full min-w-0',
            cards.length === 3
              ? 'mr-[.6666%] ml-[.6666%] flex-[0_0_32%]'
              : 'mr-[1%] ml-[1%] flex-[0_0_23%]'
          )}
          role="listitem"
          aria-label={`Item ${idx + 1} of ${cards.length}: ${card.altText}`}
        >
          <CloudinaryImg
            src={card.imageAsset.public_id!}
            alt={card.altText!}
            sizes={cards.length === 3 ? '33vw' : '25vw'}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default CardRow;
