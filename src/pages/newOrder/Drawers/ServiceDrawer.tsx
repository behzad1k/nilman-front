import { Box, Typography } from '@mui/material';
import React from 'react';
import { formatPrice } from '../../../utils/utils';

const ServiceDrawer = ({ curParent, parent, selected, setSelected, handleClickCard, deleteAttribute, toggleDrawer, boxEl}) => {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body1" component="h3" mb={1}>
          {(curParent || parent)?.title}
        </Typography>
      </Box>

      {[...(curParent || parent)?.attributes]?.filter(e => e.showInList)?.sort((a, b) => (a?.sort || 1000) - (b?.sort || 1000)).map((secAttr, index) => (
        <Box
          key={secAttr.slug}
          className={`attr-box ${
            selected?.attributes?.find(e => e.id == secAttr.id) || selected.attributes.find(e => secAttr.attributes.map(j => j.id).includes(e.id)) ? 'selected' : ''
          }`}
          ref={(el: HTMLElement) => (boxEl.current[index] = el)}
          onClick={() => handleClickCard(index, secAttr)}
          sx={{
            backgroundColor: 'var(--white-pink)',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1.5,
            px: 1,
          }}
        >
          <Typography
            variant="body1"
            component="h4"
            sx={{color: 'var(--light-black)'}}
          >
            {secAttr.title}
            {Object.keys(selected?.options)?.find(e => e == secAttr.id.toString()) || Object.keys(selected.options).find(e => secAttr.attributes.map(j => j.id.toString()).includes(e)) ? <i className={'selectedServiceIcon'}></i> : ''}
          </Typography>
          {/* {secAttr.pricePlus && */}
          {/*     <Box component="span" ml={0.5} sx={{fontWeight: '300', mr: '10px'}}> */}
          {/*       {`(به علاوه ${formatPrice(secAttr.pricePlus)} تومان)`} */}
          {/*     </Box> */}
          {/* } */}
          {secAttr.price > 0 &&
              <Box component="div" sx={{ display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Box component="div">
                      <Box component="span" sx={{ fontWeight: '800' }}>
                        {formatPrice(secAttr.price * (selected.isUrgent ? 1.5 : 1))}
                      </Box>
                      <Box component="span" ml={0.5} sx={{ fontWeight: '300' }}>
                          تومان
                      </Box>
                  </Box>
                {Object.keys(selected.options).includes(secAttr.id.toString()) && selected.isMulti ?
                  <div className="quantityButtom">
                    <i className={selected?.options[secAttr.id].count == 1 ? 'tableTrashIcon' : "tableCollapsIcon"} onClick={(e: any) => {
                      e.stopPropagation();
                      if (selected?.options[secAttr.id].count > 1) {
                        setSelected(prev => {
                          const cp = { ...prev };
                          cp.options[secAttr.id].count = Number(cp.options[secAttr.id].count) - 1;
                          return cp;
                        });
                      }else{
                        deleteAttribute(secAttr.id)
                      }
                    }}></i>
                    <input
                      type='number'
                      className="quantityNumber"
                      // disabled={secAttr.addOns.length > 0}
                      value={selected?.options[secAttr.id]?.count}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(input: any) => setSelected(prev => {
                        const cp = { ...prev }
                        cp.options[secAttr.id].count = input.target.value
                        return cp;
                      })}
                    />
                    <i className="tablePlusIcon" onClick={(e: any) => {
                      e.stopPropagation();
                      setSelected(prev => {
                        const cp = { ...prev };
                        cp.options[secAttr.id].count = Number(cp.options[secAttr.id].count) + 1;
                        return cp;
                      });
                    }}></i>

                  </div>

                  : ''}
              </Box>
          }
        </Box>
      ))}
      <button className='confirmButton order' onClick={toggleDrawer(false)}>
        ثبت
      </button>
    </>
  );
};

export default ServiceDrawer;
