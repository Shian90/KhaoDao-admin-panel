import Cookies from 'universal-cookie';

const getToken = () => {
  const cookies = new Cookies();
  return cookies.get('token');
};

const setToken = (token: string) => {
  const cookies = new Cookies();
  cookies.set('token', token);
};

const checkToken = () => {
  const cookies = new Cookies();
  if (cookies.get('token') == undefined) {
    //console.log(cookies.get("token"))
    return false;
  } else {
    //console.log(cookies.get("token"))
    return true;
  }
};

const removeToken = () => {
  const cookies = new Cookies();
  cookies.remove('token');
};

export { getToken, setToken, checkToken, removeToken };
