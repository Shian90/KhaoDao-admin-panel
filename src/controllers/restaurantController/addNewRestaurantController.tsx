import axios from '../../../axios/axios';

export interface Restaurant {
  id: number;
  name: string;
}

export const addNewRestaurantController = async (name: string, address: string) => {
  const reqBody = {
    name: name,
    address: address,
  };

  try {
    const res = await axios.post('/admin/restaurant/new', reqBody);
    return res;
  } catch (err) {
    console.log('Error: ', err);
    return err;
  }
};
