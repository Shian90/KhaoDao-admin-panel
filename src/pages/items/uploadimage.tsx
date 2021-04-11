import axios from 'axios/axios';
import { readFileSync } from 'fs';
import { useState } from 'react';
import { getToken } from 'utils/cookies';
import Auth from 'components/Auth';
import Layout from 'Layouts';

function uploadimage() {
  //   const imageArray = new Array();
  const [image, setImage] = useState([]);

  const handleEvent = (event) => {
    if (event.currentTarget.files) {
      setImage(event.currentTarget.files);
    }
  };

  const handleSubmit = async () => {
    const formdata = new FormData();
    const config = {
      headers: {
        Authorization: `${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    console.log('Imageee: ', image);
    for (let i = 0; i < image.length; i++) {
      formdata.append('assets', image[i]);
    }
    console.log('Formdattaaaa: ', formdata.get('assets'));
    try {
      const res = await axios.put(`/admin/item/606f181beead520015a404c7/addImages`, formdata, config);
      console.log(res.data);
    } catch (error) {
      console.log('Error 1: ', error.response);
    }
  };
  return (
    <Layout title="Update Item">
      <Auth title="Update Item" subTitle="Update item here Bossmen">
        <input
          id="file"
          name="file"
          type="file"
          multiple={true}
          onChange={(event) => {
            console.log('Filee: ', event.currentTarget.files);
            handleEvent(event);
          }}
          className="form-control"
          required={false}
        />
        ;<button onClick={handleSubmit}> Upload</button>;
      </Auth>
    </Layout>
  );
}

export default uploadimage;
