import { useState } from 'react';
import {ISliderCardInfo} from '../../services/types';
import { Modal } from '../common/modal.tsx';

export function SliderCard({imgSrc, title}: ISliderCardInfo) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="sliderCard" style={{ backgroundImage: `url(${imgSrc})` }} onClick={() => setOpenModal(true)}>
      <span>
        <p>{title}</p>
        <i></i>
      </span>
      </div>
      <Modal open={openModal} setOpen={setOpenModal}>
        <i className="close-button" onClick={() => setOpenModal(false)}></i>
        <img src={imgSrc} alt={title}/>
      </Modal>
    </>
  );
}
