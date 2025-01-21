import { Box, Typography } from '@mui/material';
import React from 'react';
import { formatPrice } from '../../../utils/utils';

const AddOnDrawer = ({
                       parent,
                       currentAttribute,
                       selected,
                       setShouldPickAddOns,
                       setSelected,
                     }) => {

    return (
      <>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body1" component="h3" mb={1}>
            {parent?.title}
          </Typography>
        </Box>
        <Typography variant="caption" component="p" mb={1}>
          برای ثبت خدمت {currentAttribute?.title} باید یکی از خدمات زیر را نیز انتخاب کنید
        </Typography>
        {[...currentAttribute?.addOns]?.sort((a, b) => (a?.sort || 1000) - (b?.sort || 1000))?.map((secAttr, index) => (
          <Box
            key={secAttr.slug}
            className={`attr-box`}
            onClick={() => {
              setSelected(prev => {
                  const cp = { ...prev };
                  if (!cp.options[currentAttribute.id]) {
                    cp.options[currentAttribute.id] = {};

                    cp.options[currentAttribute.id].count = 1;
                    cp.options[currentAttribute.id].addOns = {};
                    cp.options[currentAttribute.id].addOns[secAttr.id] = { count: 1 };
                  } else {
                    if (!selected.isMulti && Object.keys(cp.options[currentAttribute.id].addOns).length > 0) {
                      cp.options[currentAttribute.id].addOns = {};
                      cp.options[currentAttribute.id].addOns[secAttr.id] = { count: 1 };
                    } else {
                      cp.options[currentAttribute.id].count += 1;
                      if (Object.keys(cp.options[currentAttribute.id].addOns).find(e => e == secAttr.id) && selected.isMulti) {
                        cp.options[currentAttribute.id].addOns[secAttr.id].count += 1;
                      } else {
                        cp.options[currentAttribute.id].addOns[secAttr.id] = {};
                        cp.options[currentAttribute.id].addOns[secAttr.id].count = 1;
                      }
                    }
                  }
                  return cp;
                }
              );
            }
            }
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
              sx={{
                color: 'var(--light-black)',
                mr: 'auto'
              }}
            >
              {secAttr.title}
              {selected.options[currentAttribute.id] && Object.keys(selected.options[currentAttribute.id].addOns)?.find(e => e == secAttr.id.toString()) || Object.keys(selected.options).find(e => secAttr.attributes?.map(j => j.id.toString())?.includes(e)) ?
                <i className={'selectedServiceIcon'}></i> : ''}
            </Typography>
            <Box component="div" sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Box component="div">
                <Box component="span" sx={{ fontWeight: '800' }}>
                  {formatPrice((selected.options[currentAttribute.id] ? selected.options[currentAttribute.id]?.addOns[secAttr.id]?.count || 1 : 1) * secAttr.price * (selected.isUrgent ? 1.5 : 1))}
                </Box>
                <Box component="span" ml={0.5} sx={{ fontWeight: '300' }}>
                  تومان
                </Box>
              </Box>
              {
                Object.keys(selected.options[currentAttribute.id]?.addOns || {})?.find(e => e == secAttr.id) && selected.isMulti ?
                  <div className="quantityButtom">
                    <i className={selected?.options[currentAttribute.id].addOns[secAttr.id]?.count == 1 ? 'tableTrashIcon' : 'tableCollapsIcon'} onClick={(e: any) => {
                      e.stopPropagation();
                      if (selected.options[currentAttribute.id].addOns[secAttr.id]?.count > 1) {
                        setSelected(prev => {
                          const cp = { ...prev };
                          cp.options[currentAttribute.id].addOns[secAttr.id].count = Number(cp.options[currentAttribute.id].addOns[secAttr.id].count) - 1;
                          return cp;
                        });
                      } else {
                        setSelected(prev => {
                          const cp = { ...prev };
                          delete cp.options[currentAttribute.id].addOns[secAttr.id];
                          return cp;
                        });
                      }
                    }}></i>
                    <input
                      type="number"
                      className="quantityNumber"
                      value={selected.options[currentAttribute.id].addOns[secAttr.id].count}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(input: any) => setSelected(prev => {
                        const cp = { ...prev };
                        cp.options[currentAttribute.id].addOns[secAttr.id].count = input.target.value;
                        return cp;
                      })}
                    />
                    <i className="tablePlusIcon" onClick={(e: any) => {
                      e.stopPropagation();
                      setSelected(prev => {
                        const cp = { ...prev };
                        cp.options[currentAttribute.id].addOns[secAttr.id].count = Number(cp.options[currentAttribute.id].addOns[secAttr.id].count) + 1;
                        return cp;
                      });
                    }}></i>
                  </div>
                  : ''
              }
            </Box>
          </Box>
        ))
        };
        <button className="confirmButton order" onClick={() => {
          setShouldPickAddOns(false);
          // if (selectedAddOn.hasColor) {
          //   // PICK COLOR FIRST
          //   setPickingColor({
          //     attr: selectedAddOn,
          //     open: true
          //   });
          // }
        }}>
          ثبت
        </button>;
      </>
    )
      ;
  }
;

export default AddOnDrawer;
