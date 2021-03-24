import { useEffect, useRef } from 'react';
import { getAllMerchants } from '../../../networking/merchants';
import { getToken } from '../../../utils/cookies';
import { useState } from 'react';
import Layout from 'Layouts';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Accordion, AccordionItem, AccordionRefObject } from '@paljs/ui/Accordion';
import { Merchant } from '../../../networking/merchants';

export default function ViewAllMerchants() {
  const [merchants, setMerchants] = useState([]);
  const accordionRef = useRef<AccordionRefObject>(null);
  //var token = "";
  useEffect(() => {
    const token = getToken();

    getAllMerchants(token).then((value) => setMerchants(value));
    return () => {};
  }, []);

  return (
    <Layout title="All Merchants">
      <Row>
        <Col breakPoint={{ xs: 12, lg: 6 }}>
          <Accordion multi ref={accordionRef}>
            {merchants.map((merchant: Merchant) => (
              <AccordionItem uniqueKey={merchant.merchant_id} title={merchant.merchant_name}>
                <div>Shop Name: {merchant.shop_name}</div>
                <div>Shop Id: {merchant.shop_id}</div>
                <div>Email: {merchant.merchant_email}</div>
                <div>Address: {merchant.address}</div>
                <div>Status: {merchant.status}</div>
                <div>Zone Name: {merchant.zone_name}</div>
                <div>GPS POS:{merchant.gps_pos}</div>
                <div>Available: {merchant.is_available}</div>
              </AccordionItem>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Layout>
  );
}
