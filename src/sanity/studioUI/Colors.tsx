import { Stack, Card, Text, Flex } from '@sanity/ui';
import { PatchEvent, set, type StringInputProps } from 'sanity';

const colorMap = {
  white: '#FFFFFF',
  primary: '#231123',
  secondary: '#88AB75',
  tertiary: '#DE8F6E',
  accent: '#2D93AD',
  highlight: '#EDFF86',
  black: '#000000'
};

const ColorPreviewRadio: React.FC<StringInputProps> = ({
  value,
  onChange,
  schemaType
}) => {
  const list = schemaType.options?.list ?? [];

  return (
    <Stack space={2}>
      {list.map(item => {
        const val = typeof item === 'string' ? item : item.value;
        const title = typeof item === 'string' ? item : item.title;

        return (
          <Card
            key={val}
            padding={2}
            tone={value === val ? 'primary' : 'default'}
            radius={2}
            style={{ cursor: 'pointer' }}
            onClick={() => onChange(PatchEvent.from(set(val)))}
          >
            <Flex align="center" gap={3}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: colorMap[val as keyof typeof colorMap],
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
              <Text>{title}</Text>
            </Flex>
          </Card>
        );
      })}
    </Stack>
  );
};

export default ColorPreviewRadio;
