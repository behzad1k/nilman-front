import moment from 'jalali-moment';
import { useNavigate } from 'react-router-dom';
import OrderDetail from '../../components/drawers/OrderDetail';
import { useDrawer, useRegisterDrawerComponent } from '../../components/layers/Drawer/DrawerContext';
import { useAppSelector } from '../../services/redux/store';
import comp from '../../types/comp';
import { findAncestors, formatPrice, getServiceIcon } from '../../utils/utils';
import IOrderCardProps = comp.IOrderCardProps;

export default function OrderCard({ item }: IOrderCardProps) {
  const services = useAppSelector(state => state.serviceReducer.allServices)
  const navigate = useNavigate()

  useRegisterDrawerComponent('orderDetail', OrderDetail)

  const { openDrawer } = useDrawer();

  return (
    <>
      <article className="orderCardContainer">
      <div className="orderCardInfo">
        <div className="profilePicture">
          <img src={item?.worker?.profilePic?.url}/>
        </div>
        <div className="orderCardInfoHeader">
          <h3>{item.service.title}</h3>
          <span className="orderCardDate">{moment(item.date + ' ' + item.fromTime, 'jYYYY/jMM/jDD HH').locale('fa').format('dddd jD jMMMM  .  ساعت HH')}</span>
          <span className="orderCardAddress">آدرس: {item.address?.title}</span>
          {item.worker?.name && <span className="orderCardAddress">استایلیست: {item.worker?.name + ' ' + item?.worker?.lastName}</span>}
        </div>
        {item.isUrgent && <span className="isUrgent">فوری</span>}
      </div>
        <div className="orderCardSecRow">
          <div className="orderCardService">
            {item.orderServices?.filter(e => !e.isAddOn).slice(0, 3)?.map((attribute, index) =>
              <div className="orderCardServiceIcon">
                <span>{attribute.count}</span>
                <img src={getServiceIcon(findAncestors(services, attribute.serviceId).find(e => e?.showInList && e?.openDrawer)?.slug)}/>
              </div>
            )}
          </div>
          {item?.finalPrice && <span>{formatPrice(item?.finalPrice)} تومان</span>}
        </div>

        <div className="orderCardButtons">
          <button onClick={() => openDrawer('orderDetail', { item })}>مشاهده فاکتور</button>
          <button className="reOrder" onClick={() => {
            const options: any = {}
            item.orderServices.map(e => options[e.serviceId] = {
              count: e.count,
              colors: e.colors?.map(j => j.id)
            })
            localStorage.setItem('step', JSON.stringify({
              name: 'address',
              index: 2
            }));
            localStorage.setItem('new-order', JSON.stringify({
              service: item?.service,
              addressId: item?.addressId,
              isUrgent: item?.isUrgent,
              attributes: item?.attributes,
              options
            }));
            navigate('/')
          }}>سفارش مجدد</button>
        </div>
      </article>
    </>
  );
}
