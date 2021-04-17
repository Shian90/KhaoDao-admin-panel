import axios from '../../../axios/axios';

export const getAllItemsController = async () => {
  try {
    const res = await axios.get('/items');
    console.log('Items: ', res);
    return res;
  } catch (err) {
    console.log('Error: ', err);
    return err.response;
  }
};
