import { Fragment } from 'react';
import TextSection from './TextSection';
import HeroSection from './HeroSection';

const ContentBlocks = ({ contentBlocks }) => {
  return (
    <div className="relative">
      {contentBlocks.map((block, idx) => {
        const { _key, _type, ...blockData } = block;

        switch (_type) {
          case 'heroBlock':
            return (
              <Fragment key={_key}>
                <HeroSection blockData={blockData} index={idx} />
              </Fragment>
            );
          case 'textBlock':
            return <TextSection key={_key} blockData={blockData} />;
          default:
            console.error(`${_type} is not a valid content block type`);
            return null;
        }
      })}
    </div>
  );
};

export default ContentBlocks;
