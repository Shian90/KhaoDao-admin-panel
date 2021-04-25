import { getToken } from 'utils/cookies';
import axios from '../../../axios/axios';

export const getAllAreasController = async () => {
  const config = {
    headers: {
      Authorization: `${getToken()}`,
    },
  };
  console.log('Token: ', getToken());
  try {
    const res = await axios.get('/admin/restaurant/areas', config);
    console.log('Areas: ', res);
    return res;
  } catch (err) {
    console.log('Error: ', err);
    return err.response;
  }
};
