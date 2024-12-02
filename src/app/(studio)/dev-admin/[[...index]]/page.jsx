'use client';

import config from '../../../../../sanity.config';
import { NextStudio } from 'next-sanity/studio';

const DevAdminPage = () => <NextStudio config={config} />;

export default DevAdminPage;
