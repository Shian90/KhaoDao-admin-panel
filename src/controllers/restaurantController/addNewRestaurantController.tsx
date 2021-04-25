import { getToken } from 'utils/cookies';
import axios from '../../../axios/axios';

export const addNewRestaurantController = async (
  mainImage: any,
  images: any,
  name: string,
  area: string,
  address: string,
  adminRating: string,
  offers: any,
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
    area: area,
    address: address,
    adminRating: adminRating,
    offers: offers,
  };

  const formData = new FormData();
  formData.append('restaurant', JSON.stringify(reqBody));
  formData.append('mainImage', mainImage);
  for (let i = 0; i < images.length; i++) {
    formData.append('assets', images[i]);
  }
  console.log('Images: ', formData.get('assets'));
  console.log('mainImage: ', formData.get('mainImage'));
  console.log('restaurant: ', formData.get('restaurant'));
  try {
    const res = await axios.post('/admin/restaurant/new', formData, configFormData);
    return res;
  } catch (err) {
    console.log('Error: ', err.response);
    return err.response;
  }
};
