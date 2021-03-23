import { Accordion, AccordionItem, AccordionRefObject } from '@paljs/ui/Accordion';
import { Button } from '@paljs/ui/Button';
import { Card, CardBody } from '@paljs/ui/Card';
import Row from '@paljs/ui/Row';
import Col from '@paljs/ui/Col';
import React, { useRef } from 'react';
import Layout from 'Layouts';
import { GetStaticProps } from 'next';
import { checkToken } from '../../utils/cookies';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getAllZones, createZoneFormData, postZone, updateZone, deleteZone } from 'networking/zones';

const Accordions = () => {
  const accordionRef = useRef<AccordionRefObject>(null);
  const style = { marginBottom: '1.5rem' };
  const router = useRouter();

  const getAuth = () => {
    router.push('/auth/login');
  };

  useEffect(() => {
    //console.log(props.userToken);
    if (checkToken() == false) {
      getAuth();
    } else {
      const formData = createZoneFormData(
        'tes4',
        '23.33,32.3223',
        '23.33,32.3223',
        '23.33,32.3223',
        '23.33,32.3223',
        '23.33,32.3223',
        '23.33,32.3223',
        '23.33,32.3223',
        '23.33,32.3223',
      );
      // postZone('ba254e9f8bb8072c0fdcb9c58382317408668c7b', formData).then((value) => {
      //   console.log(value);
      // });
      // deleteZone('ba254e9f8bb8072c0fdcb9c58382317408668c7b',5).then((value) => {
      //   console.log(value);
      // });
    }
    return () => {};
  }, []);

  if (checkToken() == true)
    return (
      <Layout title="Accordions">
        <Row>
          <Col breakPoint={{ xs: 12, lg: 6 }}>
            <Card>
              <header>Toggle Accordion By Button</header>
              <CardBody>
                <Row>
                  <Col style={style} breakPoint={{ xs: 12, lg: 4 }}>
                    <Button fullWidth onClick={() => accordionRef.current?.openAll()}>
                      openAll
                    </Button>
                  </Col>
                  <Col style={style} breakPoint={{ xs: 12, lg: 4 }}>
                    <Button fullWidth onClick={() => accordionRef.current?.closeAll()}>
                      closeAll
                    </Button>
                  </Col>
                  <Col style={style} breakPoint={{ xs: 12, lg: 4 }}>
                    <Button fullWidth onClick={() => accordionRef.current?.open(1)}>
                      open first
                    </Button>
                  </Col>
                  <Col style={style} breakPoint={{ xs: 12, lg: 4 }}>
                    <Button fullWidth onClick={() => accordionRef.current?.close(1)}>
                      close first
                    </Button>
                  </Col>
                  <Col style={style} breakPoint={{ xs: 12, lg: 4 }}>
                    <Button fullWidth onClick={() => accordionRef.current?.toggle(1)}>
                      toggle first
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Accordion>
              <AccordionItem uniqueKey={1} title="head 1">
                Hello 1Hello 1Hello 1Hello 1
              </AccordionItem>
              <AccordionItem uniqueKey={2} title="head 2">
                Hello 2Hello 2Hello 2Hello 2
              </AccordionItem>
              <AccordionItem uniqueKey={3} title="head 3">
                Hello 3Hello 3Hello 3Hello 3
              </AccordionItem>
            </Accordion>
          </Col>
          <Col breakPoint={{ xs: 12, lg: 6 }}>
            <Accordion multi ref={accordionRef}>
              <AccordionItem uniqueKey={1} title="head 1">
                Hello 1Hello 1Hello 1Hello 1
              </AccordionItem>
              <AccordionItem uniqueKey={2} title="head 2">
                Hello 2Hello 2Hello 2Hello 2
              </AccordionItem>
              <AccordionItem uniqueKey={3} title="head 3">
                Hello 3Hello 3Hello 3Hello 3
              </AccordionItem>
            </Accordion>
          </Col>
        </Row>
      </Layout>
    );
  else {
    //const router = useRouter();
    //router.push("/auth/login");
    return <div>Please login first</div>;
    //getAuth();
  }
};

export const getStaticProps: GetStaticProps = async () => {
  //this doesn;t work because cookies are client side.
  // let _userToken: string = "";
  // if(checkToken() == true) {
  //   _userToken = getToken();
  //   console.log("got the token");
  // }
  // else{
  //   console.log(checkToken());
  // }

  return {
    props: {
      //userToken: _userToken
    },
  };
};

export default Accordions;
