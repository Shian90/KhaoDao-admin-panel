import Layout from 'Layouts';
import MyCard from 'components/MyComponents/card';
import React, { useEffect, useState } from 'react';
import style from '../../css/admin.module.css';
import { getAllItemsController } from 'controllers/itemController/getAllItemsController';
import { makeItemInvisibleController } from 'controllers/itemController/makeItemInvisibleController';
import { Item } from 'Models/Item';

function getAllItems() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [invisibleBtnDisable, setInvisibleBtnDisable] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllItemsController()
      .then((res) => {
        if (res.data.success == true) {
          setError('');
          setItems(res.data.items);
          setLoading(false);
        } else {
          setItems([]);
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
    makeItemInvisibleController(id)
      .then((res) => {
        if (res.data.success == true) {
          setItems(items.filter((item: Item) => item._id !== id));
          alert(`Successfully removed ${res.data.item.name}`);
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
    <Layout title="All items">
      {!loading ? (
        items ? (
          <div className={style.mycards}>
            {items.map((item: Item) => (
              <MyCard
                title={item.name}
                restaurantName={item.seller.name}
                menuName={item.menu.name}
                description={item.description}
                imageUrl={item.mainImage}
                onInvisibleClick={() => makeInvisible(item._id)}
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

export default getAllItems;
