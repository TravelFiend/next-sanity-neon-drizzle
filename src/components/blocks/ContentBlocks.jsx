import { Fragment } from 'react';
import TextBlock from './TextBlock';

const ContentBlocks = ({ contentBlocks }) => {
  return (
    <Fragment>
      {contentBlocks.map(block => {
        const { _key, _type, ...blockData } = block;

        switch (_type) {
          case 'textBlock':
            return <TextBlock key={_key} blockData={blockData} />;
          default:
            console.error(`${_type} is not a valid content block type`);
            return null;
        }
      })}
    </Fragment>
  );
};

export default ContentBlocks;
