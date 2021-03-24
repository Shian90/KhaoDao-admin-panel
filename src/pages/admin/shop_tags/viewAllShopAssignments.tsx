import { useEffect, useRef } from 'react';
import { getAllTagAssignment } from '../../../networking/shop_tags';
import { getToken } from '../../../utils/cookies';
import { useState } from 'react';
import Layout from 'Layouts';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Accordion, AccordionItem, AccordionRefObject } from '@paljs/ui/Accordion';
import { MapShopTagToShop } from '../../../networking/shop_tags';

export default function GetAllShopAssignments() {
  const [shopTagAssignments, setShopTagAssignments] = useState([]);
  const accordionRef = useRef<AccordionRefObject>(null);
  //var token = "";
  useEffect(() => {
    const token = getToken();

    getAllTagAssignment(token).then((value) => setShopTagAssignments(value));
    return () => {};
  }, []);

  return (
    <Layout title="All Shop Tag Assignments">
      <Row>
        <Col breakPoint={{ xs: 12, lg: 6 }}>
          <Accordion multi ref={accordionRef}>
            {shopTagAssignments.map((s: MapShopTagToShop) => (
              <AccordionItem uniqueKey={s.id} title={s.id}>
                <div>Shop Id: {s.shop_obj}</div>
                <div>Shop Tag Id: {s.shop_tag_obj}</div>
              </AccordionItem>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Layout>
  );
}
