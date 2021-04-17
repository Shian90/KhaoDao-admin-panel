import { Button } from '@paljs/ui/Button';
import { Card, CardBody, CardHeader } from '@paljs/ui/Card';
import React from 'react';
import style from '../../css/admin.module.css';

function MyCard({
  title = '',
  description = '',
  restaurantName = '',
  subtitle = '',
  menuName = '',
  onInvisibleClick = () => {},
  onLoading = false,
  address = '',
  imageUrl = '',
  additionalImages = [],
  review = '',
}) {
  return (
    <Card className={style.mycard}>
      <CardHeader status="Success">{title}</CardHeader>
      <CardBody>
        <div className={style.cardBody}>
          <div className={style.cardDetailWithImages}>
            <div className={style.cardDetail}>
              {imageUrl !== '' ? <img src={imageUrl} className={style.cardMainImageStyle} /> : null}
              <div className={style.infos}>
                {restaurantName !== '' ? (
                  <div>
                    Restaurant: <span>{restaurantName}</span>{' '}
                  </div>
                ) : null}
                {menuName !== '' ? (
                  <div>
                    {' '}
                    Menu: <span>{menuName}</span>{' '}
                  </div>
                ) : null}

                {address !== '' ? (
                  <div>
                    {' '}
                    Address: <span>{address}</span>{' '}
                  </div>
                ) : null}
                {description !== '' ? (
                  <div className={style.description}>
                    Description: <span>{description}</span>
                  </div>
                ) : null}

                {review !== '' ? (
                  <div className={style.description}>
                    Review: <span>{review}</span>
                  </div>
                ) : null}
                <span>{subtitle}</span>
              </div>
            </div>
            <div className={style.formImage}>
              {additionalImages !== []
                ? additionalImages.map((imageUrl, index) => (
                    <div className={style.formImageWithBtnDiv}>
                      <img key={index} src={imageUrl} className={style.cardImageStyle} />
                    </div>
                  ))
                : null}
            </div>
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
            {/* <Button shape="SemiRound" status="Basic">
              Details
            </Button> */}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default MyCard;
