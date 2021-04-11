import { getToken } from 'utils/cookies';
import axios from '../../../axios/axios';

export const addNewItemController = async (
  menuId: string,
  name: string,
  price: string,
  description: string,
  sellerId: string,
  category: string,
  images: any,
  // review: string,
) => {
  const configFormData = {
    headers: {
      Authorization: `${getToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const config = {
    headers: {
      Authorization: `${getToken()}`,
    },
  };
  console.log('Tokeeen: ', getToken());

  const reqBody = {
    name: name,
    price: price,
    description: description,
    menu: menuId,
    seller: sellerId,
    category: category,
    images: [],
    // reviews: [{ admin: review }],
  };

  const formData = new FormData();
  formData.append('item', JSON.stringify(reqBody));

  for (let i = 0; i < images.length; i++) {
    formData.append('assets', images[i]);
  }
  console.log('Images: ', formData.get('item'));
  console.log('Images: ', formData.get('assets'));

  try {
    const res = await axios.post('/admin/items/new', formData, configFormData);
    console.log('Res data: ', res.data);
    return res;
  } catch (err) {
    console.log('Error: ', err.response);
    return err.response;
  }
};
