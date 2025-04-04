import { defineType } from 'sanity';
import { Stack, Card, Text, Flex } from '@sanity/ui';
import { PatchEvent, set } from 'sanity';

const colorMap = {
  primary: '#231123',
  secondary: '#88AB75',
  tertiary: '#DE8F6E',
  accent: '#2D93AD',
  highlight: '#EDFF86'
};

const ColorPreviewRadio = ({ value, onChange, schemaType }) => (
  <Stack space={2}>
    {schemaType.options.list.map(item => (
      <Card
        key={item.value}
        padding={2}
        tone={value === item.value ? 'primary' : 'default'} // Highlight selected item
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

const SiteColorsSelector = defineType({
  name: 'siteColorsSelector',
  title: 'Site Colors',
  type: 'string',
  options: {
    list: [
      { title: 'Primary', value: 'primary' },
      { title: 'Secondary', value: 'secondary' },
      { title: 'Tertiary', value: 'tertiary' },
      { title: 'Accent', value: 'accent' },
      { title: 'Highlight', value: 'highlight' }
    ],
    layout: 'radio'
  },
  components: {
    input: ColorPreviewRadio
  }
});

export default SiteColorsSelector;
