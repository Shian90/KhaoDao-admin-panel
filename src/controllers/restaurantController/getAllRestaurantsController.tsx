import axios from '../../../axios/axios';

export const getAllRestaurantsController = async () => {
  try {
    const res = await axios.get('/restaurants');
    console.log('Restaurants: ', res);
    return res;
  } catch (err) {
    console.log('Error: ', err);
    return err.response;
  }
};
