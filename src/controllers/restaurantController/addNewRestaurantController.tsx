import { getToken } from 'utils/cookies';
import axios from '../../../axios/axios';

export interface Restaurant {
  id: number;
  name: string;
}

export const addNewRestaurantController = async (name: string, address: string) => {
  const config = {
    headers: {
      Authorization: `${getToken()}`,
    },
  };
  console.log('Tokeeen: ', getToken());
  const reqBody = {
    name: name,
    address: address,
  };

  try {
    const res = await axios.post('/admin/restaurant/new', reqBody, config);
    return res;
  } catch (err) {
    console.log('Error: ', err);
    return err.response;
  }
};
