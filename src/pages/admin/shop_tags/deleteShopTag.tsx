import Layout from 'Layouts';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ShopTag } from '../../../networking/shop_tags';
import { deleteTag, getAllTags } from '../../../networking/shop_tags';
import { getToken } from '../../../utils/cookies';
import Select from '@paljs/ui/Select';
import { Formik } from 'formik';
// import Row from '@paljs/ui/Row';
import { Button } from '@paljs/ui/Button';
//import { DisplayFormikState } from 'utils/formikHelper';
import React from 'react';
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
      getAllTags(getToken()).then((val) => {
        val.map((v: ShopTag) => {
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
    <Layout title="Delete Shop Tags">
      <div>
        <div>Delete Shop Tags</div>
        <Formik
          initialValues={{ tag: new SelectItem(-1, '') }}
          onSubmit={async (values) => {
            const payload = {
              ...values,
              id: values.tag.value,
            };

            try {
              //console.log(payload.id);
              const res = await deleteTag(getToken(), payload.id);
              setOption((option) => option.filter((v) => v.id != payload.id));
              if (res == 200) {
                setStatus('Shop Tag has been Deleted');
              } else {
                setStatus('Could not shop tag');
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
                  placeholder="Select Tag To Delete"
                  value={values.tag}
                  onChange={(value: SelectItem) => {
                    setFieldValue('tag', value);
                  }}
                  onBlur={handleBlur}
                  touched={touched.tag}
                  error={errors.tag}
                  id="tag"
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
