import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React from 'react';
import Resizer from 'react-image-file-resizer';

import Auth from 'components/Auth';
import Layout from 'Layouts';
import { Formik } from 'formik';
import { useState } from 'react';
import { addNewRestaurantController } from '../../controllers/restaurantController/addNewRestaurantController';

function addNewRestaurant() {
  const [errorMessage, setErrorMessage] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddRestaurant = async (
    mainImage: any,
    images: any,
    name: string,
    address: string,
    adminRating: string,
  ) => {
    try {
      setLoading(true);
      const res = await addNewRestaurantController(mainImage, images, name, address, adminRating);

      if (res.data.success == true) {
        setErrorMessage('');
        setRestaurant(res.data.restaurant.name);
        setLoading(false);
      } else {
        setRestaurant('');
        setErrorMessage(res.data.errMessage);
        setLoading(false);
      }
    } catch (err) {
      console.log('Error: ', err);
      setRestaurant('');
      setErrorMessage(`Error Connecting to server.`);
      setLoading(false);
    }
  };

  const resizeFile = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1920,
        1080,
        'JPEG',
        10,
        0,
        (uri) => {
          resolve(uri);
        },
        'file',
      );
    });

  const resizeFiles = (files: any) => {
    let uris: any = [];
    if (files !== []) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          1920,
          1080,
          'JPEG',
          10,
          0,
          (uri) => {
            uris.push(uri);
          },
          'file',
        );
      }
      return uris;
    } else return [];
  };

  return (
    <Layout title="Add Restaurant">
      <Auth title="Add Restaurant" subTitle="Add a restaurant here Bossmen">
        <Formik
          initialValues={{ mainFile: '', file: [], name: '', address: '', adminRating: '' }}
          onSubmit={async (values) => {
            handleAddRestaurant(values.mainFile, values.file, values.name, values.address, values.adminRating);
          }}
        >
          {(props) => {
            const { values, handleChange, handleBlur, handleSubmit, setFieldValue } = props;
            return (
              <form onSubmit={handleSubmit}>
                <div>
                  <span>Main Image(Required): </span>
                  <input
                    id="mainFile"
                    accept="image/*"
                    name="mainFile"
                    type="file"
                    multiple={false}
                    onChange={async (event) => {
                      try {
                        console.log('Selected image: ', event.currentTarget.files[0]);
                        const imageFile = await resizeFile(
                          event.currentTarget.files ? event.currentTarget.files[0] : '',
                        );
                        console.log('Resized image: ', imageFile);
                        setFieldValue('mainFile', imageFile);
                      } catch (error) {
                        console.log('Error resizing image: ', error.message);
                      }
                    }}
                    className="form-control"
                    required={true}
                  />
                </div>
                <div>
                  <span>Additional Images: </span>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    accept="image/*"
                    multiple={true}
                    onChange={async (event) => {
                      try {
                        console.log('Selected images: ', event.currentTarget.files);
                        let fileList = event.target.files ? event.target.files : [];
                        const imageFiles = await resizeFiles(fileList);
                        console.log('Resized Files: ', imageFiles);
                        setFieldValue('file', imageFiles);
                      } catch (error) {
                        console.log('Error in resizing image: ', error.message);
                      }
                    }}
                    className="form-control"
                    required={false}
                  />
                </div>
                <InputGroup fullWidth>
                  <input
                    id="name"
                    type="name"
                    placeholder="Name of the Restaurant"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputGroup>
                <InputGroup fullWidth>
                  <input
                    id="address"
                    type="address"
                    placeholder="Address of the Restaurant"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputGroup>
                <InputGroup fullWidth>
                  <input
                    id="adminRating"
                    type="adminRating"
                    placeholder="AdminRating of the Restaurant"
                    value={values.adminRating}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputGroup>

                <Button status="Success" type="submit" shape="SemiRound" fullWidth disabled={loading}>
                  Boss Add Maren
                </Button>
              </form>
            );
          }}
        </Formik>
        <div style={{ color: 'red' }}>{errorMessage}</div>
        {restaurant ? <div style={{ color: 'green', margin: 10 }}>{`Successfully added ${restaurant}`}</div> : null}
      </Auth>
    </Layout>
  );
}

export default addNewRestaurant;
