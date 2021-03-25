import { RiderApplicant } from '../../../networking/leads';
import { getAllRiderLeads } from '../../../networking/leads';
import Select from '@paljs/ui/Select';
import { updateRiderLeadStatus, createStatusFormData } from '../../../networking/leads';
import { getToken } from '../../../utils/cookies';
import Col from '@paljs/ui/Col';
import { Button } from '@paljs/ui/Button';
//import { InputGroup } from '@paljs/ui/Input';
import Layout from 'Layouts';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { Card, CardBody } from '@paljs/ui/Card';
import styled from 'styled-components';
//import { DisplayFormikState } from 'utils/formikHelper';

export const SelectStyled = styled(Select)`
  margin-bottom: 1rem;
`;

// const Input = styled(InputGroup)`
//   margin-bottom: 10px;
// `;

const riderApplicantIdToRiderApplicantAdapter = (
  id: number,
  arrayOfRiderApplicant: Array<RiderApplicant>,
): RiderApplicant => {
  var z = new Object() as RiderApplicant;
  arrayOfRiderApplicant.forEach((riderApplicant) => {
    if (riderApplicant.id === id) {
      console.log(riderApplicant.name);
      z = riderApplicant;
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
  const [riderApplicant, setRiderApplicant] = useState([]);

  const status_option = [
    {
      value: 1,
      label: 'GRANTED',
    },
    {
      value: 2,
      label: 'RECEIVED',
    },
    {
      value: 3,
      label: 'PROCESSING',
    },
    {
      value: 4,
      label: 'REJECTED',
    },
  ];

  useEffect(() => {
    //const token = getToken();

    try {
      getAllRiderLeads(getToken()).then((val) => {
        //console.log("amm here");

        val.map((v: RiderApplicant) => {
          setOption((option) => [
            ...option,
            {
              value: v.id,
              label: v.name,
            },
          ]);

          setRiderApplicant(val);
        });

        console.log(riderApplicant);
      });
    } catch (err) {
      console.log(err);
    }

    return () => {
      setOption([]);
    };
  }, []);
  return (
    <Layout title="Update Rider Status">
      <div>
        <div>Update Rider</div>

        <Formik
          initialValues={{
            status: new SelectItem(-1, ''),
            riderApplicant: new SelectItem(-1, ''),
          }}
          onSubmit={async (values) => {
            //console.log('subtitinfsd');
            try {
              const payload = {
                ...values,
                id: values.riderApplicant.value,
                status: values.status.label,
              };

              const status = await updateRiderLeadStatus(getToken(), createStatusFormData(payload.status), payload.id);
              if (status === 200) {
                setStatus('Updated a Rider Lead Status');
              } else {
                setStatus('Could not update a Rider Lead Status');
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
                    <header>Rider Lead Status</header>

                    <SelectStyled
                      options={option}
                      placeholder="Select"
                      value={values.riderApplicant}
                      onChange={(value: SelectItem) => {
                        setFieldValue('riderApplicant', value);
                        const tag = riderApplicantIdToRiderApplicantAdapter(value.value, riderApplicant);
                        //console.log(zone);
                        setFieldValue('status', tag.status);
                      }}
                      onBlur={handleBlur}
                      touched={touched.riderApplicant}
                      error={errors.riderApplicant}
                      id="riderApplicant"
                    />
                    <CardBody>
                      <SelectStyled
                        options={status_option}
                        placeholder="Select Status"
                        value={values.status}
                        onChange={(value: SelectItem) => {
                          setFieldValue('status', value);
                        }}
                        onBlur={handleBlur}
                        touched={touched.status}
                        error={errors.status}
                        id="status"
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
