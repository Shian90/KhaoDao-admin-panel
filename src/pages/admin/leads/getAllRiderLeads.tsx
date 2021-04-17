import { useEffect, useRef } from 'react';
import { getAllRiderLeads } from '../../../networking/leads';
import { getToken } from '../../../utils/cookies';
import { useState } from 'react';
import Layout from 'Layouts';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Accordion, AccordionItem, AccordionRefObject } from '@paljs/ui/Accordion';
import { RiderApplicant } from '../../../networking/leads';

export default function GetAllShopTags() {
  const [riders, setRiders] = useState([]);
  const accordionRef = useRef<AccordionRefObject>(null);
  //var token = "";
  useEffect(() => {
    const token = getToken();

    getAllRiderLeads(token).then((value) => setRiders(value));
    return () => {};
  }, []);

  return (
    <Layout title="All Shop Tags">
      <Row>
        <Col breakPoint={{ xs: 12, lg: 6 }}>
          <Accordion multi ref={accordionRef}>
            {riders.map((s: RiderApplicant) => (
              <AccordionItem uniqueKey={s.id} title={s.name}>
                <div>Address: {s.address}</div>
                <div>Phone: {s.phone_no}</div>
                <div>Nid: {s.nid_no}</div>
                <div>Status: {s.status}</div>
              </AccordionItem>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Layout>
  );
}
