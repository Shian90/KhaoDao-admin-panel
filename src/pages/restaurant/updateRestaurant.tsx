import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React from 'react';

import Auth from 'components/Auth';
import Layout from 'Layouts';
import { Formik } from 'formik';
//import { useRouter } from 'next/router';
import { useState } from 'react';
//import { addNewRestaurantController } from '../../controllers/restaurantController/addNewRestaurantController';
import { Restaurant, updateRestaurantController } from 'controllers/restaurantController/updateRestaurantController';
import { getAllRestaurantsController } from 'controllers/restaurantController/getAllRestaurantsController';
import styled from 'styled-components';
//import { DisplayFormikState } from 'utils/formikHelper';
import Select from '@paljs/ui/Select';
import { useEffect } from 'react';

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
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState(options);

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

  const handleAddRestaurant = async (name: string, address: string, id: string) => {
    try {
      setLoading(true);
      const res = await updateRestaurantController(name, address, id);

      if (res.data.success == true) {
        setErrorMessage('');
        setRestaurant(res.data.restaurant.name);
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
    <Layout title="Add Restaurant">
      <Auth title="Add Restaurant" subTitle="Add a restaurant here Bossmen">
        <Formik
          initialValues={{ name: '', address: '', id: new SelectItem('', '', '') }}
          onSubmit={async (values) => {
            handleAddRestaurant(values.name, values.address, values.id.value);
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
                    //console.log(zone);
                    setFieldValue('name', value.label);
                    setFieldValue('address', value.address);
                  }}
                  onBlur={handleBlur}
                  touched={touched.id}
                  error={errors.id}
                  id="id"
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

export default addNewRestaurant;
