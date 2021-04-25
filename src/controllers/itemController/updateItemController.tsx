import { getToken } from 'utils/cookies';
import axios from '../../../axios/axios';

export const updateItemController = async (
  menuId: string,
  name: string,
  price: string,
  description: string,
  sellerId: string,
  categories: any,
  itemId: string,
  images: any,
  adminRating: string,
  mainImage: string,
  updatedMainImage: any,
  updatedImages: any,
) => {
  // const config = {
  //   headers: {
  //     Authorization: `${getToken()}`,
  //   },
  // };

  console.log(menuId);

  const configFormData = {
    headers: {
      Authorization: `${getToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  // console.log('Tokeeen: ', getToken());

  const reqBody = {
    name: name,
    price: price,
    description: description,
    seller: sellerId,
    categories: categories,
    images: images,
    adminRating: adminRating,
    mainImage: mainImage,
  };

  const formData = new FormData();
  formData.append('item', JSON.stringify(reqBody));
  formData.append('mainImage', updatedMainImage);

  if (updatedImages !== undefined) {
    for (let i = 0; i < updatedImages.length; i++) {
      formData.append('assets', updatedImages[i]);
    }
  } else {
    formData.append('assets', updatedImages);
  }

  // console.log('Item: ', formData.get('item'));
  // console.log('MainImage: ', formData.get('mainImage'));
  // console.log('Images: ', formData.get('assets'));

  // console.log('Req body: ', reqBody);

  try {
    const res = await axios.put(`/admin/item/${itemId}`, formData, configFormData);
    console.log('update data: ', res.data);
    return res;
  } catch (err) {
    console.log('Error: ', err);
    return err.response;
  }
};
