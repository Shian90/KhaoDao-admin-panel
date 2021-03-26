import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkToken } from '../utils/cookies';

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    if (checkToken() == false) router.push('/dashboard');
    else router.push('/dashboard');
  }),
    [];
  return <div />;
}
