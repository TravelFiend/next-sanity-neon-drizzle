'use server';

import 'server-only';
import getValidUspsToken from '@/lib/utils/getUspsToken';

const addAddress = async () => {
  const accessToken = await getValidUspsToken();

  if (accessToken) {
    return {
      success: true,
      data: accessToken
    };
  }
};

export default addAddress;
