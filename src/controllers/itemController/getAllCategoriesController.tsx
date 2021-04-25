import { getToken } from 'utils/cookies';
import axios from '../../../axios/axios';

export const getAllCategoriesController = async () => {
  const config = {
    headers: {
      Authorization: `${getToken()}`,
    },
  };
  console.log('Token: ', getToken());
  try {
    const res = await axios.get('/admin/item/categories', config);
    console.log('Categories: ', res);
    return res;
  } catch (err) {
    console.log('Error: ', err);
    return err.response;
  }
};
