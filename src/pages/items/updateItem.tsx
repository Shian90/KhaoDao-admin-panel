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
import { Item } from 'Models/Item';
import { updateItemController } from 'controllers/itemController/updateItemController';
import style from '../../css/admin.module.css';
import { resizeFile, resizeFiles } from 'utils/resize';
import { getAllCategoriesController } from 'controllers/itemController/getAllCategoriesController';

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
class SelectItem {
  value: string;
  label: string;
  categories: any;
  description: string;
  restaurantId: string;
  menuId: string;
  price: number;
  images: any;
  adminRating: number;
  mainImage: any;

  constructor(
    itemId: string,
    itemName: string,
    restaurantId: string,
    menuId: string,
    categories: any,
    description: string,
    price: number,
    images: any,
    adminRating: number,
    mainImage: any,
  ) {
    this.label = itemName;
    this.value = itemId;
    this.restaurantId = restaurantId;
    this.menuId = menuId;
    this.categories = categories;
    this.description = description;
    this.price = price;
    this.images = images;
    this.adminRating = adminRating;
    this.mainImage = mainImage;
  }
}

function updateItem() {
  //const router = useRouter();
  const restaurantoptions = new Array();
  const menuoptions = new Array();
  const itemoptions = new Array();
  const categoryoptions = new Array();
  const [errorMessage, setErrorMessage] = useState('');
  const [item, setItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [restaurantOptions, setRestaurantOptions] = useState(restaurantoptions);
  const [menuOptions, setMenuOptions] = useState(menuoptions);
  const [itemOptions, setItemOptions] = useState(itemoptions);
  const [categoryOptions, setCategoryOptions] = useState(categoryoptions);

  useEffect(() => {
    setLoading(true);

    getAllRestaurantsController()
      .then((res) => {
        setLoading(false);
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
              menu.items.map((item: Item) => {
                setItemOptions((itemOptions) => [
                  ...itemOptions,
                  {
                    label: item.name,
                    value: item._id,
                    categories: item.categories,
                    description: item.description,
                    restaurantId: restaurant._id,
                    menuId: menu._id,
                    price: item.price,
                    images: item.images,
                    adminRating: item.adminRating,
                    mainImage: item.mainImage,
                  },
                ]);
              });
            });
          });
        } else {
          setLoading(false);
          setErrorMessage(res.data.errMessage);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log('Error: ', err);
        // setError(`Internal Server Error.`);
      });

    getAllCategoriesController()
      .then((res) => {
        setLoading(false);
        if (res.data.success == true) {
          res.data.categories.map((categoryName: string) => {
            setCategoryOptions((categoryOption) => [
              ...categoryOption,
              {
                value: categoryName,
                label: categoryName,
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

  const handleUpdateItem = async (
    menuId: string,
    name: string,
    price: string,
    description: string,
    sellerId: string,
    categories: any,
    itemId: string,
    images: any,
    adminRating: string,
    mainImage: string,
    updatedMainImage: any,
    updatedImages: any,
  ) => {
    categories = categories.map((categoryObject: any) => {
      return categoryObject.label;
    });
    console.log('Categories: ', categories);
    try {
      await itemOptions.forEach((itemOption) => {
        if (itemOption.value == itemId) {
          mainImage = itemOption.mainImage;
          images = itemOption.images;
        }
      });

      setLoading(true);
      const res = await updateItemController(
        menuId,
        name,
        price,
        description,
        sellerId,
        categories,
        itemId,
        images,
        adminRating,
        mainImage,
        updatedMainImage,
        updatedImages,
      );

      if (res.data.success == true) {
        setErrorMessage('');
        setItem(res.data.item.name);

        let modifiedItemOptions = new Array();
        itemOptions.forEach((itemOption) => {
          if (itemOption.value == res.data.item._id) {
            itemOption.label = res.data.item.name;
            itemOption.category = res.data.item.category;
            itemOption.description = res.data.item.description;
            itemOption.price = res.data.item.price;
            itemOption.adminRating = res.data.item.adminRating;
            itemOption.mainImage = res.data.item.mainImage;
            itemOption.images = res.data.item.images;
          }
          modifiedItemOptions.push(itemOption);
        });
        setItemOptions(modifiedItemOptions);
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

  const handleDeleteMainImage = (itemId: string) => {
    let modifiedItemOptions = new Array();

    console.log('ItemId: ', itemId);
    console.log('ItemOptions: ', itemOptions);

    itemOptions.forEach((itemOption) => {
      if (itemOption.value == itemId) {
        console.log('itemOption Main Image before filering: ', itemOption.mainImage);
        itemOption.mainImage = '';
        console.log('itemOption Main Image after filering: ', itemOption.mainImage);
      }
      modifiedItemOptions.push(itemOption);
    });

    console.log('ModifieditemOptions: ', modifiedItemOptions);
    setItemOptions(modifiedItemOptions);

    return true;
  };

  const handleDeleteImage = (e: any, itemId: string) => {
    e.preventDefault();
    let modifiedItemOptions = new Array();

    console.log('ItemId: ', itemId);
    console.log('Value: ', Number.parseInt(e.target.value));
    console.log('ItemOptions: ', itemOptions);

    itemOptions.forEach((itemOption) => {
      if (itemOption.value == itemId) {
        console.log('itemOption Images before filering: ', itemOption.images);
        itemOption.images = itemOption.images.filter((imageUrl: any, index: number) => {
          console.log(imageUrl);

          console.log('Fileter index: ', index);
          return index !== Number.parseInt(e.target.value);
        });
        console.log('itemOption Images after filering: ', itemOption.images);
      }
      modifiedItemOptions.push(itemOption);
    });

    console.log('ModifieditemOptions: ', modifiedItemOptions);
    setItemOptions(modifiedItemOptions);

    return true;
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
            item: new SelectItem('', 'Select an item', '', '', [], '', 0, [], 0, ''),
            categories: [],
            images: [],
            mainImage: '',
            updatedImages: undefined,
            updatedMainImage: undefined,
            adminRating: '',
          }}
          onSubmit={async (values) => {
            handleUpdateItem(
              values.menu.value,
              values.name,
              values.price,
              values.description,
              values.seller.value,
              values.categories,
              values.item.value,
              values.images,
              values.adminRating,
              values.mainImage,
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
                    if (item.categories.length > 0) {
                      let categoriesArray: any = [];
                      item.categories.map((categoryName: any) => {
                        categoriesArray.push({ value: categoryName, label: categoryName });
                        setFieldValue('categories', categoriesArray);
                      });
                    }
                    setFieldValue('description', item.description);
                    setFieldValue('price', item.price);
                    setFieldValue('images', item.images);
                    setFieldValue('mainImage', item.mainImage);
                    setFieldValue('adminRating', item.adminRating);
                  }}
                  onBlur={handleBlur}
                  touched={touched.item}
                  error={errors.item}
                  id="item"
                />

                <div className={style.formImageDiv}>
                  <div>
                    <span id="mainImageLabel"> Main Image: </span>
                    <input
                      id="mainFile"
                      name="mainFile"
                      type="file"
                      accept="image/*"
                      multiple={false}
                      onChange={async (event) => {
                        try {
                          const imageFile = await resizeFile(
                            event.currentTarget.files ? event.currentTarget.files[0] : '',
                          );
                          setFieldValue('updatedMainImage', imageFile);
                        } catch (error) {
                          console.log('Error resizing image: ', error.message);
                        }
                      }}
                      className="form-control"
                      required={false}
                    />
                  </div>
                  {props.values.mainImage !== '' ? (
                    <div className={style.formImageWithBtnDiv}>
                      <img src={props.values.mainImage} className={style.formImageStyle} />
                      <button
                        className={style.formPicDeleteBtn}
                        onClick={() => {
                          if (handleDeleteMainImage(props.values.item.value)) {
                            itemOptions.forEach((itemOption) => {
                              if (itemOption.value == props.values.item.value) {
                                props.values.mainImage = itemOption.mainImage;
                                // document.getElementById('mainFile')?.setAttribute('required', 'true');
                                // const app = document.getElementById('mainImageLabel');
                                // const span = document.createElement('span');
                                // span.textContent = 'Main Image(Required): ';
                                // app?.replaceWith(span);
                              }
                            });
                          }
                        }}
                      >
                        {' '}
                        Delete{' '}
                      </button>
                    </div>
                  ) : null}
                </div>

                <div className={style.formImageDiv}>
                  <div>
                    <span> Additional Images: </span>
                    <input
                      id="file"
                      name="file"
                      accept="image/*"
                      type="file"
                      multiple={true}
                      onChange={async (event) => {
                        try {
                          let fileList = event.target.files ? event.target.files : [];
                          const imageFiles = await resizeFiles(fileList);
                          setFieldValue('updatedImages', imageFiles);
                        } catch (error) {
                          console.log('Error in resizing image: ', error.message);
                        }
                      }}
                      className="form-control"
                      required={false}
                    />
                  </div>
                  <div className={style.formImage}>
                    {props.values.images !== []
                      ? props.values.images.map((imageUrl, index) => (
                          <div className={style.formImageWithBtnDiv}>
                            <img key={index} src={imageUrl} className={style.formImageStyle} />
                            <button
                              value={index}
                              className={style.formPicDeleteBtn}
                              onClick={(e) => {
                                if (handleDeleteImage(e, props.values.item.value)) {
                                  itemOptions.forEach((itemOption) => {
                                    if (itemOption.value == props.values.item.value) {
                                      props.values.images = itemOption.images;
                                    }
                                  });
                                }
                              }}
                            >
                              {' '}
                              Delete{' '}
                            </button>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
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
                <SelectStyled
                  options={categoryOptions} //<option value="" label="Select a color" />
                  placeholder="Select categories"
                  value={values.categories}
                  onChange={(e: any) => {
                    console.log('Event: ', e);
                    setFieldValue('categories', e);
                  }}
                  onBlur={handleBlur}
                  touched={touched.categories}
                  error={errors.categories}
                  id="categories"
                  isMulti
                />
                {/* <InputGroup fullWidth>
                  <input
                    id="category"
                    type="category"
                    placeholder="Category of Item"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputGroup> */}
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

                <InputGroup fullWidth>
                  <input
                    id="adminRating"
                    type="adminRating"
                    placeholder="AdminRating of Item"
                    value={values.adminRating}
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
        {item && !loading ? <div style={{ color: 'green', margin: 10 }}>{`Successfully Updated ${item}`}</div> : null}
      </Auth>
    </Layout>
  );
}

export default updateItem;
