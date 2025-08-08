import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure'; // needed to view studio at all
import { visionTool } from '@sanity/vision';
import { colorInput } from '@sanity/color-input';
import { cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary';
import { inlineSvgInput } from '@focus-reactive/sanity-plugin-inline-svg-input';
import schemaTypes from './src/sanity/schemas/index';
import structure, {
  getDefaultDocumentNode
} from './src/sanity/schemas/structure';

// generates Sanity Studio with 2 different workspaces
const config = defineConfig([
  {
    name: 'production',
    title: 'Production',
    basePath: '/admin',
    subtitle: 'Production dataset for Neon Drizzle',
    projectId: '133b4mp9',
    dataset: 'production',
    plugins: [
      structureTool({
        structure,
        defaultDocumentNode: getDefaultDocumentNode
      }),
      colorInput(),
      visionTool({
        defaultApiVersion: `v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}`
      }),
      inlineSvgInput(),
      cloudinarySchemaPlugin()
    ],
    schema: { types: schemaTypes }
  },
  {
    name: 'development',
    title: 'Development',
    basePath: '/dev-admin',
    subtitle: 'Development dataset for Neon Drizzle',
    projectId: '133b4mp9',
    dataset: 'development',
    plugins: [
      structureTool({
        structure,
        defaultDocumentNode: getDefaultDocumentNode
      }),
      colorInput(),
      visionTool({
        defaultApiVersion: `v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}`
      }),
      inlineSvgInput(),
      cloudinarySchemaPlugin()
    ],
    schema: { types: schemaTypes }
  }
]);

export default config;
