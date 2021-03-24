import { postZone, createZoneFormData } from '../../../networking/zones';
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

export default function CreateZone() {
  //const [zones, setZones] = useState([]);
  //const accordionRef = useRef<AccordionRefObject>(null);
  var token = '';

  useEffect(() => {
    token = getToken();

    //getAllZones(token).then((value) => setZones(value));
    return () => {};
  }, []);
  const [status, setStatus] = useState('');

  //const status: Status[] = ['Info', 'Success', 'Danger', 'Primary', 'Warning', 'Basic', 'Control'];
  return (
    <Layout title="Create a Zone">
      <Row>
        <Formik
          initialValues={{
            name: '',
            north_geocode: '',
            south_geocode: '',
            east_geocode: '',
            west_geocode: '',
            north_east_geocode: '',
            north_west_geocode: '',
            south_east_geocode: '',
            south_west_geocode: '',
          }}
          onSubmit={async (values) => {
            try {
              const status = await postZone(
                getToken(),
                createZoneFormData(
                  values.name,
                  values.north_geocode,
                  values.south_geocode,
                  values.east_geocode,
                  values.west_geocode,
                  values.north_east_geocode,
                  values.north_west_geocode,
                  values.south_east_geocode,
                  values.south_west_geocode,
                ),
              );
              if (status === 200) {
                setStatus('Created a new Zone');
              } else {
                setStatus('Could not create a new Zone');
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
                    <header>Input comma separated latitude,longitude</header>
                    <CardBody>
                      <Input fullWidth size="Large">
                        <input
                          type="text"
                          id="name"
                          placeholder="Name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Input>
                      <Input fullWidth size="Large">
                        <input
                          type="text"
                          id="north_geocode"
                          placeholder="North Geocode"
                          value={values.north_geocode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Input>
                      <Input fullWidth size="Large">
                        <input
                          type="text"
                          id="south_geocode"
                          placeholder="South Geocode"
                          value={values.south_geocode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Input>
                      <Input fullWidth size="Large">
                        <input
                          type="text"
                          id="east_geocode"
                          placeholder="East Geocode"
                          value={values.east_geocode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Input>
                      <Input fullWidth size="Large">
                        <input
                          type="text"
                          id="west_geocode"
                          placeholder="West Geocode"
                          value={values.west_geocode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Input>
                      <Input fullWidth size="Large">
                        <input
                          type="text"
                          id="north_east_geocode"
                          placeholder="North East Geocode"
                          value={values.north_east_geocode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Input>
                      <Input fullWidth size="Large">
                        <input
                          type="text"
                          id="north_west_geocode"
                          placeholder="North West Geocode"
                          value={values.north_west_geocode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Input>
                      <Input fullWidth size="Large">
                        <input
                          type="text"
                          id="south_east_geocode"
                          placeholder="South East Geocode"
                          value={values.south_east_geocode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Input>
                      <Input fullWidth size="Large">
                        <input
                          type="text"
                          id="south_west_geocode"
                          placeholder="South West Geocode"
                          value={values.south_west_geocode}
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
