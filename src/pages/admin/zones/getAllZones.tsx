import { useEffect } from 'react';
import { getAllZones } from '../../../networking/zones';
import { getToken } from '../../../utils/cookies';
import { useState } from 'react';
import Layout from 'Layouts';

export default function GetAllZones() {
  const [zones, setZones] = useState([]);
  useEffect(() => {
    const token = getToken();

    getAllZones(token).then((value) => setZones(value));
    return () => {};
  }, []);

  return (
    <Layout title="All Zones">
      {zones!.map((zone) => (
        <div>{zone.hasOwnProperty('name') ? zone.name : 'not found'}</div>
      ))}
    </Layout>
  );
}
