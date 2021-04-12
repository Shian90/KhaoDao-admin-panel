import Layout from 'Layouts';
import MyCard from 'components/MyComponents/card';
import { getAllRestaurantsController } from 'controllers/restaurantController/getAllRestaurantsController';
import React, { useEffect, useState } from 'react';
import style from '../../css/admin.module.css';
import { Restaurant } from 'Models/Restaurant';
import { makeRestaurantInvisibleController } from 'controllers/restaurantController/makeRestaurantInvisible';

function getAllRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [invisibleBtnDisable, setInvisibleBtnDisable] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllRestaurantsController()
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
    makeRestaurantInvisibleController(id)
      .then((res) => {
        if (res.data.success == true) {
          setRestaurants(restaurants.filter((restaurant: Restaurant) => restaurant._id !== id));
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
            {restaurants.map((restaurant: Restaurant) => (
              <MyCard
                title={restaurant.name}
                address={restaurant.address}
                imageUrl={restaurant.mainImage}
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
