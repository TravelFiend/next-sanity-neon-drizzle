import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure'; // needed to view studio at all
import { visionTool } from '@sanity/vision';
import schemaTypes from './src/sanity/schemas/index';
import structure, {
  getDefaultDocumentNode
} from './src/sanity/schemas/structure';
import { colorInput } from '@sanity/color-input';

// generates Sanity Studio with 2 different workspaces
const config = defineConfig([
  {
    name: 'production',
    title: 'Production',
    basePath: '/admin',
    subtitle: "Don't you even think about changin' anything here boy",
    projectId: 'ihpejoz1',
    dataset: 'production',
    plugins: [
      structureTool({
        structure,
        defaultDocumentNode: getDefaultDocumentNode
      }),
      colorInput()
    ],
    schema: { types: schemaTypes }
  },
  {
    name: 'development',
    title: 'Development',
    basePath: '/dev-admin',
    subtitle: "Fuck it, do whatever, I don't care",
    projectId: 'ihpejoz1',
    dataset: 'development',
    plugins: [
      structureTool({
        structure,
        defaultDocumentNode: getDefaultDocumentNode
      }),
      colorInput(),
      visionTool({
        defaultApiVersion: `v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}`
      })
    ],
    schema: { types: schemaTypes }
  }
]);

export default config;
