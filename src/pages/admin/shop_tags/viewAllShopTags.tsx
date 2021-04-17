import { useEffect, useRef } from 'react';
import { getAllTags } from '../../../networking/shop_tags';
import { getToken } from '../../../utils/cookies';
import { useState } from 'react';
import Layout from 'Layouts';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Accordion, AccordionItem, AccordionRefObject } from '@paljs/ui/Accordion';
import { ShopTag } from '../../../networking/shop_tags';

export default function GetAllShopTags() {
  const [shopTag, setShopTag] = useState([]);
  const accordionRef = useRef<AccordionRefObject>(null);
  //var token = "";
  useEffect(() => {
    const token = getToken();

    getAllTags(token).then((value) => setShopTag(value));
    return () => {};
  }, []);

  return (
    <Layout title="All Shop Tags">
      <Row>
        <Col breakPoint={{ xs: 12, lg: 6 }}>
          <Accordion multi ref={accordionRef}>
            {shopTag.map((s: ShopTag) => (
              <AccordionItem uniqueKey={s.id} title={s.name}>
                <div>Tag Id: {s.id}</div>
              </AccordionItem>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Layout>
  );
}
