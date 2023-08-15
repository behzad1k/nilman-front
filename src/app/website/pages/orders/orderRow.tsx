import { Article, Calendar, MapPinLine, Money, UserCircleGear } from "@phosphor-icons/react";
import React from "react";
import { ProfilePicture } from "../../components";
import { IService } from "../../../../services/types.ts";
import { formatPrice } from "../../../../utils/utils.ts";

type IProps = {
  service: IService
}
const orderItem = ({service}:IProps) => {
  return (
      <article className="infoBox orderRow"
               // style={{backgroundColor: service.status == 1 ? 'green' : 'red'}}
      >
        <h4>{service.title} </h4>
        <div>
          <div className="orderRowDetails">
            {service.details?.length > 0 &&
            <span className="orderItem">
              <Article/>
              {service.details.map((value,index) =>
                  <p key={index}>{value}</p>
              )}
            </span>
            }
            <span className="orderItem">
              <Calendar/>
              <p> {service.date} </p>
            </span>
            <span className="orderItem">
              <MapPinLine/>
              <p> {service.address} </p>
            </span>
            <span className="orderItem">
              <Money/>
              {service.discount > 0 ?
                  <>
                    <s>{formatPrice(service.price)}</s>
                    <p>{formatPrice(service.price - service.discount)}</p>
                  </> :
                  <p>{formatPrice(service.price)}</p>
              }
            </span>
          </div>
          <div className="orderRowProfile">
            <ProfilePicture imgSrc={service.employee?.imageUrl}/>
            <p>{service.employee?.name}</p>
          </div>
        </div>
      </article>
  );
};
export default orderItem
