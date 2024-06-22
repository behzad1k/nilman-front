import { useState } from 'react';
import {ISliderCardInfo} from '../../services/types';
import { Modal } from '../common/modal.tsx';

export function SliderCard({url, title}: ISliderCardInfo) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="sliderCard" style={{ backgroundImage: `url(${url})` }} onClick={() => setOpenModal(true)}>
      <span>
        <p>{title}</p>
        <i></i>
      </span>
      </div>
      <Modal open={openModal} setOpen={setOpenModal}>
        <i className="close-button" onClick={() => setOpenModal(false)}></i>
        <img src={url} alt={title}/>
      </Modal>
    </>
  );
}
