import { getToken } from 'utils/cookies';
import axios from '../../../axios/axios';

export const updateRestaurantController = async (
  name: string,
  address: string,
  area: string,
  id: string,
  adminRating: string,
  mainImage: any,
  images: any,
  updatedMainImage: any,
  updatedImages: any,
  offers: any,
) => {
  // const config = {
  //   headers: {
  //     Authorization: `${getToken()}`,
  //   },
  // };

  const configFormData = {
    headers: {
      Authorization: `${getToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  // console.log('Tokeeen: ', getToken());

  const reqBody = {
    name: name,
    address: address,
    area: area,
    adminRating: adminRating,
    images: images,
    mainImage: mainImage,
    offers: offers,
  };

  const formData = new FormData();
  formData.append('restaurant', JSON.stringify(reqBody));
  formData.append('mainImage', updatedMainImage);

  if (updatedImages !== undefined) {
    for (let i = 0; i < updatedImages.length; i++) {
      formData.append('assets', updatedImages[i]);
    }
  } else {
    formData.append('assets', updatedImages);
  }

  // console.log('Restaurant FD : ', formData.get('restaurant'));
  // console.log('MainImage DF: ', formData.get('mainImage'));
  // console.log('Images FD: ', formData.get('assets'));

  // console.log('Req body: ', reqBody);

  try {
    const res = await axios.put(`/admin/restaurant/${id}`, formData, configFormData);
    return res;
  } catch (err) {
    console.log('Error: ', err);
    return err.response;
  }
};
