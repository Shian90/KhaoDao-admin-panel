//import { ShopTag } from '../../../networking/shop_tags';
//import { getAllTags } from '../../../networking/shop_tags';
import Select from '@paljs/ui/Select';
//import { updateTag, createTagFormData } from '../../../networking/shop_tags';
import { getToken } from '../../../utils/cookies';

import Col from '@paljs/ui/Col';

import { Button } from '@paljs/ui/Button';
//import { InputGroup } from '@paljs/ui/Input';
import Layout from 'Layouts';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { Card, CardBody } from '@paljs/ui/Card';
import styled from 'styled-components';
import { DisplayFormikState } from 'utils/formikHelper';
//import { MapShopTagToShop } from '../../../networking/shop_tags';
import { getAllMerchants, Merchant } from '../../../networking/merchants';
import { postTagAssignement, ShopTag, getAllTags, createTagAssignmentFormData } from '../../../networking/shop_tags';

export const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

// const Input = styled(InputGroup)`
//   margin-bottom: 10px;
// `;

// const tagIdToTagAdapter = (id: number, arrayOfTag: Array<ShopTag>): ShopTag => {
//   var z = new Object() as ShopTag;
//   arrayOfTag.forEach((tag) => {
//     if (tag.id === id) {
//       console.log(tag.name);
//       z = tag;
//     }
//   });
//   console.log('hereee');
//   return z;
// };

class SelectItem {
  value: number;
  label: string;

  constructor(v: number, l: string) {
    this.value = v;
    this.label = l;
  }
}

export default function UpdateZone() {
  const options = new Array();
  const shopOptions = new Array();
  //const initialZone = new Object();
  const [option, setOption] = useState(options);
  const [status, setStatus] = useState('');
  const [shop_option, setShopOption] = useState(shopOptions);

  //const initialShopTags = new Array<ShopTag>();
  const initialMerchants = new Array<Merchant>();
  //const initialShopTag = new Object;

  //const [shopTags, setShopTags] = useState(initialShopTags);
  const [merchants, setMerchants] = useState(initialMerchants);

  //const [zone,setZone] = useState(initialZone);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    //const token = getToken();

    try {
      getAllTags(getToken()).then((val) => {
        //console.log("amm here");

        val.map((v: ShopTag) => {
          setOption((option) => [
            ...option,
            {
              value: v.id,
              label: v.name,
            },
          ]);

          setTags(val);
        });

        console.log(tags);
      });
      getAllMerchants(getToken()).then((val) => {
        //console.log("amm here");

        val.map((v: Merchant) => {
          setShopOption((shop_option) => [
            ...shop_option,
            {
              value: v.shop_id,
              label: v.shop_name,
            },
          ]);

          setMerchants(val);
        });

        console.log(merchants);
      });

      //getAllTags(getToken()).then((value) => setShopTags(value));
    } catch (err) {
      console.log(err);
    }

    return () => {
      setOption([]);
    };
  }, []);
  return (
    <Layout title="Update Zone">
      <div>
        <div>Update Tag</div>

        <Formik
          initialValues={{
            shop: new SelectItem(-1, ''),
            tag: new SelectItem(-1, ''),
          }}
          onSubmit={async (values) => {
            console.log('subtitinfsd');
            try {
              const payload = {
                ...values,
                shop_tag_id: values.tag.value,
                shop_id: values.shop.value,
              };

              const status = await postTagAssignement(
                getToken(),
                createTagAssignmentFormData(payload.shop_id, payload.shop_tag_id),
              );
              if (status === 200) {
                setStatus('Assigned');
              } else {
                setStatus('Not assigned');
              }
            } catch (error) {
              setStatus('Could not process request.');
            }
          }}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              //dirty,
              isSubmitting,
              //handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              //handleReset
            } = props;
            return (
              <form onSubmit={handleSubmit} style={{ width: '90%' }}>
                <Col breakPoint={{ xs: 8, sm: 6, md: 8, lg: 12 }}>
                  <Card>
                    <header>Assign Tag To Shop</header>

                    <header>Select Tag</header>
                    <SelectStyled
                      options={option}
                      placeholder="Select"
                      value={values.tag}
                      onChange={(value: SelectItem) => {
                        setFieldValue('tag', value);
                        //const tag = tagIdToTagAdapter(value.value, tags);
                        //console.log(zone);
                        //setFieldValue('shop_tag_name', tag.name);
                      }}
                      onBlur={handleBlur}
                      touched={touched.tag}
                      error={errors.tag}
                      id="tag"
                    />

                    <header>Select Shop</header>
                    <SelectStyled
                      options={shop_option}
                      placeholder="Select"
                      value={values.shop}
                      onChange={(value: SelectItem) => {
                        setFieldValue('shop', value);
                        //const tag = tagIdToTagAdapter(value.value, tags);
                        //console.log(zone);
                        //setFieldValue('shop_tag_name', tag.name);
                      }}
                      onBlur={handleBlur}
                      touched={touched.shop}
                      error={errors.shop}
                      id="shop"
                    />
                    <CardBody>
                      <Button fullWidth appearance="hero" type="submit" disabled={isSubmitting}>
                        Assign
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
                <DisplayFormikState {...props} />
              </form>
            );
          }}
        </Formik>
      </div>
      <div>{status}</div>
    </Layout>
  );
}
