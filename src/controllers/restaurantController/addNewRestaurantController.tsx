import { getToken } from 'utils/cookies';
import axios from '../../../axios/axios';

export const addNewRestaurantController = async (
  mainImage: any,
  images: any,
  name: string,
  address: string,
  adminRating: number,
) => {
  const configFormData = {
    headers: {
      Authorization: `${getToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  // console.log('Tokeeen: ', getToken());

  const reqBody = {
    mainImage: '',
    images: [],
    name: name,
    address: address,
    adminRating: adminRating,
  };

  const formData = new FormData();
  formData.append('restaurant', JSON.stringify(reqBody));
  formData.append('mainImage', mainImage);
  for (let i = 0; i < images.length; i++) {
    formData.append('assets', images[i]);
  }

  try {
    const res = await axios.post('/admin/restaurant/new', formData, configFormData);
    return res;
  } catch (err) {
    console.log('Error: ', err.response);
    return err.response;
  }
};
