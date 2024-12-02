import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'ihpejoz1',
    // Use the `SANITY_DATASET` environment variable, or fall back to 'production' as default
    dataset: process.env.NEXT_PUBLIC_SANITY_DEV_DATASET || 'production'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true
});
