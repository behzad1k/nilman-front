import { useNavigate } from 'react-router-dom';
import { Header } from '../../../components/layers/Header.tsx';
import { Addresses } from '../Addresses';

const Address = () => {
  const navigate = useNavigate();
  return(
    <>
      <Header onBack={() => navigate(-1)} />
      <div className="addressPage">
        <h3>لیست آدرس ها</h3>
        <Addresses editable={true}/>
      </div>
    </>
  )
};

export default Address;
