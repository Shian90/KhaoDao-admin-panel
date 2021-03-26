import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React from 'react';
import Link from 'next/link';

import Auth, { Group } from 'components/Auth';
import Socials from 'components/Auth/Socials';
import Layout from 'Layouts';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { setToken, checkToken, getToken } from '../../utils/cookies';
import { handleLogin } from 'controllers/authController/loginController';

export default function Login() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
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
      router.push('/dashboard');
    } else {
      router.push('/auth/login');
    }
  }, []);

  const handleLoginRequest = async (email: string, password: string) => {
    try {
      setLoading(true);
      var res = await handleLogin(email, password);

      if (res.data.success == true) {
        setToken(res.data.token);
        console.log('Tokeeeen from get: ', getToken());
        setErrorMessage('');
        setLoading(false);
        router.push('/dashboard');
      } else {
        setErrorMessage(res.data.errMessage);
        setLoading(false);
      }
    } catch (err) {
      console.log('Error: ', err);
      setLoading(false);
      setErrorMessage(`Please Provide correct credentials.`);
    }
  };

  if (checkToken() == false)
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

                  <Button status="Success" type="submit" shape="SemiRound" fullWidth disabled={loading}>
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
  else {
    return <div>Redirecting to home...</div>;
  }
}
