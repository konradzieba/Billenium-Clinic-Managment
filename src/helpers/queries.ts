import axios from 'axios';

import { PatchUserInfoType,UserProfileInfoType } from './types';

export const fetchUserInfo = async (url: string, id: string | null) => {
  const response = await axios.get(`${url}${id}`);
  return response.data as UserProfileInfoType;
};

export const patchUserInfo = async (url: string, data: PatchUserInfoType) => {
  const response = await axios.patch(url, data);
  return response.data as UserProfileInfoType;
};
