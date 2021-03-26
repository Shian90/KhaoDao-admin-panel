import { Button, ButtonLink } from '@paljs/ui/Button';
import { Card, CardBody, CardHeader } from '@paljs/ui/Card';
import React from 'react';
import style from '../../css/admin.module.css';

function MyCard({ title, subtitle, onInvisibleClick, onLoading }) {
  return (
    <Card className={style.mycard}>
      <CardHeader status="Success">{title}</CardHeader>
      <CardBody>
        <div className={style.cardBody}>
          {subtitle}
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
