import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layers/Header';
import { useAppSelector } from '../../services/redux/store';
import globalType from '../../types/globalType';
import OrderCard from '../orders/orderCard';

const PastOrders = () => {
  const orders = useAppSelector((state) => state.orderReducer.orders);

  const userRepository = useAppSelector(state => state.userReducer)
  const prevOrders: globalType.Order[] = orders.filter(e => e.status == 'Done');
  const navigate = useNavigate()

  return(
    <>
      <Header onBack={() => navigate(-1)}/>
      <main className="pastOrderMain">
        {prevOrders?.reverse()?.map((value: globalType.Order, index) => (
          <OrderCard item={value} key={index} userBalance={userRepository.data.walletBalance} isCredit={false}/>
        ))}
      </main>
    </>

  )
};

export default PastOrders;