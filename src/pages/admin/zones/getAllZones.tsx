import { useEffect, useRef } from 'react';
import { getAllZones } from '../../../networking/zones';
import { getToken } from '../../../utils/cookies';
import { useState } from 'react';
import Layout from 'Layouts';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Accordion, AccordionItem, AccordionRefObject } from '@paljs/ui/Accordion';
import { Zone } from '../../../networking/zones';

export default function GetAllZones() {
  const [zones, setZones] = useState([]);
  const accordionRef = useRef<AccordionRefObject>(null);
  //var token = "";
  useEffect(() => {
    const token = getToken();

    getAllZones(token).then((value) => setZones(value));
    return () => {};
  }, []);

  return (
    <Layout title="All Zones">
      <Row>
        <Col breakPoint={{ xs: 12, lg: 6 }}>
          <Accordion multi ref={accordionRef}>
            {zones.map((zone: Zone) => (
              <AccordionItem uniqueKey={zone.id} title={zone.name}>
                <div>north: {zone.north_geocode}</div>
                <div>east: {zone.east_geocode}</div>
                <div>west: {zone.west_geocode}</div>
                <div>south: {zone.south_geocode}</div>
                <div>North East: {zone.north_east_geocode}</div>
                <div>North West:{zone.north_west_geocode}</div>
                <div>South East: {zone.south_east_geocode}</div>
                <div>South West: {zone.south_west_geocode}</div>
                <div></div>
              </AccordionItem>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Layout>
  );
}
