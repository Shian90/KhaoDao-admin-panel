import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkToken, removeToken } from '../../utils/cookies';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    if (checkToken() == true) {
      removeToken();
      router.push('/auth/login');
    }
  }, []);
  return <div>logging out...</div>;
}
