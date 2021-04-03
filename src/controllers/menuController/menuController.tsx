import { getToken } from 'utils/cookies';
import axios from '../../../axios/axios';

export interface Menu {
  id: number;
  name: string;
  restaurant: string;
}

export const addNewMenuController = async (name: string, address: string) => {
  const config = {
    headers: {
      Authorization: `${getToken()}`,
    },
  };
  console.log('Tokeeen: ', getToken());
  const reqBody = {
    name: name,
    restaurant: address,
  };

  try {
    const res = await axios.post('/admin/menu/new', reqBody, config);
    return res;
  } catch (err) {
    console.log('Error: ', err);
    return err.response;
  }
};

export const getAllMenusController = async () => {
  try {
    const res = await axios.get('/menus');
    console.log('Restaurants: ', res);
    return res;
  } catch (err) {
    console.log('Error: ', err);
    return err.response;
  }
};

export const makeMenuInvisibleController = async (id: string) => {
  try {
    const config = {
      headers: {
        Authorization: `${getToken()}`,
      },
    };
    const res = await axios.put(`/admin/menu/${id}/visibility`, {}, config);
    console.log('Restaurants: ', res);
    return res;
  } catch (err) {
    console.log('Error: ', err);
    return err.response;
  }
};

export const updateMenuController = async (name: string, address: string, id: string) => {
  const config = {
    headers: {
      Authorization: `${getToken()}`,
    },
  };
  console.log('Tokeeen: ', getToken());
  const reqBody = {
    name: name,
    restaurant: address,
  };

  try {
    const res = await axios.put(`/admin/menu/${id}`, reqBody, config);
    return res;
  } catch (err) {
    console.log('Error: ', err);
    return err.response;
  }
};
