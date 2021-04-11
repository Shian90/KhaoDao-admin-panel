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
import { Item } from 'Models/Item';
import { updateItemController } from 'controllers/itemController/updateItemController';

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
class SelectItem {
  value: string;
  label: string;
  category: string;
  description: string;
  restaurantId: string;
  menuId: string;
  price: number;
  images: any;

  constructor(
    itemId: string,
    itemName: string,
    restaurantId: string,
    menuId: string,
    category: string,
    description: string,
    price: number,
    images: any,
  ) {
    //console.log(v);
    this.label = itemName;
    this.value = itemId;
    this.restaurantId = restaurantId;
    this.menuId = menuId;
    this.category = category;
    this.description = description;
    this.price = price;
    this.images = images;
  }
}

function updateItem() {
  //const router = useRouter();
  const restaurantoptions = new Array();
  const menuoptions = new Array();
  const itemoptions = new Array();
  const [errorMessage, setErrorMessage] = useState('');
  const [item, setItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [restaurantOptions, setRestaurantOptions] = useState(restaurantoptions);
  const [menuOptions, setMenuOptions] = useState(menuoptions);
  const [itemOptions, setItemOptions] = useState(itemoptions);

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
              menu.items.map((item: Item) => {
                setItemOptions((itemOptions) => [
                  ...itemOptions,
                  {
                    label: item.name,
                    value: item._id,
                    category: item.category,
                    description: item.description,
                    restaurantId: restaurant._id,
                    menuId: menu._id,
                    price: item.price,
                    images: item.images,
                  },
                ]);
              });
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
        // setError(`Internal Server Error.`);
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
    itemId: string,
    images: any,
  ) => {
    try {
      setLoading(true);
      const res = await updateItemController(menuId, name, price, description, sellerId, category, itemId, images);

      if (res.data.success == true) {
        setErrorMessage('');
        setItem(res.data.item.name);
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
    <Layout title="Update Item">
      <Auth title="Update Item" subTitle="Update item here Bossmen">
        <Formik
          initialValues={{
            name: '',
            price: '',
            description: '',
            seller: new SelectRestaurantItem('', 'Select a restaurant', ''),
            menu: new SelectMenuItem('', 'Select a menu', ''),
            item: new SelectItem('', 'Select an item', '', '', '', '', 0, []),
            category: '',
            files: [],
          }}
          onSubmit={async (values) => {
            handleAddItem(
              values.menu.value,
              values.name,
              values.price,
              values.description,
              values.seller.value,
              values.category,
              values.item.value,
              values.files,
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

                <SelectStyled
                  options={itemOptions.filter(
                    (item: SelectItem) =>
                      item.restaurantId === values.seller.value && item.menuId === values.menu.value,
                  )} //<option value="" label="Select a color" />
                  placeholder="Select"
                  value={values.item}
                  onChange={(item: SelectItem) => {
                    setFieldValue('item', item);
                    setFieldValue('name', item.label);
                    setFieldValue('category', item.category);
                    console.log('item price: ', item.price);
                    setFieldValue('description', item.description);
                    setFieldValue('price', item.price);
                    setFieldValue('files', item.images);
                  }}
                  onBlur={handleBlur}
                  touched={touched.item}
                  error={errors.item}
                  id="item"
                />

                {/* <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={(event) => {
                    setFieldValue('file', event.currentTarget.files ? event.currentTarget.files : []);
                    console.log('Filee: ', event.currentTarget.files[0]);
                  }}
                  className="form-control"
                  required={false}
                /> */}
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
                  Update Item Brother
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

export default updateItem;
