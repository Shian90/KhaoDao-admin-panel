import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React from 'react';

import Auth from 'components/Auth';
import Layout from 'Layouts';
import { Formik } from 'formik';
//import { useRouter } from 'next/router';
import { useState } from 'react';
import { getAllMenusController, updateMenuController } from '../../controllers/menuController/menuController';
import { useEffect } from 'react';
import { getAllRestaurantsController } from '../../controllers/restaurantController/getAllRestaurantsController';

import Select from '@paljs/ui/Select';
import styled from 'styled-components';
import { Restaurant } from '../../Models/Restaurant';
import { Menu } from 'Models/Menu';

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

function updateMenu() {
  //const router = useRouter();
  const options = new Array();
  const [errorMessage, setErrorMessage] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [loading, setLoading] = useState(false);
  const [restaurantOption, setRestaurantOption] = useState(options);
  const [menuOption, setMenuOption] = useState(options);

  const handleUpdateMenu = async (id: string, name: string, restaurant_id: string) => {
    try {
      setLoading(true);
      const res = await updateMenuController(name, restaurant_id, id);

      if (res.data.success == true) {
        setErrorMessage('');
        setRestaurant(res.data.menu.name);
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
    getAllMenusController()
      .then((res) => {
        if (res.data.success == true) {
          res.data.menus.map((v: Menu) => {
            setMenuOption((menuOption) => [
              ...menuOption,
              {
                value: v._id,
                label: v.name,
              },
            ]);
          });
        }
      })
      .catch((err) => console.log(err));

    getAllRestaurantsController()
      .then((res) => {
        console.log('Could?');
        if (res.data.success == true) {
          console.log('Could');
          res.data.restaurants.map((v: Restaurant) => {
            //console.log(option);
            //console.log(v._id);
            setRestaurantOption((restaurantOption) => [
              ...restaurantOption,
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
          initialValues={{ name: '', menu_id: '', restaurant: {}, menu: {}, restaurant_id: '' }}
          onSubmit={async (values) => {
            handleUpdateMenu(values.menu_id, values.name, values.restaurant_id);
          }}
        >
          {(props) => {
            const { values, handleChange, handleBlur, handleSubmit, setFieldValue, touched, errors } = props;
            return (
              <form onSubmit={handleSubmit}>
                <SelectStyled
                  options={menuOption}
                  placeholder="Select"
                  name="menu"
                  value={values.menu}
                  onChange={(value: SelectItem) => {
                    setFieldValue('menu_id', value.value);
                    //const tag = restaurantIdToRestaurantAdapter(value.value, tags);
                    //console.log(zone);
                    //console.log(value.value);
                    setFieldValue('menu', value);
                    setFieldValue('name', value.label);
                    //setFieldValue('address', value.address);
                  }}
                  onBlur={handleBlur}
                  touched={touched.menu_id}
                  error={errors.menu_id}
                  id="id"
                />

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
                  options={restaurantOption}
                  placeholder="Select Restaurant"
                  name="restaurant"
                  value={values.restaurant}
                  onChange={(value: SelectItem) => {
                    setFieldValue('restaurant_id', value.value);
                    //const tag = restaurantIdToRestaurantAdapter(value.value, tags);
                    //console.log(zone);
                    //console.log(value.value);
                    setFieldValue('restaurant', value);
                    //setFieldValue('address', value.address);
                  }}
                  onBlur={handleBlur}
                  touched={touched.restaurant_id}
                  error={errors.restaurant_id}
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

export default updateMenu;
