import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'ihpejoz1',
    dataset: 'development'
  },
  studioHost: process.env.SANITY_STUDIO_HOSTNAME,
  project: {
    basePath: '/admin'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true
});
