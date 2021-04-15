import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React from 'react';

import Auth from 'components/Auth';
import Layout from 'Layouts';
import { Formik } from 'formik';
import { useState } from 'react';
import { getAllRestaurantsController } from 'controllers/restaurantController/getAllRestaurantsController';
import styled from 'styled-components';
import Select from '@paljs/ui/Select';
import { useEffect } from 'react';
import { Restaurant } from 'Models/Restaurant';
import { Menu } from 'Models/Menu';
import { updateMenuController } from 'controllers/menuController/menuController';

export const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

class SelectRestaurantItem {
  value: string;
  label: string;
  restaurantAddress: string;

  constructor(restaurantId: string, restaurantName: string, restaurantAddress: string) {
    this.label = restaurantName;
    this.value = restaurantId;
    this.restaurantAddress = restaurantAddress;
  }
}

class SelectMenuItem {
  value: string;
  label: string;
  restaurantId: string;

  constructor(menuId: string, menuName: string, restaurantId: string) {
    this.label = menuName;
    this.value = menuId;
    this.restaurantId = restaurantId;
  }
}

function updateMenu() {
  const restaurantoptions = new Array();
  const menuoptions = new Array();

  const [errorMessage, setErrorMessage] = useState('');
  const [item, setItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [restaurantOptions, setRestaurantOptions] = useState(restaurantoptions);
  const [menuOptions, setMenuOptions] = useState(menuoptions);

  useEffect(() => {
    getAllRestaurantsController()
      .then((res) => {
        if (res.data.success == true) {
          res.data.restaurants.map((restaurant: Restaurant) => {
            setRestaurantOptions((restaurantOptions) => [
              ...restaurantOptions,
              {
                value: restaurant._id,
                label: restaurant.name,
                restaurantAddress: restaurant.address,
              },
            ]);
            restaurant.menu.map((menu: Menu) => {
              setMenuOptions((menuOptions) => [
                ...menuOptions,
                {
                  label: menu.name,
                  value: menu._id,
                  restaurantId: restaurant._id,
                },
              ]);
            });
          });
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

  const handleAddMenu = async (
    menuId: string,
    name: string,

    restaurantId: string,
  ) => {
    try {
      setLoading(true);
      const res = await updateMenuController(name, restaurantId, menuId);

      if (res.data.success == true) {
        setErrorMessage('');
        setItem(res.data.menu.name);
        let modifiedMenuOptions = new Array();
        menuOptions.map((menuOption) => {
          if (menuOption.value == res.data.menu._id) {
            menuOption.label = res.data.menu.name;
          }
          modifiedMenuOptions.push(menuOption);
        });
        setMenuOptions(modifiedMenuOptions);
        setLoading(false);
      } else {
        setItem('');
        setErrorMessage(res.data.errMessage);
        setLoading(false);
      }
    } catch (err) {
      console.log('Error: ', err);
      setItem('');
      setErrorMessage(`Error Connecting to server.`);
      setLoading(false);
    }
  };

  return (
    <Layout title="Update Menu">
      <Auth title="Update Menu" subTitle="Update menu here Bossmen">
        <Formik
          initialValues={{
            name: '',
            seller: new SelectRestaurantItem('', 'Select a restaurant', ''),
            menu: new SelectMenuItem('', 'Select a menu', ''),
            restaurantId: '',
            manuId: '',
          }}
          onSubmit={async (values) => {
            handleAddMenu(values.menu.value, values.name, values.restaurantId);
          }}
        >
          {(props) => {
            const { values, handleChange, handleBlur, handleSubmit, setFieldValue, touched, errors } = props;
            return (
              <form onSubmit={handleSubmit}>
                <SelectStyled
                  options={restaurantOptions} //<option value="" label="" />
                  placeholder="Select"
                  value={values.seller}
                  onChange={(restaurant: SelectRestaurantItem) => {
                    setFieldValue('seller', restaurant);
                    setFieldValue('restaurantId', restaurant.value);
                  }}
                  onBlur={handleBlur}
                  touched={touched.seller}
                  error={errors.seller}
                  id="seller"
                />

                <SelectStyled
                  options={menuOptions.filter((menu: SelectMenuItem) => menu.restaurantId === values.seller.value)} //<option value="" label="Select a color" />
                  placeholder="Select"
                  value={values.menu}
                  onChange={(menu: SelectMenuItem) => {
                    setFieldValue('menu', menu);
                    setFieldValue('name', menu.label);
                  }}
                  onBlur={handleBlur}
                  touched={touched.menu}
                  error={errors.menu}
                  id="menu"
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

                <Button status="Success" type="submit" shape="SemiRound" fullWidth disabled={loading}>
                  Update Menu Brother
                </Button>
              </form>
            );
          }}
        </Formik>
        <div style={{ color: 'red' }}>{errorMessage}</div>
        {item ? <div style={{ color: 'green', margin: 10 }}>{`Successfully Updated ${item}`}</div> : null}
      </Auth>
    </Layout>
  );
}

export default updateMenu;
