import { useEffect, useRef } from 'react';
import { getAllMerchantLeads } from '../../../networking/leads';
import { getToken } from '../../../utils/cookies';
import { useState } from 'react';
import Layout from 'Layouts';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Accordion, AccordionItem, AccordionRefObject } from '@paljs/ui/Accordion';
import { MerchantApplicant } from '../../../networking/leads';

export default function GetAllShopTags() {
  const [merchants, setMerchants] = useState([]);
  const accordionRef = useRef<AccordionRefObject>(null);
  //var token = "";
  useEffect(() => {
    const token = getToken();

    getAllMerchantLeads(token).then((value) => setMerchants(value));
    return () => {};
  }, []);

  return (
    <Layout title="All Shop Tags">
      <Row>
        <Col breakPoint={{ xs: 12, lg: 6 }}>
          <Accordion multi ref={accordionRef}>
            {merchants.map((s: MerchantApplicant) => (
              <AccordionItem uniqueKey={s.id} title={s.name}>
                <div>Address: {s.address}</div>
                <div>Phone: {s.phone_no}</div>
                <div>Email: {s.email}</div>
                <div>Status: {s.status}</div>
                <div>Shop Name: {s.shop_name}</div>
              </AccordionItem>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Layout>
  );
}
