import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import React from 'react';

import Auth from 'components/Auth';
import Layout from 'Layouts';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { addNewRestaurantController } from '../../controllers/restaurantController/addNewRestaurantController';

function addNewRestaurant() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');
  const [restaurant, setRestaurant] = useState('');

  const handleAddRestaurant = async (name: string, address: string) => {
    try {
      const res = await addNewRestaurantController(name, address);

      if (res.status == 201) {
        setRestaurant(res.data.restaurant.name);
      } else {
        setErrorMessage(res.data.errMessage);
      }
    } catch (err) {
      setErrorMessage(`Error Connecting to server ${err}`);
    }
  };

  return (
    <Layout title="Add Restaurant">
      <Auth title="Add Restaurant" subTitle="Add a restaurant here Bossmen">
        <Formik
          initialValues={{ name: '', address: '' }}
          onSubmit={async (values) => {
            handleAddRestaurant(values.name, values.address);
          }}
        >
          {(props) => {
            const { values, isSubmitting, handleChange, handleBlur, handleSubmit } = props;
            return (
              <form onSubmit={handleSubmit}>
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

                <Button status="Success" type="submit" shape="SemiRound" fullWidth disabled={isSubmitting}>
                  Boss Add Maren
                </Button>
              </form>
            );
          }}
        </Formik>
        <div style={{ color: 'red' }}>{errorMessage}</div>
        {restaurant ? <div style={{ color: 'green' }}>{`Successfully added ${restaurant}`}</div> : null}
      </Auth>
    </Layout>
  );
}

export default addNewRestaurant;
