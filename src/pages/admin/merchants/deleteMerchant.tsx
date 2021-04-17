import Layout from 'Layouts';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Merchant } from '../../../networking/merchants';
import { deleteMerchant, getAllMerchants } from '../../../networking/merchants';
import { getToken } from '../../../utils/cookies';
import Select from '@paljs/ui/Select';
import { Formik } from 'formik';
// import Row from '@paljs/ui/Row';
import { Button } from '@paljs/ui/Button';
//import { DisplayFormikState } from 'utils/formikHelper';
import React from 'react';
//import { MerchantApplicant } from 'networking/leads';
//import GetAllShopTags from '../leads/getAllMerchantLeads';

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

export default function DeleteShopTag() {
  const options = new Array();
  const [option, setOption] = useState(options);
  //const [selected,setSelected]= useState([]);
  const [status, setStatus] = useState('');
  useEffect(() => {
    //const token = getToken();

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
    <Layout title="Delete Merchant">
      <div>
        <div>Delete Merchant</div>
        <Formik
          initialValues={{ merchant: new SelectItem(-1, '') }}
          onSubmit={async (values) => {
            const payload = {
              ...values,
              id: values.merchant.value,
            };

            try {
              //console.log(payload.id);
              const res = await deleteMerchant(getToken(), payload.id);
              setOption((option) => option.filter((v) => v.id != payload.id));
              if (res == 200) {
                setStatus('Merchant has been Deleted');
              } else {
                setStatus('Could not delete merchant');
              }
            } catch (err) {
              console.log(err);
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
              //handleReset
              setFieldValue,
              //setFieldTouched,
            } = props;

            return (
              <form onSubmit={handleSubmit}>
                <SelectStyled
                  options={option}
                  placeholder="Select Merchant To Delete"
                  value={values.merchant}
                  onChange={(value: SelectItem) => {
                    setFieldValue('merchant', value);
                  }}
                  onBlur={handleBlur}
                  touched={touched.merchant}
                  error={errors.merchant}
                  id="merchant"
                />
                <Button status="Success" type="submit" shape="SemiRound" fullWidth disabled={isSubmitting}>
                  Delete
                </Button>
                {/* <div>{props}</div> */}
                {/* <DisplayFormikState {...props}/> */}
              </form>
            );
          }}
        </Formik>
        <div>{status}</div>
      </div>
    </Layout>
  );
}
