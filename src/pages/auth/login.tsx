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
import { useState, useEffect } from 'react';
import { setToken, checkToken } from '../../utils/cookies';

export default function Login() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');
  const onCheckbox = () => {
    // v will be true or false
  };

  useEffect(() => {
    // if(cookies.get("token") == undefined){
    //   // console.log(cookies.get("token"));
    // }
    // else{
    //   //console.log(cookies.get("token"));
    //   //router.push("/extra-components/accordion")
    // }

    if (checkToken() == true) {
      router.push('/extra-components/accordion');
    } else {
    }
  }, []);

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

    try {
      const res = await axios.post('/users/login/staff/', bodyFormData, config);

      if (res.status == 200 && res.data.token !== undefined) {
        setToken(res.data.token);
        router.push('/extra-components/accordion');
      } else {
        setErrorMessage('Please enter correct credentials');
      }
      //console.log(res.data.token);
    } catch (err) {
      setErrorMessage('Error Connecting to server');
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
        <div style={{ color: 'red' }}>{errorMessage}</div>
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
