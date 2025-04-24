import { Close } from '@mui/icons-material';
import { SwipeableDrawer } from '@mui/material';
import React from 'react';

const InfoDrawer = ({ infoModal, setInfoModal, curParent, parent }) => {
  return (
    <SwipeableDrawer
      anchor="bottom"
      onClose={() => setInfoModal(false)}
      onOpen={() => setInfoModal(true)}
      open={infoModal}
      sx={{ zIndex: 1400 }}
    >
      <section className='infoModal'>
        <div className="infoModalHeader">
          <p className='fontWeight400 marginBottom10'>توضیحات {(curParent || parent).title}</p>
          <Close onClick={() => setInfoModal(false)}/>
        </div>
        {[...(curParent || parent).attributes]?.sort((a, b) => (a?.sort || 1000) - (b?.sort || 1000)).map((attribute) =>
          <div className='infoRow' key={attribute.id}>
            <span className='fontWeight400'>{attribute.title}</span>
            <span className='infoModalDesc'>{attribute.description}</span>
          </div>
        )}
      </section>
    </SwipeableDrawer>
  );
};

export default InfoDrawer;
