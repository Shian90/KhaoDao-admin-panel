import { getToken } from 'utils/cookies';
import axios from '../../../axios/axios';

export const makeRestaurantInvisibleController = async (id: string) => {
  try {
    const config = {
      headers: {
        Authorization: `${getToken()}`,
      },
    };
    const res = await axios.put(`/admin/restaurant/${id}/visibility`, {}, config);
    console.log('Restaurants: ', res);
    return res;
  } catch (err) {
    console.log('Error: ', err);
    return err.response;
  }
};
