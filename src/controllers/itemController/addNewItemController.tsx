import { getToken } from 'utils/cookies';
import axios from '../../../axios/axios';

export const addNewItemController = async (
  menuId: string,
  name: string,
  price: string,
  description: string,
  sellerId: string,
  category: string,
) => {
  const config = {
    headers: {
      Authorization: `${getToken()}`,
    },
  };
  console.log('Tokeeen: ', getToken());

  const reqBody = {
    item: {
      name: name,
      price: price,
      description: description,
      menu: menuId,
      seller: sellerId,
      category: category,
      images: [],
    },
  };

  try {
    const res = await axios.post('/admin/items/new', reqBody, config);
    console.log('Res data: ', res.data);
    return res;
  } catch (err) {
    console.log('Error: ', err.response);
    return err.response;
  }
};
