import { getToken } from 'utils/cookies';
import axios from '../../../axios/axios';

export const makeItemInvisibleController = async (id: string) => {
  try {
    const config = {
      headers: {
        Authorization: `${getToken()}`,
      },
    };
    const res = await axios.put(`/admin/item/${id}/visibility`, { visible: false }, config);
    console.log('After invisible items: ', res);
    return res;
  } catch (err) {
    console.log('Error: ', err);
    return err.response;
  }
};
