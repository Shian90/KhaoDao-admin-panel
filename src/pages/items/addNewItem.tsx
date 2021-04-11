import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React from 'react';

import Auth from 'components/Auth';
import Layout from 'Layouts';
import { Formik } from 'formik';
//import { useRouter } from 'next/router';
import { useState } from 'react';
//import { addNewRestaurantController } from '../../controllers/restaurantController/addNewRestaurantController';
import { getAllRestaurantsController } from 'controllers/restaurantController/getAllRestaurantsController';
import styled from 'styled-components';
//import { DisplayFormikState } from 'utils/formikHelper';
import Select from '@paljs/ui/Select';
import { useEffect } from 'react';
import { Restaurant } from 'Models/Restaurant';
import { Menu } from 'Models/Menu';
import { addNewItemController } from 'controllers/itemController/addNewItemController';

export const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

class SelectRestaurantItem {
  value: string;
  label: string;
  restaurantAddress: string;

  constructor(restaurantId: string, restaurantName: string, restaurantAddress: string) {
    //console.log(v);
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
    //console.log(v);
    this.label = menuName;
    this.value = menuId;
    this.restaurantId = restaurantId;
  }
}

function addNewItem() {
  //const router = useRouter();
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
        console.log('Could?');
        if (res.data.success == true) {
          console.log('Could');
          res.data.restaurants.map((restaurant: Restaurant) => {
            //console.log(option);
            //console.log(v._id);

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

  const handleAddItem = async (
    menuId: string,
    name: string,
    price: string,
    description: string,
    sellerId: string,
    category: string,
  ) => {
    try {
      setLoading(true);
      const res = await addNewItemController(menuId, name, price, description, sellerId, category);

      if (res.data.success == true) {
        setErrorMessage('');
        setItem(name);
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
    <Layout title="Add New Item">
      <Auth title="Add New Item" subTitle="Add a New Item here Bossmen">
        <Formik
          initialValues={{
            name: '',
            price: '',
            description: '',
            seller: new SelectRestaurantItem('', 'Select a restaurant', ''),
            menu: new SelectMenuItem('', 'Select a menu', ''),
            category: '',
            file: [],
          }}
          onSubmit={async (values) => {
            handleAddItem(
              values.menu.value,
              values.name,
              values.price,
              values.description,
              values.seller.value,
              values.category,
            );
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
                    console.log('Seller name: ', values.seller.label, ' ', values.seller.value);
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
                  }}
                  onBlur={handleBlur}
                  touched={touched.menu}
                  error={errors.menu}
                  id="menu"
                />
                <input
                  id="file"
                  name="file"
                  type="file"
                  multiple={true}
                  onChange={(event) => {
                    setFieldValue('file', event.currentTarget.files);
                    console.log('Filee: ', event.currentTarget.files);
                  }}
                  className="form-control"
                  required={false}
                />
                <InputGroup fullWidth>
                  <input
                    id="name"
                    type="name"
                    placeholder="Name of the Item"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputGroup>
                <InputGroup fullWidth>
                  <input
                    id="price"
                    type="price"
                    placeholder="Price of Item"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputGroup>
                <InputGroup fullWidth>
                  <input
                    id="category"
                    type="category"
                    placeholder="Category of Item"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputGroup>
                <InputGroup fullWidth>
                  <input
                    id="description"
                    type="description"
                    placeholder="Description of Item"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputGroup>

                <Button status="Success" type="submit" shape="SemiRound" fullWidth disabled={loading}>
                  Add Item Brosa
                </Button>
              </form>
            );
          }}
        </Formik>
        <div style={{ color: 'red' }}>{errorMessage}</div>
        {item ? <div style={{ color: 'green', margin: 10 }}>{`Successfully Added ${item}`}</div> : null}
      </Auth>
    </Layout>
  );
}

export default addNewItem;
