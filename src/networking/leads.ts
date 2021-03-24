import axios from '../../axios/axios';

export interface Status {
  id: number;
  status: string;
}

const createStatusFormData = (status: string): FormData => {
  const statusFormData = new FormData();
  //statusFormData.append('id', id.toString());
  statusFormData.append('status', status);
  return statusFormData;
};

const getAllMerchantLeads = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  try {
    const res = await axios.get('/super/applications/merchants/', config);
    console.log(res.status);
    return res.data;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

const updateMerchantLeadStatus = async (token: string, StatusFormData: FormData, id: number) => {
  try {
    StatusFormData.append('id', id.toString());

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    };
    const res = await axios.put('/super/merchants/tags/assign/', StatusFormData, config);
    console.log(res.data);
    return res.status;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

const getAllRiderLeads = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  try {
    const res = await axios.get('/super/applications/riders/', config);
    console.log(res.status);
    return res.data;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

const updateRiderLeadStatus = async (token: string, StatusFormData: FormData, id: number) => {
  try {
    StatusFormData.append('id', id.toString());

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    };
    const res = await axios.put('/super/applications/riders/', StatusFormData, config);
    console.log(res.data);
    return res.status;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

export { createStatusFormData, getAllMerchantLeads, getAllRiderLeads, updateMerchantLeadStatus, updateRiderLeadStatus };
