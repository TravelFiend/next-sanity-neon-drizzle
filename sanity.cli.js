import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'ihpejoz1',
    dataset: 'development'
  },
  studioHost: 'mjm-fe-dev',
  project: {
    basePath: '/admin'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true
});
