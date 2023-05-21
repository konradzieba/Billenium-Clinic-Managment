import axios from 'axios';

import { UserProfileInfoType } from './types';

export const fetchUserInfo = async (url: string, id: string | null) => {
  const response = await axios.get(`${url}${id}`);
  return response.data as UserProfileInfoType;
};
