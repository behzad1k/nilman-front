import { Button, SwipeableDrawer } from '@mui/material';
import { PlusCircle } from '@phosphor-icons/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal } from '../../components';
import LoginDrawer from '../../components/drawers/LoginDrawer';
import { useDrawer } from '../../components/layers/Drawer/DrawerContext';
import { urls } from '../../services/endPoint';
import { api } from '../../services/http';
import { addresses } from '../../services/redux/reducers/userSlice';
import { useAppDispatch, useAppSelector } from '../../services/redux/store';
import comp from '../../types/comp';
import globalType from '../../types/globalType';
import { AddressRow } from './addressRow';

export const Addresses = ({
                            onClick,
                            editable = false,
                          }: comp.IAddress) => {
  const userReducer = useAppSelector((state) => state.userReducer);
  const { openDrawer } = useDrawer();
  const userAddresses = userReducer.addresses;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState({
    open: false,
    content: undefined
  });
  const [selected, setSelected] = useState<globalType.Address>();
  const [confirmModal, setConfirmModal] = useState(false);

  const deleteAddress = async (id) => {
    const res = await api(urls.address + id, { method: 'DELETE' }, true);

    if (res.code == 200) {
      toast('آدرس با موفقیت حذف شد.', { type: 'success' });
      dispatch(addresses());
    } else {
      toast('مشکلی پیش آمده، لطفا مجددا امتحان کنید یا با اپراتور تماس بگیرید', { type: 'error' });
    }

    setModal({
      content: undefined,
      open: false
    });
    setConfirmModal(false);
  };

  return (
    <section className="addressSection">
      {userAddresses.map((value: globalType.Address, index) => (
        <AddressRow
          isSelected={selected == value && onClick != undefined}
          address={value}
          key={index}
          setSelected={setSelected}
          onClick={onClick}
          editable={editable}
          setModal={setModal}
          selectable={true}
        />
      ))}
      <div className="addressContainer add" onClick={() => userReducer.isLoggedIn ? navigate('/address/add') : toast('لطفا ابتدا وارد شوید!', {
        onClose: () => openDrawer(<LoginDrawer />, 'bottom'),
        type: 'error'
      })}>
        <Button>افزودن آدرس</Button>
        <PlusCircle weight={'fill'} color="green" size={20}/>
      </div>


      <SwipeableDrawer
        anchor="bottom"
        open={modal.open}
        onClose={() => setModal(prev => ({
          content: undefined,
          open: false
        }))}
        onOpen={() => setModal(prev => ({
          content: undefined,
          open: true
        }))}
      >
        <div className="addressModal">
          <h4>{modal.content?.title}</h4>
          <span className="addressModalButton" onClick={() => navigate(`/address/edit/${modal.content?.id}`)}>ویرایش آدرس</span>
          <span className="addressModalButton delete" onClick={() => setConfirmModal(true)}>حذف آدرس</span>
        </div>

      </SwipeableDrawer>
      <Modal open={confirmModal} setOpen={setConfirmModal}>
        <div className="deleteModal">
          از حذف آدرس {modal.content?.title} مطمئن هستید؟
          <div className="deleteModalButtons">
            <span className="addressModalButton" onClick={() => setConfirmModal(false)}>بازگشت</span>
            <span className="addressModalButton delete" onClick={() => deleteAddress(modal.content?.id)}>بله</span>
          </div>
        </div>
      </Modal>
    </section>
  );
};
