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
import style from '../../css/admin.module.css';
import { resizeFile, resizeFiles } from 'utils/resize';
import { getAllAreasController } from 'controllers/restaurantController/getAllAreasController';

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
  area: string;
  offers: any;

  constructor(
    v: string,
    l: string,
    a: string,
    adminRating: number,
    mainImage: any,
    images: any,
    area: string,
    offers: any,
  ) {
    this.value = v;
    this.label = l;
    this.address = a;
    this.adminRating = adminRating;
    this.mainImage = mainImage;
    this.images = images;
    this.area = area;
    this.offers = offers;
  }
}

class SelectArea {
  value: string;
  label: string;

  constructor(areaName: string) {
    this.label = areaName;
    this.value = areaName;
  }
}

function updateRestaurant() {
  //const router = useRouter();
  const options = new Array();
  const areaoptions = new Array();
  const [errorMessage, setErrorMessage] = useState('');
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState(options);
  const [areaOptions, setAreaOptions] = useState(areaoptions);

  useEffect(() => {
    setLoading(true);
    getAllRestaurantsController()
      .then((res) => {
        setLoading(false);
        if (res.data.success == true) {
          res.data.restaurants.map((v: Restaurant) => {
            setOption((option) => [
              ...option,
              {
                value: v._id,
                label: v.name,
                area: v.area,
                address: v.address,
                adminRating: v.adminRating,
                mainImage: v.mainImage,
                images: v.images,
                offers: v.offers,
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

  const handleUpdateRestaurant = async (
    name: string,
    address: string,
    area: string,
    id: string,
    adminRating: string,
    mainImage: any,
    images: any,
    updatedMainImage: any,
    updatedImages: any,
    offers: any,
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
        area,
        id,
        adminRating,
        mainImage,
        images,
        updatedMainImage,
        updatedImages,
        offers,
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
            option.area = res.data.restaurant.area;
            option.offers = res.data.restaurant.offers;
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

  const handleDeleteMainImage = (restaurantId: string) => {
    let modifiedOptions = new Array();

    console.log('RestaurantId: ', restaurantId);
    console.log('Options: ', option);

    option.forEach((restaurantOption) => {
      if (restaurantOption.value == restaurantId) {
        console.log('restaurantOption Main Image before filering: ', restaurantOption.mainImage);
        restaurantOption.mainImage = '';
        console.log('restaurantOption Main Image after filering: ', restaurantOption.mainImage);
      }
      modifiedOptions.push(restaurantOption);
    });

    console.log('modifiedOptions: ', modifiedOptions);
    setOption(modifiedOptions);

    return true;
  };

  const handleDeleteImage = (e: any, restaurantId: string) => {
    e.preventDefault();
    let modifiedOptions = new Array();

    console.log('restaurantId: ', restaurantId);
    console.log('Value: ', Number.parseInt(e.target.value));
    console.log('Options: ', option);

    option.forEach((restaurantOption) => {
      if (restaurantOption.value == restaurantId) {
        console.log('restaurantOption Images before filering: ', restaurantOption.images);
        restaurantOption.images = restaurantOption.images.filter((imageUrl: any, index: number) => {
          console.log(imageUrl);
          console.log('Fileter index: ', index);
          return index !== Number.parseInt(e.target.value);
        });
        console.log('restaurantOption Images after filering: ', restaurantOption.images);
      }
      modifiedOptions.push(restaurantOption);
    });

    console.log('modifiedOptions: ', modifiedOptions);
    setOption(modifiedOptions);

    return true;
  };

  const handleDeleteOffer = (e: any, restaurantId: string) => {
    e.preventDefault();
    let modifiedOptions = new Array();

    console.log('restaurantId: ', restaurantId);
    console.log('Value: ', Number.parseInt(e.target.value));
    console.log('Options: ', option);

    option.forEach((restaurantOption) => {
      if (restaurantOption.value == restaurantId) {
        console.log('Offers before filering: ', restaurantOption.offers);
        restaurantOption.offers = restaurantOption.offers.filter((offer: any, index: number) => {
          console.log(offer);
          console.log('Fileter index: ', index);
          return index !== Number.parseInt(e.target.value);
        });
        console.log('Offers after filering: ', restaurantOption.offers);
      }
      modifiedOptions.push(restaurantOption);
    });

    console.log('modifiedOptions: ', modifiedOptions);
    setOption(modifiedOptions);

    return true;
  };

  const handleAddOffer = (offer: string, restaurantId: string) => {
    let modifiedOptions = new Array();

    console.log('restaurantId: ', restaurantId);
    console.log('Options: ', option);

    option.forEach((restaurantOption) => {
      if (restaurantOption.value == restaurantId) {
        console.log('Offers before adding: ', restaurantOption.offers);
        restaurantOption.offers.push(offer);
        console.log('Offers after adding: ', restaurantOption.offers);
      }
      modifiedOptions.push(restaurantOption);
    });

    console.log('modifiedOptions: ', modifiedOptions);
    setOption(modifiedOptions);

    return true;
  };

  return (
    <Layout title="Update Restaurant">
      <Auth title="Update Restaurant" subTitle="Update a restaurant here Bossmen">
        <Formik
          initialValues={{
            name: '',
            address: '',
            area: new SelectArea(''),
            id: new SelectItem('', 'Select a restaurant', '', 0, '', [], '', []),
            adminRating: '',
            mainImage: '',
            images: [],
            offer: '',
            offers: [],
            updatedMainImage: undefined,
            updatedImages: undefined,
          }}
          onSubmit={async (values) => {
            handleUpdateRestaurant(
              values.name,
              values.address,
              values.area.value,
              values.id.value,
              values.adminRating,
              values.mainImage,
              values.images,
              values.updatedMainImage,
              values.updatedImages,
              values.offers,
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
                    setFieldValue('area', { label: value.area });
                    setFieldValue('offers', value.offers);
                  }}
                  onBlur={handleBlur}
                  touched={touched.id}
                  error={errors.id}
                  id="id"
                />
                <div className={style.formImageDiv}>
                  <div>
                    <span id="mainImageLabel"> Main Image: </span>
                    <input
                      id="mainFile"
                      name="mainFile"
                      accept="image/*"
                      type="file"
                      multiple={false}
                      onChange={async (event) => {
                        try {
                          const imageFile = await resizeFile(
                            event.currentTarget.files ? event.currentTarget.files[0] : '',
                          );
                          console.log('Resized image: ', imageFile);
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
                          if (handleDeleteMainImage(props.values.id.value)) {
                            option.forEach((restaurantOption) => {
                              if (restaurantOption.value == props.values.id.value) {
                                props.values.mainImage = restaurantOption.mainImage;
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
                          console.log('Selected images: ', event.currentTarget.files);
                          let fileList = event.target.files ? event.target.files : [];
                          const imageFiles = await resizeFiles(fileList);
                          console.log('Resized Files: ', imageFiles);
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
                                if (handleDeleteImage(e, props.values.id.value)) {
                                  option.forEach((restaurantOption) => {
                                    if (restaurantOption.value == props.values.id.value) {
                                      props.values.images = restaurantOption.images;
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
                    placeholder="Name of the Restaurant"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputGroup>
                <SelectStyled
                  options={areaOptions} //<option value="" label="" />
                  placeholder="Select an area"
                  value={values.area}
                  onChange={(area: SelectArea) => {
                    setFieldValue('area', area);
                  }}
                  onBlur={handleBlur}
                  touched={touched.area}
                  error={errors.area}
                  id="area"
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
                      if (props.values.offer !== '') handleAddOffer(props.values.offer, props.values.id.value);
                    }}
                  >
                    Add
                  </button>
                </InputGroup>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ marginBottom: -30 }}>Offers: </span>
                  {props.values.offers !== []
                    ? props.values.offers.map((offer, index) => (
                        <div>
                          <span key={index}>{`${index + 1}: ${offer} `}</span>{' '}
                          <button
                            value={index}
                            className={style.formOfferDeleteBtn}
                            onClick={(e) => {
                              console.log('Clicked: ');
                              if (handleDeleteOffer(e, props.values.id.value)) {
                                option.forEach((restaurantOption) => {
                                  if (restaurantOption.value == props.values.id.value) {
                                    props.values.offers = restaurantOption.offers;
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

                {/* <div>
                  <span style={{ display: 'flex', flexDirection: 'column', marginTop: 65 }}>Newly added offers: </span>
                  {offersArrayState.map((offer: any, index: number) => (
                    <span style={{ display: 'flex', flexDirection: 'column' }}>{`${index + 1}: ${offer} `}</span>
                  ))}
                </div> */}

                <Button status="Success" type="submit" shape="SemiRound" fullWidth disabled={loading}>
                  Update Restaurant
                </Button>
              </form>
            );
          }}
        </Formik>
        <div style={{ color: 'red' }}>{errorMessage}</div>
        {restaurant && !loading ? (
          <div style={{ color: 'green', margin: 10 }}>{`Successfully Updated ${restaurant}`}</div>
        ) : null}
      </Auth>
    </Layout>
  );
}

export default updateRestaurant;
