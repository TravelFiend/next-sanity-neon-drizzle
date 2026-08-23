import { Box, Text } from '@sanity/ui';
import type { PreviewProps } from 'sanity';

const LinkWithIconPreview = (props: PreviewProps) => {
  const { icon, title, subtitle } = props as unknown as {
    icon: string;
    title?: string;
    subtitle?: string;
  };

  return (
    <Box
      padding={3}
      style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
    >
      <Box
        style={{ width: 32, height: 32 }}
        dangerouslySetInnerHTML={icon ? { __html: icon } : undefined}
      />
      <Box>
        <Box marginBottom={2}>
          <Text weight="semibold">{title}</Text>
        </Box>
        {subtitle ? (
          <Box marginTop={2}>
            <Text size={1} muted>
              {subtitle}
            </Text>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default LinkWithIconPreview;
