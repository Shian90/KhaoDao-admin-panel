import axios from 'axios';

const handleLogin = async (email: string, password: string) => {
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
    console.log('Login res controller: ', res);
    return res;
    //console.log(res.data.token);
  } catch (err) {
    return err;
  }
};

export { handleLogin };
