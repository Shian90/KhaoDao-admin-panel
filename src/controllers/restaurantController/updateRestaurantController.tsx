import { getToken } from 'utils/cookies';
import axios from '../../../axios/axios';

export interface Restaurant {
  _id: string;
  name: string;
  address: string;
}

export const updateRestaurantController = async (name: string, address: string, id: string) => {
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
    const res = await axios.put(`/admin/restaurant/${id}`, reqBody, config);
    return res;
  } catch (err) {
    console.log('Error: ', err);
    return err.response;
  }
};
