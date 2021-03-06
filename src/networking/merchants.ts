import axios from '../../axios/axios';
import { getToken } from '../utils/cookies';

export interface Merchant {
  merchant_id: number;
  merchant_email: string;
  merchant_name: string;
  //password: string;
  shop_name: string;
  zone_name: string;
  //shop_category: string;
  address: string;
  gps_pos: string;
  shop_id: number;
  status: string;
  is_available: boolean;
  //password?: string;
  //gps_pos_x?: string;
  //gps_pos_y?: string;
}

function shopIdToShopName(id: number, merchants: Array<Merchant>): string {
  console.log(merchants);
  console.log(id.toString());
  const merchant: Array<Merchant> = merchants.filter((s: Merchant) => s.shop_id === id);
  if (merchant.length > 0) return merchant[0].shop_name;
  return 'Null';
}

const createMerchantFormData = (
  email: string,
  full_name: string,
  password: string,
  shop_name: string,
  zone_name: string,
  //shop_category: string,
  address: string,
  gps_pos_x: string,
  gps_pos_y: string,
): FormData => {
  const merchantFormData = new FormData();
  merchantFormData.append('email', email);
  merchantFormData.append('full_name', full_name);
  merchantFormData.append('password', password);
  merchantFormData.append('shop_name', shop_name);
  merchantFormData.append('zone_name', zone_name);
  merchantFormData.append('address', address);
  //merchantFormData.append('shop_category', shop_category);
  merchantFormData.append('gps_pos_x', gps_pos_x);
  merchantFormData.append('gps_pos_y', gps_pos_y);
  return merchantFormData;
};

const getAllMerchants = async (token: String) => {
  //console.log(getToken());
  if (token === undefined) {
    token = getToken();
  }

  token = getToken();

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  try {
    const res = await axios.get('/super/merchants/', config);
    console.log(res.status);
    return res.data;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

const postMerchant = async (token: string, merchantFormData: FormData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    };

    const res = await axios.post('/super/merchants/', merchantFormData, config);
    //console.log(res);
    return res.status;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

const updateMerchant = async (token: string, merchantFormData: FormData, id: number) => {
  try {
    merchantFormData.append('id', id.toString());

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    };
    const res = await axios.put('/super/merchants/', merchantFormData, config);
    console.log(res.data);
    return res.status;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

const deleteMerchant = async (token: string, id: number) => {
  try {
    const config = {
      headers: {
        //   'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    };
    const res = await axios.delete(`/super/merchants/?merchant_id=${id}`, config);

    console.log(res.data);
    return res.status;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

export { getAllMerchants, postMerchant, updateMerchant, deleteMerchant, createMerchantFormData, shopIdToShopName };
