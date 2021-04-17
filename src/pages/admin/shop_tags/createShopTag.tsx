import { postTag, createTagFormData } from '../../../networking/shop_tags';
import { getToken } from '../../../utils/cookies';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
//import { Accordion, AccordionItem, AccordionRefObject } from '@paljs/ui/Accordion';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import Layout from 'Layouts';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { Card, CardBody } from '@paljs/ui/Card';
import styled from 'styled-components';

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;

export default function CreateShopTag() {
  //const [zones, setZones] = useState([]);
  //const accordionRef = useRef<AccordionRefObject>(null);
  //var token = '';

  useEffect(() => {
    //token = getToken();

    //getAllZones(token).then((value) => setZones(value));
    return () => {};
  });
  const [status, setStatus] = useState('');

  //const status: Status[] = ['Info', 'Success', 'Danger', 'Primary', 'Warning', 'Basic', 'Control'];
  return (
    <Layout title="Create a Shop Tag">
      <Row>
        <Formik
          initialValues={{
            shop_tag_name: '',
          }}
          onSubmit={async (values) => {
            try {
              const status = await postTag(getToken(), createTagFormData(values.shop_tag_name));
              if (status === 200) {
                setStatus('Created a new Tag');
              } else {
                setStatus('Could not create a new Tag');
              }
            } catch (error) {
              setStatus('Could not process request.');
            }
          }}
        >
          {(props) => {
            const {
              values,
              //touched,
              //errors,
              //dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              //handleReset
            } = props;
            return (
              <form onSubmit={handleSubmit} style={{ width: '90%' }}>
                <Col breakPoint={{ xs: 8, sm: 6, md: 8, lg: 12 }}>
                  <Card>
                    <header>Fill up this form</header>
                    <CardBody>
                      <Input fullWidth size="Large">
                        <input
                          type="text"
                          id="shop_tag_name"
                          placeholder="Shop Tag Name"
                          value={values.shop_tag_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Input>

                      <Button fullWidth appearance="hero" type="submit" disabled={isSubmitting}>
                        Create
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              </form>
            );
          }}
        </Formik>

        <Col>{status}</Col>
      </Row>
    </Layout>
  );
}
