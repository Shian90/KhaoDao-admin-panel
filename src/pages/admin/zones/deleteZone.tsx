import Layout from 'Layouts';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Zone } from '../../../networking/zones';
import { getAllZones, deleteZone } from '../../../networking/zones';
import { getToken } from '../../../utils/cookies';
import Select from '@paljs/ui/Select';
import { Formik } from 'formik';
import { Button } from '@paljs/ui/Button';
// import { DisplayFormikState } from 'utils/formikHelper';
import React from 'react';

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

export default function DeleteZone() {
  const options = new Array();
  const [option, setOption] = useState(options);
  //const [selected,setSelected]= useState([]);
  const [status, setStatus] = useState('');
  useEffect(() => {
    const token = getToken();

    try {
      getAllZones(token).then((val) => {
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

    return () => {
      setOption([]);
    };
  }, []);
  return (
    <Layout title="Delete Zone">
      <div>
        <div>Delete Zone</div>
        <Formik
          initialValues={{ zone: new SelectItem(-1, '') }}
          onSubmit={async (values) => {
            const payload = {
              ...values,
              id: values.zone.value,
            };

            try {
              //console.log(payload.id);
              const res = await deleteZone(getToken(), payload.id);
              setOption((option) => option.filter((v) => v.id != payload.id));
              if (res == 200) {
                setStatus('Zone has been Deleted');
              } else {
                setStatus('Could not delete zone');
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
                  placeholder="Select"
                  value={values.zone}
                  onChange={(value: SelectItem) => {
                    setFieldValue('zone', value);
                  }}
                  onBlur={handleBlur}
                  touched={touched.zone}
                  error={errors.zone}
                  id="zone"
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
