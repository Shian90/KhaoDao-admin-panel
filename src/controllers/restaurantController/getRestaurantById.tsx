import axios from '../../../axios/axios';

export const getRestaurantByIdController = async (id: string) => {
  try {
    const res = await axios.get(`/restaurant/${id}`);
    console.log('Restaurant By Id: ', res);
    return res;
  } catch (err) {
    console.log('Error on resById: ', err);
    return err.response;
  }
};
