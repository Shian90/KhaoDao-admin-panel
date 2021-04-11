import { Button, ButtonLink } from '@paljs/ui/Button';
import { Card, CardBody, CardHeader } from '@paljs/ui/Card';
import React from 'react';
import style from '../../css/admin.module.css';

function MyCard({ title = '', subtitle = '', restaurantName = '', menuName = '', onInvisibleClick, onLoading }) {
  return (
    <Card className={style.mycard}>
      <CardHeader status="Success">{title}</CardHeader>
      <CardBody>
        <div className={style.cardBody}>
          <div className={style.cardDetail}>
            {restaurantName !== '' ? (
              <div>
                Restaurant: <span style={{ margin: '10px' }}>{restaurantName}</span>{' '}
              </div>
            ) : null}
            {menuName !== '' ? (
              <div>
                {' '}
                Menu: <span style={{ margin: '10px' }}>{menuName}</span>{' '}
              </div>
            ) : null}
            <span style={{ margin: '10px' }}>{subtitle}</span>
          </div>
          <div>
            <Button
              className={style.invisibleBtn}
              shape="SemiRound"
              status="Danger"
              onClick={onInvisibleClick}
              disabled={onLoading}
            >
              Make Invisible
            </Button>
            <Button shape="SemiRound" status="Basic">
              Details
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default MyCard;
