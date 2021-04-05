import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React from 'react';

import Auth from 'components/Auth';
import Layout from 'Layouts';
import { Formik } from 'formik';
//import { useRouter } from 'next/router';
import { useState } from 'react';
import { addNewMenuController } from '../../controllers/menuController/menuController';
import { useEffect } from 'react';
import { getAllRestaurantsController } from '../../controllers/restaurantController/getAllRestaurantsController';

import Select from '@paljs/ui/Select';
import styled from 'styled-components';
import { Restaurant } from '../../Models/Restaurant';

export const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

// function restaurantIdToRestaurantAdapter(id: string, array : Array<Restaurant>): Restaurant {
//    var restaurant = new Object() as Restaurant

//    array.forEach((res) => {
//     if (res.id === id) {
//       //console.log(res.name);
//       restaurant = res;
//     }
//   });

//     return restaurant;
// }

class SelectItem {
  value: string;
  label: string;
  address: string;

  constructor(v: string, l: string, a: string) {
    //console.log(v);
    this.value = v;
    this.label = l;
    this.address = a;
  }
}

function addNewRestaurant() {
  //const router = useRouter();
  const options = new Array();
  const [errorMessage, setErrorMessage] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState(options);

  const handleAddRestaurant = async (name: string, address: string) => {
    try {
      setLoading(true);
      const res = await addNewMenuController(name, address);

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

  useEffect(() => {
    getAllRestaurantsController()
      .then((res) => {
        console.log('Could?');
        if (res.data.success == true) {
          console.log('Could');
          res.data.restaurants.map((v: Restaurant) => {
            //console.log(option);
            //console.log(v._id);
            setOption((option) => [
              ...option,
              {
                value: v._id,
                label: v.name,
                address: v.address,
              },
            ]);
          });
          //console.log(option);
          setRestaurant(res.data.restaurant);
        } else {
          console.log('Could not');
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
        setLoading(false);
        //setError(`Internal Server Error.`);
      });
    return () => {};
  }, []);

  return (
    <Layout title="Add Menu">
      <Auth title="Add Menu" subTitle="Add a menu here Bossmen">
        <Formik
          initialValues={{ name: '', id: '', restaurant: {} }}
          onSubmit={async (values) => {
            handleAddRestaurant(values.name, values.id);
          }}
        >
          {(props) => {
            const { values, handleChange, handleBlur, handleSubmit, setFieldValue, touched, errors } = props;
            return (
              <form onSubmit={handleSubmit}>
                <InputGroup fullWidth>
                  <input
                    id="name"
                    type="name"
                    placeholder="Name of the Menu"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputGroup>

                <SelectStyled
                  options={option}
                  placeholder="Select"
                  name="restaurant"
                  value={values.restaurant}
                  onChange={(value: SelectItem) => {
                    setFieldValue('id', value.value);
                    //const tag = restaurantIdToRestaurantAdapter(value.value, tags);
                    //console.log(zone);
                    //console.log(value.value);
                    setFieldValue('restaurant', value);
                    //setFieldValue('address', value.address);
                  }}
                  onBlur={handleBlur}
                  touched={touched.id}
                  error={errors.id}
                  id="id"
                />

                <Button status="Success" type="submit" shape="SemiRound" fullWidth disabled={loading}>
                  Boss Add Maren
                </Button>

                {/* <div>{props}</div> */}
              </form>
            );
          }}
        </Formik>
        <div style={{ color: 'red' }}>{errorMessage}</div>
        {restaurant ? <div style={{ color: 'green', margin: 10 }}>{`Successfully added`}</div> : null}
      </Auth>
    </Layout>
  );
}

export default addNewRestaurant;
