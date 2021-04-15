import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React from 'react';

import Auth from 'components/Auth';
import Layout from 'Layouts';
import { Formik } from 'formik';
import { useState } from 'react';
import { updateRestaurantController } from 'controllers/restaurantController/updateRestaurantController';
import { getAllRestaurantsController } from 'controllers/restaurantController/getAllRestaurantsController';
import styled from 'styled-components';
import Select from '@paljs/ui/Select';
import { useEffect } from 'react';
import { Restaurant } from 'Models/Restaurant';

export const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

class SelectItem {
  value: string;
  label: string;
  address: string;
  adminRating: number;
  mainImage: any;
  images: any;

  constructor(v: string, l: string, a: string, adminRating: number, mainImage: any, images: any) {
    this.value = v;
    this.label = l;
    this.address = a;
    this.adminRating = adminRating;
    this.mainImage = mainImage;
    this.images = images;
  }
}

function updateRestaurant() {
  //const router = useRouter();
  const options = new Array();
  const [errorMessage, setErrorMessage] = useState('');
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState(options);

  useEffect(() => {
    getAllRestaurantsController()
      .then((res) => {
        if (res.data.success == true) {
          res.data.restaurants.map((v: Restaurant) => {
            setOption((option) => [
              ...option,
              {
                value: v._id,
                label: v.name,
                address: v.address,
                adminRating: v.adminRating,
                mainImage: v.mainImage,
                images: v.images,
              },
            ]);
          });
          setRestaurant(res.data.restaurant);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
        setLoading(false);
      });
    return () => {};
  }, []);

  const handleAddRestaurant = async (
    name: string,
    address: string,
    id: string,
    adminRating: string,
    mainImage: any,
    images: any,
    updatedMainImage: any,
    updatedImages: any,
  ) => {
    try {
      await option.forEach((option) => {
        if (option.value == id) {
          mainImage = option.mainImage;
          images = option.images;
        }
      });
      setLoading(true);
      const res = await updateRestaurantController(
        name,
        address,
        id,
        adminRating,
        mainImage,
        images,
        updatedMainImage,
        updatedImages,
      );

      if (res.data.success == true) {
        setErrorMessage('');
        setRestaurant(res.data.restaurant.name);
        let modifiedOptions = new Array();
        option.forEach((option) => {
          if (option.value == res.data.restaurant._id) {
            option.label = res.data.restaurant.name;
            option.address = res.data.restaurant.address;
            option.adminRating = res.data.restaurant.adminRating;
            option.mainImage = res.data.restaurant.mainImage;
            option.images = res.data.restaurant.images;
          }
          modifiedOptions.push(option);
        });
        setOption(modifiedOptions);
        setLoading(false);
      } else {
        setRestaurant([]);
        setErrorMessage(res.data.errMessage);
        setLoading(false);
      }
    } catch (err) {
      console.log('Error: ', err);
      setRestaurant([]);
      setErrorMessage(`Error Connecting to server.`);
      setLoading(false);
    }
  };

  return (
    <Layout title="Update Restaurant">
      <Auth title="Update Restaurant" subTitle="Update a restaurant here Bossmen">
        <Formik
          initialValues={{
            name: '',
            address: '',
            id: new SelectItem('', 'Select a restaurant', '', 0, '', []),
            adminRating: '',
            mainImage: '',
            images: [],
            updatedMainImage: undefined,
            updatedImages: undefined,
          }}
          onSubmit={async (values) => {
            handleAddRestaurant(
              values.name,
              values.address,
              values.id.value,
              values.adminRating,
              values.mainImage,
              values.images,
              values.updatedMainImage,
              values.updatedImages,
            );
          }}
        >
          {(props) => {
            const { values, handleChange, handleBlur, handleSubmit, setFieldValue, touched, errors } = props;
            return (
              <form onSubmit={handleSubmit}>
                <SelectStyled
                  options={option}
                  placeholder="Select"
                  value={values.id}
                  onChange={(value: SelectItem) => {
                    setFieldValue('id', value);
                    //const tag = restaurantIdToRestaurantAdapter(value.value, tags);
                    setFieldValue('name', value.label);
                    setFieldValue('address', value.address);
                    setFieldValue('adminRating', value.adminRating);
                    setFieldValue('mainImage', value.mainImage);
                    setFieldValue('images', value.images);
                  }}
                  onBlur={handleBlur}
                  touched={touched.id}
                  error={errors.id}
                  id="id"
                />

                <input
                  id="mainFile"
                  name="mainFile"
                  type="file"
                  multiple={false}
                  onChange={(event) => {
                    setFieldValue('updatedMainImage', event.currentTarget.files ? event.currentTarget.files[0] : []);
                  }}
                  className="form-control"
                  required={false}
                />

                <input
                  id="file"
                  name="file"
                  type="file"
                  multiple={true}
                  onChange={(event) => {
                    setFieldValue('updatedImages', event.currentTarget.files ? event.currentTarget.files : []);
                  }}
                  className="form-control"
                  required={false}
                />
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
                  Update Restaurant
                </Button>
                <div>{props.values.name}</div>
              </form>
            );
          }}
        </Formik>
        <div style={{ color: 'red' }}>{errorMessage}</div>
        {restaurant ? <div style={{ color: 'green', margin: 10 }}>{`Successfully Updated ${restaurant}`}</div> : null}
      </Auth>
    </Layout>
  );
}

export default updateRestaurant;
