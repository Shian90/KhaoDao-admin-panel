import { Zone } from '../../../networking/zones';
import { getAllZones } from '../../../networking/zones';
import Select from '@paljs/ui/Select';
import { updateZone, createZoneFormData } from '../../../networking/zones';
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

const zoneIdToZoneAdapter = (id: number, arrayOfZone: Array<Zone>): Zone => {
  var z = new Object() as Zone;
  arrayOfZone.forEach((zone) => {
    if (zone.id === id) {
      console.log(zone.name);
      z = zone;
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
  const [zones, setZones] = useState([]);
  useEffect(() => {
    //const token = getToken();

    try {
      getAllZones(getToken()).then((val) => {
        //console.log("amm here");

        val.map((v: Zone) => {
          setOption((option) => [
            ...option,
            {
              value: v.id,
              label: v.name,
            },
          ]);

          setZones(val);
        });

        console.log(zones);
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
            name: '',
            north_geocode: '',
            south_geocode: '',
            east_geocode: '',
            west_geocode: '',
            north_east_geocode: '',
            north_west_geocode: '',
            south_east_geocode: '',
            south_west_geocode: '',
            zone: new SelectItem(-1, ''),
          }}
          onSubmit={async (values) => {
            console.log('subtitinfsd');
            try {
              const payload = {
                ...values,
                id: values.zone.value,
              };

              const status = await updateZone(
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
                payload.id,
              );
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
                      value={values.zone}
                      onChange={(value: SelectItem) => {
                        setFieldValue('zone', value);
                        const zone = zoneIdToZoneAdapter(value.value, zones);
                        //console.log(zone);
                        setFieldValue('name', zone.name);
                        setFieldValue('north_geocode', zone.north_geocode);
                        setFieldValue('south_geocode', zone.south_geocode);
                        setFieldValue('east_geocode', zone.east_geocode);
                        setFieldValue('west_geocode', zone.west_geocode);
                        setFieldValue('north_east_geocode', zone.north_east_geocode);
                        setFieldValue('north_west_geocode', zone.north_west_geocode);
                        setFieldValue('south_east_geocode', zone.south_east_geocode);
                        setFieldValue('south_west_geocode', zone.south_west_geocode);
                      }}
                      onBlur={handleBlur}
                      touched={touched.zone}
                      error={errors.zone}
                      id="zone"
                    />
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
