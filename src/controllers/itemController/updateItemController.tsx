import { getToken } from 'utils/cookies';
import axios from '../../../axios/axios';

export const updateItemController = async (
  menuId: string,
  name: string,
  price: string,
  description: string,
  sellerId: string,
  category: string,
  itemId: string,
  images: any,
) => {
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
    seller: sellerId,
    category: category,
    images: images,
  };

  console.log('Req body: ', reqBody);
  try {
    const res = await axios.put(`/admin/item/${itemId}`, reqBody, config);
    console.log('update data: ', res.data);
    return res;
  } catch (err) {
    console.log('Error: ', err);
    return err.response;
  }
};
