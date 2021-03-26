import axios from '../../../axios/axios';

const handleLogin = async (email: string, password: string) => {
  // const config = {
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //     //'Access-Control-Allow-Origin':'*',
  //   },
  // };

  // let bodyFormData = new FormData();
  // bodyFormData.append('email', email);
  // bodyFormData.append('password', password);
  const reqBody = {
    email: email,
    password: password,
  };
  console.log('clicked');

  try {
    const res = await axios.post('/admin/login', reqBody);
    console.log('Login res controller: ', res);
    return res;
    //console.log(res.data.token);
  } catch (err) {
    return err.response;
  }
};

export { handleLogin };
