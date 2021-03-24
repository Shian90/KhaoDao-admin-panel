import { postMerchant, createMerchantFormData } from '../../../networking/merchants';
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
import { getAllZones } from '../../../networking/zones';
import { Zone } from '../../../networking/zones';
import Select from '@paljs/ui/Select';
// import { DisplayFormikState } from 'utils/formikHelper';

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;

export const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

class SelectItem {
  value: number;
  label: string;

  constructor(v: number, l: string) {
    this.value = v;
    this.label = l;
  }
}

export default function CreateZone() {
  //const [zones, setZones] = useState([]);
  //const accordionRef = useRef<AccordionRefObject>(null);
  //var token = '';
  const options = new Array();
  const [option, setOption] = useState(options);

  useEffect(() => {
    //token = getToken();

    try {
      getAllZones(getToken()).then((val) => {
        val.map((v: Zone) => {
          setOption((option) => [
            ...option,
            {
              value: v.id,
              label: v.name,
            },
          ]);
        });
      });
    } catch (err) {
      console.log(err);
    }
    return () => {};
  }, []);
  const [status, setStatus] = useState('');

  //const status: Status[] = ['Info', 'Success', 'Danger', 'Primary', 'Warning', 'Basic', 'Control'];
  return (
    <Layout title="Create a Merchant">
      <Row>
        <Formik
          initialValues={{
            full_name: '',
            email: '',
            password: '',
            shop_name: '',
            zone_name: new SelectItem(-1, ''),
            address: '',
            gps_pos_x: '',
            gps_pos_y: '',
          }}
          onSubmit={async (values) => {
            try {
              const payload = {
                ...values,
                z_n: values.zone_name.label,
              };
              const status = await postMerchant(
                getToken(),
                createMerchantFormData(
                  values.email,
                  values.full_name,
                  values.password,
                  values.shop_name,
                  payload.z_n,
                  values.address,
                  values.gps_pos_x,
                  values.gps_pos_y,
                ),
              );
              if (status === 200) {
                setStatus('Created a new Merchant');
              } else {
                setStatus('Could not create a new Merchant');
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
                    <header>Fill up this form </header>
                    <CardBody>
                      <Input fullWidth size="Large">
                        <input
                          type="text"
                          id="full_name"
                          placeholder="Full Name"
                          value={values.full_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Input>
                      <Input fullWidth size="Large">
                        <input
                          type="text"
                          id="email"
                          placeholder="Email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Input>
                      <Input fullWidth size="Large">
                        <input
                          type="password"
                          id="password"
                          placeholder="Password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Input>
                      <Input fullWidth size="Large">
                        <input
                          type="text"
                          id="shop_name"
                          placeholder="Shop Name"
                          value={values.shop_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Input>
                      <Input fullWidth size="Large">
                        <input
                          type="text"
                          id="address"
                          placeholder="Address"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Input>
                      <Input fullWidth size="Large">
                        <input
                          type="text"
                          id="gps_pos_x"
                          placeholder="GPS POS X"
                          value={values.gps_pos_x}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Input>

                      <Input fullWidth size="Large">
                        <input
                          type="text"
                          id="gps_pos_y"
                          placeholder="GPS POS Y"
                          value={values.gps_pos_y}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Input>

                      <SelectStyled
                        options={option}
                        placeholder="Select Zone"
                        value={values.zone_name}
                        onChange={(value: SelectItem) => {
                          setFieldValue('zone_name', value);
                        }}
                        onBlur={handleBlur}
                        touched={touched.zone_name}
                        error={errors.zone_name}
                        id="zone"
                      />

                      <Button fullWidth appearance="hero" type="submit" disabled={isSubmitting}>
                        Create
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
                {/* <DisplayFormikState {...props}/> */}
              </form>
            );
          }}
        </Formik>

        <Col>{status}</Col>
      </Row>
    </Layout>
  );
}
