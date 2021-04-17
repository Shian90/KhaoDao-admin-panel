import React from 'react';
import Layout from 'Layouts';
import { checkToken } from '../utils/cookies';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  const getAuth = () => {
    router.push('/auth/login');
  };

  useEffect(() => {
    //console.log(props.userToken);
    if (checkToken() == false) {
      getAuth();
    } else {
      // const formData = createZoneFormData(
      //   'tes4',
      //   '23.33,32.3223',
      //   '23.33,32.3223',
      //   '23.33,32.3223',
      //   '23.33,32.3223',
      //   '23.33,32.3223',
      //   '23.33,32.3223',
      //   '23.33,32.3223',
      //   '23.33,32.3223',
      // );
      // postZone('ba254e9f8bb8072c0fdcb9c58382317408668c7b', formData).then((value) => {
      //   console.log(value);
      // });
      // deleteZone('ba254e9f8bb8072c0fdcb9c58382317408668c7b',5).then((value) => {
      //   console.log(value);
      // });
    }
    return () => {};
  }, []);
  if (checkToken() == true) {
    return (
      <Layout title="Home">
        <header style={{ textAlign: 'center' }}>
          Welcome to DeliverBae Admin. Please Check the admin section in the sidebar.{' '}
        </header>
      </Layout>
    );
  } else {
    return <div>Please Login First</div>;
  }
};
export default Home;
