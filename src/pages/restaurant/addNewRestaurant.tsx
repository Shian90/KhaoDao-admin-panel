import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React from 'react';
import styled from 'styled-components';
import Select from '@paljs/ui/Select';

import Auth from 'components/Auth';
import Layout from 'Layouts';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { addNewRestaurantController } from '../../controllers/restaurantController/addNewRestaurantController';
import { resizeFile, resizeFiles } from 'utils/resize';
import { getAllAreasController } from 'controllers/restaurantController/getAllAreasController';

export const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

class SelectArea {
  value: string;
  label: string;

  constructor(areaName: string) {
    this.label = areaName;
    this.value = areaName;
  }
}

function addNewRestaurant() {
  const areaoptions = new Array();
  let offersarray = new Array();
  const [errorMessage, setErrorMessage] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [loading, setLoading] = useState(false);
  const [areaOptions, setAreaOptions] = useState(areaoptions);
  const [offersArrayState, setOffersArrayState] = useState(offersarray);

  useEffect(() => {
    setLoading(true);
    getAllAreasController()
      .then((res) => {
        setLoading(false);
        if (res.data.success == true) {
          res.data.areas.map((areaName: string) => {
            setAreaOptions((categoryOption) => [
              ...categoryOption,
              {
                value: areaName,
                label: areaName,
              },
            ]);
          });
        } else {
          setLoading(false);
          setErrorMessage(res.data.errMessage);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log('Error: ', err);
        //setErrorMessage(`Internal Server Error.`);
      });
    return () => {};
  }, []);

  const handleAddRestaurant = async (
    mainImage: any,
    images: any,
    name: string,
    address: string,
    area: string,
    adminRating: string,
    offers: any,
  ) => {
    try {
      setLoading(true);
      const res = await addNewRestaurantController(mainImage, images, name, area, address, adminRating, offers);

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

  return (
    <Layout title="Add Restaurant">
      <Auth title="Add Restaurant" subTitle="Add a restaurant here Bossmen">
        <Formik
          initialValues={{
            mainFile: '',
            file: [],
            name: '',
            address: '',
            area: new SelectArea('Select an area'),
            adminRating: '',
            offer: '',
            offers: [],
          }}
          onSubmit={async (values) => {
            handleAddRestaurant(
              values.mainFile,
              values.file,
              values.name,
              values.address,
              values.area.value,
              values.adminRating,
              values.offers,
            );
          }}
        >
          {(props) => {
            const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props;
            return (
              <form onSubmit={handleSubmit}>
                <div>
                  <span>Main Image: </span>
                  <input
                    id="mainFile"
                    accept="image/*"
                    name="mainFile"
                    type="file"
                    multiple={false}
                    onChange={async (event) => {
                      try {
                        const imageFile = await resizeFile(
                          event.currentTarget.files ? event.currentTarget.files[0] : '',
                        );
                        setFieldValue('mainFile', imageFile);
                      } catch (error) {
                        console.log('Error resizing image: ', error.message);
                      }
                    }}
                    className="form-control"
                    required={false}
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
                        let fileList = event.target.files ? event.target.files : [];
                        const imageFiles = await resizeFiles(fileList);
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
                <SelectStyled
                  options={areaOptions} //<option value="" label="" />
                  value={values.area}
                  onChange={(area: SelectArea) => {
                    setFieldValue('area', area);
                  }}
                  onBlur={handleBlur}
                  touched={touched.area}
                  error={errors.area}
                  id="seller"
                />
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

                <InputGroup fullWidth>
                  <input
                    id="offer"
                    type="offer"
                    placeholder="Offers from the Restaurant"
                    value={values.offer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      if (props.values.offer !== '') {
                        setFieldValue('offers', [...props.values.offers, props.values.offer]);
                        setOffersArrayState((offer) => [...offer, props.values.offer]);
                      }
                    }}
                  >
                    Add
                  </button>
                </InputGroup>
                <div>
                  {offersArrayState.map((offer: any, index: number) => (
                    <span style={{ display: 'flex', flexDirection: 'column' }}>{`${index + 1}: ${offer} `}</span>
                  ))}
                </div>
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
