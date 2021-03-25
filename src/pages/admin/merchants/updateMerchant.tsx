import { Merchant } from '../../../networking/merchants';
import { getAllMerchants } from '../../../networking/merchants';
import Select from '@paljs/ui/Select';
import { updateMerchant, createMerchantFormData } from '../../../networking/merchants';
import { getToken } from '../../../utils/cookies';

import Col from '@paljs/ui/Col';

import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import Layout from 'Layouts';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { Card, CardBody } from '@paljs/ui/Card';
import styled from 'styled-components';
import { getAllZones } from '../../../networking/zones';
import { Zone } from '../../../networking/zones';
//import { DisplayFormikState } from 'utils/formikHelper';
//import { tokenToString } from 'typescript';

export const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

const Input = styled(InputGroup)`
  margin-bottom: 10px;
`;

const merchantIdToMerchantAdapter = (id: number, arrayOfMerchant: Array<Merchant>): Merchant => {
  var z = new Object() as Merchant;
  arrayOfMerchant.forEach((merchant) => {
    if (merchant.merchant_id === id) {
      console.log(merchant.merchant_name);
      z = merchant;
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

export default function UpdateMerchant() {
  const options = new Array();
  const initial_merchant = new Array<Merchant>();
  //const initialZone = new Object();
  const [option, setOption] = useState(options);
  const [zone_option, setZoneOption] = useState(options);
  const [status, setStatus] = useState('');
  //const [zone,setZone] = useState(initialZone);
  const [merchant, setMerchant] = useState(initial_merchant);
  useEffect(() => {
    //const token = getToken();
    console.log(getToken());
    try {
      getAllMerchants(getToken()).then((val) => {
        val.map((v: Merchant) => {
          setOption((option) => [
            ...option,
            {
              value: v.merchant_id,
              label: v.merchant_name,
            },
          ]);
          setMerchant(val);
        });

        console.log(merchant);
      });

      getAllZones(getToken()).then((val) => {
        val.map((v: Zone) => {
          setZoneOption((zone_option) => [
            ...zone_option,
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

    return () => {
      setOption([]);
    };
  }, []);
  return (
    <Layout title="Update Zone">
      <div>
        <div>Update Zone</div>

        <Formik
          initialValues={{
            email: '',
            full_name: '',
            password: '',
            shop_name: '',
            address: '',
            gps_pos_x: '',
            gps_pos_y: '',
            zone_name: '',
            merchant: new SelectItem(-1, ''),
          }}
          onSubmit={async (values) => {
            console.log('subtitinfsd');
            try {
              const payload = {
                ...values,
                id: values.merchant.value,
              };

              const status = await updateMerchant(
                getToken(),
                createMerchantFormData(
                  values.email,
                  values.full_name,
                  values.password,
                  values.shop_name,
                  values.zone_name,
                  values.address,
                  values.gps_pos_x,
                  values.gps_pos_y,
                ),
                payload.id,
              );
              if (status === 200) {
                setStatus('Updated a Merchant');
              } else {
                setStatus('Could not update a Merchant');
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
                      value={values.merchant}
                      onChange={(value: SelectItem) => {
                        setFieldValue('zone', value);
                        const m = merchantIdToMerchantAdapter(value.value, merchant);
                        //console.log(zone);
                        setFieldValue('full_name', m.merchant_name);
                        setFieldValue('email', m.merchant_email);
                        //setFieldValue('south_geocode', merchant.password);
                        //setFieldValue('east_geocode', m.shop_name);
                        setFieldValue('address', m.address);
                        setFieldValue('shop_name', m.shop_name);
                        setFieldValue('zone_name', m.zone_name);
                        //setFieldValue('north_east_geocode', merchant.gps_pos_x);
                        //setFieldValue('north_west_geocode', merchant.gps_pos_y);
                        //setFieldValue('south_east_geocode', zone.south_east_geocode);
                        //setFieldValue('south_west_geocode', zone.south_west_geocode);
                      }}
                      onBlur={handleBlur}
                      touched={touched.merchant}
                      error={errors.merchant}
                      id="merchant"
                    />
                    <CardBody>
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
                        options={zone_option}
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
