import { Stack, Card, Text, Flex } from '@sanity/ui';
import { PatchEvent, set } from 'sanity';

const ColorPreviewRadio = ({ value, onChange, schemaType }) => {
  const colorMap = {
    white: '#FFFFFF',
    primary: '#231123',
    secondary: '#88AB75',
    tertiary: '#DE8F6E',
    accent: '#2D93AD',
    highlight: '#EDFF86',
    black: '#000000'
  };

  return (
    <Stack space={2}>
      {schemaType.options.list.map(item => (
        <Card
          key={item.value}
          padding={2}
          tone={value === item.value ? 'primary' : 'default'}
          radius={2}
          style={{ cursor: 'pointer' }}
          onClick={() => onChange(PatchEvent.from(set(item.value)))}
        >
          <Flex align="center" gap={3}>
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: colorMap[item.value],
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
            <Text>{item.title}</Text>
          </Flex>
        </Card>
      ))}
    </Stack>
  );
};

export default ColorPreviewRadio;
