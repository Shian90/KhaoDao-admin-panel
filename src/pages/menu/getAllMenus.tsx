import Layout from 'Layouts';
import MyCard from 'components/MyComponents/card';
import { getAllMenusController } from 'controllers/menuController/menuController';
import React, { useEffect, useState } from 'react';
import style from '../../css/admin.module.css';
import { Menu } from 'Models/Menu';
//import { makeRestaurantInvisibleController } from 'controllers/restaurantController/makeRestaurantInvisible';
import { makeMenuInvisibleController } from 'controllers/menuController/menuController';
import { getRestaurantByIdController } from 'controllers/restaurantController/getRestaurantById';

function getAllMenus() {
  const emptyRes = new Array<string>();
  const [menus, setMenus] = useState([]);
  const [restaurant, setRestaurant] = useState(emptyRes);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [invisibleBtnDisable, setInvisibleBtnDisable] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllMenusController()
      .then((res) => {
        if (res.data.success == true) {
          setError('');
          setMenus(res.data.menus);
          //console.log(menus);
          res.data.menus.map((menu: Menu) => {
            getRestaurantNameFromId(menu.restaurant)
              .then((value) => setRestaurant((restaurant) => [...restaurant, value]))
              .catch((err) => console.log(err));
          });
          //setRestaurant(rest);
          console.log(restaurant);
          setLoading(false);
        } else {
          setMenus([]);
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
          setMenus(menus.filter((menu: Menu) => menu._id !== id));
          alert(`Successfully removed ${res.data}`);
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

  const getRestaurantNameFromId = async (id: string): Promise<string> => {
    try {
      const res = await getRestaurantByIdController(id);
      if (res.data.success == true) {
        return res.data.restaurant[0].name;
      } else {
        return 'Name not found';
      }
    } catch (err) {
      console.log(err);
      return 'Name not found';
    }
  };

  return (
    <Layout title="All restaurants">
      {!loading ? (
        menus ? (
          <div className={style.mycards}>
            {menus.map((menu: Menu, index: number) => (
              <MyCard
                title={menu.name}
                subtitle={restaurant[index] ? restaurant[index] : 'Loading...'}
                onInvisibleClick={() => makeInvisible(menu._id)}
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

export default getAllMenus;
