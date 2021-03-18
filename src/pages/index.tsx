import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkToken } from '../utils/cookies';

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    if (checkToken() == false) router.push('/extra-components/accordion');
    else router.push('/extra-components/accordion');
  }),
    [];
  return <div />;
}
