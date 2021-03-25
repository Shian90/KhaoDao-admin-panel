import { useEffect, useRef } from 'react';
import { getAllTagAssignment, ShopTag, shopTagIdToShopTag, getAllTags } from '../../../networking/shop_tags';
import { getToken } from '../../../utils/cookies';
import { useState } from 'react';
import Layout from 'Layouts';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import { Accordion, AccordionItem, AccordionRefObject } from '@paljs/ui/Accordion';
import { MapShopTagToShop } from '../../../networking/shop_tags';
import { getAllMerchants, Merchant, shopIdToShopName } from '../../../networking/merchants';
//import {GetAllShopTags} from "../../../networking/shop_tags";

export default function GetAllShopAssignments() {
  const [shopTagAssignments, setShopTagAssignments] = useState([]);
  const accordionRef = useRef<AccordionRefObject>(null);
  //var token = "";

  //const initialShopName = new Array<string>();
  const initialShopTags = new Array<ShopTag>();
  const initialMerchants = new Array<Merchant>();
  //const initialShopTag = new Object;

  const [shopTags, setShopTags] = useState(initialShopTags);
  const [merchants, setMerchants] = useState(initialMerchants);
  //const [shopName,setShopName] = useState(initialShopName);
  //const [shopTag,setShopTag] = useState(initialShopTag);
  useEffect(() => {
    //const token = getToken();

    getAllTagAssignment(getToken()).then((value) => {
      setShopTagAssignments(value);
    });

    getAllMerchants(getToken()).then((value) => setMerchants(value));
    getAllTags(getToken()).then((value) => setShopTags(value));

    return () => {
      setShopTags([]);
      setMerchants([]);
    };
  }, []);

  return (
    <Layout title="All Shop Tag Assignments">
      <Row>
        <Col breakPoint={{ xs: 12, lg: 6 }}>
          <Accordion multi ref={accordionRef}>
            {shopTagAssignments.map((s: MapShopTagToShop) => (
              <AccordionItem uniqueKey={s.id} title={s.id}>
                <div>Shop Id: {s.shop_obj}</div>
                <div>Shop Name: {shopIdToShopName(s.shop_obj, merchants)}</div>
                <div>Shop Tag Id: {s.shop_tag_obj}</div>
                <div>Shop Tag Name: {shopTagIdToShopTag(s.shop_tag_obj, shopTags)}</div>
              </AccordionItem>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Layout>
  );
}
