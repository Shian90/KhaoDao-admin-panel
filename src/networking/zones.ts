import axios from '../../axios/axios';

const createZoneFormData = (
  name: string,
  north_geocode: string,
  north_east_geocode: string,
  east_geocode: string,
  south_east_geocode: string,
  south_geocode: string,
  south_west_geocode: string,
  west_geocode: string,
  north_west_geocode: string,
): FormData => {
  const zoneFormData = new FormData();
  zoneFormData.append('name', name);
  zoneFormData.append('north_geocode', north_geocode);
  zoneFormData.append('north_east_geocode', north_east_geocode);
  zoneFormData.append('east_geocode', east_geocode);
  zoneFormData.append('south_east_geocode', south_east_geocode);
  zoneFormData.append('south_geocode', south_geocode);
  zoneFormData.append('south_west_geocode', south_west_geocode);
  zoneFormData.append('west_geocode', west_geocode);
  zoneFormData.append('north_west_geocode', north_west_geocode);
  return zoneFormData;
};

const getAllZones = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  try {
    const res = await axios.get('/super/zones/', config);
    console.log(res.status);
    return res.data;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

const postZone = async (token: string, zoneFormData: FormData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    };

    const res = await axios.post('/super/zones/', zoneFormData, config);
    //console.log(res);
    return res.status;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

const updateZone = async (token: string, zoneFormData: FormData, id: number) => {
  try {
    zoneFormData.append('id', id.toString());

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    };
    const res = await axios.put('/super/zones/', zoneFormData, config);
    console.log(res.data);
    return res.status;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

const deleteZone = async (token: string, id: number) => {
  try {
    const config = {
      headers: {
        //   'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
    };
    const res = await axios.delete(`/super/zones/?zone_id=${id}`, config);

    console.log(res.data);
    return res.status;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

export { getAllZones, postZone, updateZone, deleteZone, createZoneFormData };
