import { MerchantApplicant } from '../../../networking/leads';
import { getAllMerchantLeads } from '../../../networking/leads';
import Select from '@paljs/ui/Select';
import { updateMerchantLeadStatus, createStatusFormData } from '../../../networking/leads';
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

const merchantApplicantIdToMerchantApplicantAdapter = (
  id: number,
  arrayOfMerchantApplicant: Array<MerchantApplicant>,
): MerchantApplicant => {
  var z = new Object() as MerchantApplicant;
  arrayOfMerchantApplicant.forEach((merchantApplicant) => {
    if (merchantApplicant.id === id) {
      console.log(merchantApplicant.name);
      z = merchantApplicant;
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

export default function UpdateMechantLead() {
  const options = new Array();
  //const initialZone = new Object();
  const [option, setOption] = useState(options);
  const [status, setStatus] = useState('');
  //const [zone,setZone] = useState(initialZone);
  const [merchantApplicant, setMerchantApplicant] = useState([]);

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
      getAllMerchantLeads(getToken()).then((val) => {
        //console.log("amm here");

        val.map((v: MerchantApplicant) => {
          setOption((option) => [
            ...option,
            {
              value: v.id,
              label: v.name,
            },
          ]);

          setMerchantApplicant(val);
        });

        console.log(merchantApplicant);
      });
    } catch (err) {
      console.log(err);
    }

    return () => {
      setOption([]);
    };
  }, []);
  return (
    <Layout title="Update Merchant Status">
      <div>
        <div>Update Merchant</div>

        <Formik
          initialValues={{
            status: new SelectItem(-1, ''),
            merchantApplicant: new SelectItem(-1, ''),
          }}
          onSubmit={async (values) => {
            //console.log('subtitinfsd');
            try {
              const payload = {
                ...values,
                id: values.merchantApplicant.value,
                status: values.status.label,
              };

              const status = await updateMerchantLeadStatus(
                getToken(),
                createStatusFormData(payload.status),
                payload.id,
              );
              if (status === 200) {
                setStatus('Updated a Merchant Lead Status');
              } else {
                setStatus('Could not update a Merchant Lead Status');
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
                    <header>Merchant Lead Status</header>

                    <SelectStyled
                      options={option}
                      placeholder="Select"
                      value={values.merchantApplicant}
                      onChange={(value: SelectItem) => {
                        setFieldValue('merchantApplicant', value);
                        const tag = merchantApplicantIdToMerchantApplicantAdapter(value.value, merchantApplicant);
                        //console.log(zone);
                        setFieldValue('status', tag.status);
                      }}
                      onBlur={handleBlur}
                      touched={touched.merchantApplicant}
                      error={errors.merchantApplicant}
                      id="merchantApplicant"
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
