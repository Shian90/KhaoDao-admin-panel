import Layout from 'Layouts';
import MyCard from 'components/Restaurant/card';
import { getAllMenusController } from 'controllers/menuController/menuController';
import React, { useEffect, useState } from 'react';
import style from '../../css/admin.module.css';
import { Menu } from 'Models/Menu';
//import { makeRestaurantInvisibleController } from 'controllers/restaurantController/makeRestaurantInvisible';
import { makeMenuInvisibleController } from 'controllers/menuController/menuController';

function getAllRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [invisibleBtnDisable, setInvisibleBtnDisable] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllMenusController()
      .then((res) => {
        if (res.data.success == true) {
          setError('');
          setRestaurants(res.data.restaurants);
          setLoading(false);
        } else {
          setRestaurants([]);
          setError(res.data.errMessage);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
        setLoading(false);
        setError(`Internal Server Error.`);
      });
  }, []);

  const makeInvisible = (id: string) => {
    setInvisibleBtnDisable(true);
    makeMenuInvisibleController(id)
      .then((res) => {
        if (res.data.success == true) {
          setRestaurants(restaurants.filter((restaurant: Menu) => restaurant._id !== id));
          alert(`Successfully removed ${res.data.restaurant.name}`);
        } else {
          alert(res.data.errMessage);
        }
        setInvisibleBtnDisable(false);
      })
      .catch((err) => {
        console.log('Error: ', err);
        setError('Could not remove restaurant');
        setInvisibleBtnDisable(false);
      });
  };

  return (
    <Layout title="All restaurants">
      {!loading ? (
        restaurants ? (
          <div className={style.mycards}>
            {restaurants.map((restaurant: Menu) => (
              <MyCard
                title={restaurant.name}
                subtitle={restaurant.restaurant}
                onInvisibleClick={() => makeInvisible(restaurant._id)}
                onLoading={invisibleBtnDisable}
              />
            ))}
          </div>
        ) : (
          <div style={{ color: 'red' }}>{error}</div>
        )
      ) : (
        <div className={style.loading}>
          {' '}
          <h1> Loading Boss... </h1>
        </div>
      )}
    </Layout>
  );
}

export default getAllRestaurants;
