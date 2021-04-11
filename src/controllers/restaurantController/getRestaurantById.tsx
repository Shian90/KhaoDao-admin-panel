import axios from '../../../axios/axios';

export const getRestaurantByIdController = async (id: string) => {
  try {
    //console.log("I am hereeee");
    const res = await axios.get(`/restaurant/${id}`);
    console.log('Restaurant By Id: ', res);
    return res;
  } catch (err) {
    console.log('Error on resById: ', err);
    return err.response;
  }
};
