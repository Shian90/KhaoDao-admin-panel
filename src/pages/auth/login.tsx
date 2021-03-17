import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React from 'react';
import Link from 'next/link';

import Auth, { Group } from 'components/Auth';
import Socials from 'components/Auth/Socials';
import Layout from 'Layouts';
import axios from '../../../axios/axios';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const onCheckbox = () => {
    // v will be true or false
  };

  const handleLoginRequest = async (email: string, password: string) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        //'Access-Control-Allow-Origin':'*',
      },
    };

    let bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);
    console.log('clicked');

    // const req = {
    //   userId: 1,
    //   id: 1,
    //   title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    //   body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
    //   }

    try {
      const res = await axios.post('/users/login/staff/', bodyFormData, config);
      //const res = await axios.get('users/login/staff/');

      if (res.status == 200 && res.data.token !== undefined) router.push('/extra-components/accordion');
      //const res = await axios.get('/todos/1');
      //const res = await axios.post('/posts',req,config);

      console.log(res.data.token);
    } catch (err) {
      //router.push('/extra-components/accordion');
      console.log(err);
    }
  };

  return (
    <Layout title="Login">
      <Auth title="Login" subTitle="Hello! Login with your email">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            handleLoginRequest(values.email, values.password);
            //console.log(values);
          }}
        >
          {(props) => {
            const {
              values,
              //touched,
              //errors,
              //dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              //handleReset
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <InputGroup fullWidth>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputGroup>
                <InputGroup fullWidth>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputGroup>
                <Group>
                  <Checkbox checked onChange={onCheckbox}>
                    Remember me
                  </Checkbox>
                  <Link href="/auth/request-password">
                    <a>Forgot Password?</a>
                  </Link>
                </Group>

                <Button status="Success" type="submit" shape="SemiRound" fullWidth disabled={isSubmitting}>
                  Login
                </Button>
              </form>
            );
          }}
        </Formik>
        <Socials />
        <p>
          Don&apos;t have account?{' '}
          <Link href="/auth/register">
            <a>Register</a>
          </Link>
        </p>
      </Auth>
    </Layout>
  );
}
