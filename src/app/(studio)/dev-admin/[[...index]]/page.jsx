'use client';

import config from '../../../../../sanity.config';
import { NextStudio } from 'next-sanity/studio';

export const dynamic = 'force-static';

const DevAdminPage = () => <NextStudio config={config} />;

export default DevAdminPage;
