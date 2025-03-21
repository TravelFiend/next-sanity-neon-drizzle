import { Fragment } from 'react';
import TextSection from './TextSection';
import HeroSection from './HeroSection';

const ContentBlocks = ({ contentBlocks }) => {
  return (
    <Fragment>
      {contentBlocks.map(block => {
        const { _key, _type, ...blockData } = block;

        switch (_type) {
          case 'textBlock':
            return <TextSection key={_key} blockData={blockData} />;
          case 'heroBlock':
            return <HeroSection key={_key} blockData={blockData} />;
          default:
            console.error(`${_type} is not a valid content block type`);
            return null;
        }
      })}
    </Fragment>
  );
};

export default ContentBlocks;
