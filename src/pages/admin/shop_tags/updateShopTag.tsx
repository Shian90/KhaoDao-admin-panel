import { ShopTag } from '../../../networking/shop_tags';
import { getAllTags } from '../../../networking/shop_tags';
import Select from '@paljs/ui/Select';
import { updateTag, createTagFormData } from '../../../networking/shop_tags';
import { getToken } from '../../../utils/cookies';

import Col from '@paljs/ui/Col';

import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import Layout from 'Layouts';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { Card, CardBody } from '@paljs/ui/Card';
import styled from 'styled-components';
//import { DisplayFormikState } from 'utils/formikHelper';

export const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;

const tagIdToTagAdapter = (id: number, arrayOfTag: Array<ShopTag>): ShopTag => {
  var z = new Object() as ShopTag;
  arrayOfTag.forEach((tag) => {
    if (tag.id === id) {
      console.log(tag.name);
      z = tag;
    }
  });
  console.log('hereee');
  return z;
};

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
  //const initialZone = new Object();
  const [option, setOption] = useState(options);
  const [status, setStatus] = useState('');
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
            shop_tag_name: '',
            tag: new SelectItem(-1, ''),
          }}
          onSubmit={async (values) => {
            console.log('subtitinfsd');
            try {
              const payload = {
                ...values,
                id: values.tag.value,
              };

              const status = await updateTag(getToken(), createTagFormData(values.shop_tag_name), payload.id);
              if (status === 200) {
                setStatus('Updated a Zone');
              } else {
                setStatus('Could not update a Zone');
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
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              //handleReset
            } = props;
            return (
              <form onSubmit={handleSubmit} style={{ width: '90%' }}>
                <Col breakPoint={{ xs: 8, sm: 6, md: 8, lg: 12 }}>
                  <Card>
                    <header>Input comma separated latitude,longitude</header>

                    <SelectStyled
                      options={option}
                      placeholder="Select"
                      value={values.tag}
                      onChange={(value: SelectItem) => {
                        setFieldValue('tag', value);
                        const tag = tagIdToTagAdapter(value.value, tags);
                        //console.log(zone);
                        setFieldValue('shop_tag_name', tag.name);
                      }}
                      onBlur={handleBlur}
                      touched={touched.shop_tag_name}
                      error={errors.shop_tag_name}
                      id="zone"
                    />
                    <CardBody>
                      <Input fullWidth size="Large">
                        <input
                          type="text"
                          id="shop_tag_name"
                          placeholder="Name"
                          value={values.shop_tag_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Input>

                      <Button fullWidth appearance="hero" type="submit" disabled={isSubmitting}>
                        Update
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
                {/* <DisplayFormikState {...props} /> */}
              </form>
            );
          }}
        </Formik>
      </div>
      <div>{status}</div>
    </Layout>
  );
}
