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
    images: [
      'https://pakwired.com/wp-content/uploads/2017/09/pizza-1.jpg',
      'https://pakwired.com/wp-content/uploads/2017/09/pizza-1.jpg',
    ],
  };

  console.log('Req body: ', reqBody.name);
  try {
    const res = await axios.put(`/admin/item/${itemId}`, reqBody, config);
    console.log('update data: ', res.data);
    return res;
  } catch (err) {
    console.log('Error: ', err);
    return err.response;
  }
};
