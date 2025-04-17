import { useState } from 'react';
import { Modal } from '../common/modal';

export function SliderCard({url, title}: any) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="sliderCard" style={{ background: `url(${url})`, backgroundSize: 'cover'}} onClick={() => setOpenModal(true)}>
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
