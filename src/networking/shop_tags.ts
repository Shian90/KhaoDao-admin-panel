import axios from '../../axios/axios';

export interface ShopTag {
  shop_tag_name: string;
}

const createTagFormData = (shop_tag_name: string): FormData => {
  const tagFormData = new FormData();
  tagFormData.append('shop_tag_name', shop_tag_name);
  return tagFormData;
};

const getAllTags = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  try {
    const res = await axios.get('/super/tags/', config);
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

    const res = await axios.post('/super/tags/', TagFormData, config);
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
    const res = await axios.put('/super/tags/', TagFormData, config);
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

export { getAllTags, postTag, updateTag, deleteTag, createTagFormData };
