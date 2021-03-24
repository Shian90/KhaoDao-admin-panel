import axios from '../../axios/axios';

export interface ShopTag {
  id: number;
  name: string;
}

export interface MapShopTagToShop {
  id: number;
  shop_obj: number;
  shop_tag_obj: number;
}

const createTagFormData = (shop_tag_name: string): FormData => {
  const tagFormData = new FormData();
  tagFormData.append('shop_tag_name', shop_tag_name);
  return tagFormData;
};

const createTagAssignmentFormData = (shop_id: number, shop_tag_id: number): FormData => {
  const tagFormData = new FormData();
  tagFormData.append('shop_tag_id', shop_tag_id.toString());
  tagFormData.append('shop_id', shop_id.toString());
  return tagFormData;
};

const getAllTags = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  try {
    const res = await axios.get('/super/merchants/tags/', config);
    console.log(res.status);
    return res.data;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

const postTag = async (token: string, TagFormData: FormData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    };

    const res = await axios.post('/super/merchants/tags/', TagFormData, config);
    //console.log(res);
    return res.status;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

const updateTag = async (token: string, TagFormData: FormData, id: number) => {
  try {
    TagFormData.append('id', id.toString());

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    };
    const res = await axios.put('/super/merchants/tags/', TagFormData, config);
    console.log(res.data);
    return res.status;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

const deleteTag = async (token: string, id: number) => {
  try {
    const config = {
      headers: {
        //   'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    };
    const res = await axios.delete(`/super/tags/?shop_tag_id=${id}`, config);

    console.log(res.data);
    return res.status;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

const getAllTagAssignment = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  try {
    const res = await axios.get('/super/merchants/tags/assign/', config);
    console.log(res.status);
    return res.data;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

const postTagAssignement = async (token: string, TagAssignmentFormData: FormData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    };

    const res = await axios.post('/super/merchants/tags/assign/', TagAssignmentFormData, config);
    //console.log(res);
    return res.status;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

const deleteTagAssignment = async (token: string, shop_id: number, shop_tag_id: number) => {
  try {
    const config = {
      headers: {
        //   'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    };
    const res = await axios.delete(
      `/super/merchants/tags/assign/?shop_id=${shop_id}&shop_tag_id=${shop_tag_id}`,
      config,
    );

    console.log(res.data);
    return res.status;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

export {
  getAllTags,
  postTag,
  updateTag,
  deleteTag,
  createTagFormData,
  createTagAssignmentFormData,
  getAllTagAssignment,
  deleteTagAssignment,
  postTagAssignement,
};
