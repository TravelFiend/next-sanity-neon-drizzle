import { Fragment } from 'react';
import TextBlock from './TextBlock';

const ContentBlocks = ({ contentBlocks }) => {
  return (
    <Fragment>
      {contentBlocks.map(block => {
        switch (block._type) {
          case 'textBlock':
            return (
              <TextBlock
                key={block._key}
                title={block.title}
                subtitle={block.subtitle}
                body={block.body}
              />
            );
          default:
            console.error(`${block._type} is not a valid content block type`);
            return null;
        }
      })}
    </Fragment>
  );
};

export default ContentBlocks;
