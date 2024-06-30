import { attributes } from 'js-cookie';
import React, {useEffect, useRef, useState} from 'react';
import {Global} from '@emotion/react';
import { Modal } from '../../../../components';
import { services } from '../../../../services/redux/reducers/serviceSlice.ts';
import { useAppSelector } from '../../../../services/redux/store.ts';
import { formatPrice } from '../../../../utils/utils.ts';
import {Selected} from './newOrder';
import {IService} from '../../../../services/types';
import {Button, Box, Skeleton, Typography, SwipeableDrawer} from '@mui/material';
import {HexColorPicker} from 'react-colorful';
import { ArrowBack, Close } from '@mui/icons-material';

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  parent: IService;
  selected: Selected;
  setSelected: (value: (prev: Selected) => Selected) => void;
};

type PickingColor = {
  attr: null | IService;
  open: boolean;
};

export default function SecAttrDrawer({
  open,
  setOpen,
  parent,
  selected,
  setSelected,
}: Props) {
  const colors = useAppSelector(state => state.globalReducer.colors)
  const [color, setColor] = useState('#fff');
  const [selectedColors, setSelectedColors] = useState([]);
  const [curParent, setCurParent] = useState(parent)
  const [pickingColor, setPickingColor] = useState<PickingColor>({
    attr: null,
    open: false,
  });
  const [infoModal, setInfoModal] = useState(false);
  const boxEl = useRef<Array<HTMLElement | null>>([]);
  const toggleDrawer = (newOpen: boolean) => () => {
    const cond = curParent?.attributes?.some((secAttr) =>
      selected.attributes.includes(secAttr),
    );
    if (!cond) return;
    setOpen(newOpen);
  };
  const handleClickCard = (index: number, secAttr: IService) => {
    boxEl.current.map((el, i) =>
      index === i && el?.classList.add('selected')
    )

    if (secAttr.hasColor) {
      // PICK COLOR FIRST
      setPickingColor({attr: secAttr, open: true});
    } else {
      if (secAttr.attributes?.length > 0){
        setCurParent(secAttr);
      }
      // NO COLOR - ADD TO ATTRIBUTES
      handleAddAttribute(secAttr, null);
    }
  };

  const handleAddAttribute = (secAttr: IService | null, color: string | null) => {
    if (!secAttr) return;
    const newAttr = {...secAttr};
    if (color) newAttr.color = color;
    setSelected((prev: Selected) => {
      return {...prev, attributes: prev.attributes?.find(e => e.id == newAttr.id) ? prev.attributes?.filter(e => e.id != newAttr.id) : [...prev.attributes, newAttr] };
    });

    setPickingColor({attr: null, open: false});
  };
  const handleCloseDrawer = () => {
    setOpen(false)
    
  }
  if (curParent || parent) {
    return (
      <>
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: 'max-content',
              overflow: 'visible',
              minHeight: `60vh`,
              background: '#FFF',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }}
        />
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap={0.75}
            p={2}
            overflow="auto"
            className="attr-drawer-content"
          >
            <Box sx={{ display: 'flex', position: 'absolute', right: 24, alignItems: 'center', gap: 2}}>
              <span className='moreInfo' onClick={() => setInfoModal(true)}>
                <span>توضیحات</span>
                <i className='infoIcon'></i>
              </span>
              <Close onClick={handleCloseDrawer} />
            </Box>
            {pickingColor.open ? (
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <div className='colorContainer'>
                  <p> انتخاب رنگ</p>
                  {colors.map((color) =>
                    <div className={`colorRow ${selectedColors.includes(color.slug) ? 'selected' : ''}`} key={color.slug} onClick={() => setSelectedColors(prev => prev.includes(color.slug) ? prev.filter(e => e != color.slug) : [...prev, color.slug])}>
                      <span>
                        {color.title}
                        {selectedColors.includes(color.slug) ? <i className={'selectedServiceIcon'}></i> : ''}
                      </span>
                      <span className='colorSpan' style={{ backgroundColor: color.code}}></span>
                    </div>
                  )}
                </div>
                <Box display="flex" width="100%" gap={2}>
                  <Button
                    size="large"
                    sx={{flex: 1}}
                    variant="contained"
                    onClick={() => handleAddAttribute(pickingColor.attr, color)}
                  >
                    تایید
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    color="secondary"
                    onClick={() => setPickingColor({attr: null, open: false})}
                  >
                    تغییر سرویس
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="body1" component="h3" mb={1}>
                    {(curParent || parent)?.title}
                  </Typography>
                </Box>
                <Typography variant="caption" component="p" mb={1}>
                  یک یا چند مورد را انتخاب کنید
                </Typography>
                {(curParent || parent)?.attributes?.map((secAttr, index) => (
                  <Box
                    key={secAttr.slug}
                    className={`attr-box ${
                      selected?.attributes?.find(e => e.id == secAttr.id) ? 'selected' : ''
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
                      {selected?.attributes?.find(e => e.id == secAttr.id) ? <i className={'selectedServiceIcon'}></i> : ''}
                    </Typography>
                      <Box component="span" sx={{fontWeight: '800', ml: 'auto'}}>
                        {formatPrice(secAttr.price)}
                      </Box>
                      <Box component="span" ml={0.5} sx={{fontWeight: '300'}}>
                        تومان
                      </Box>
                  </Box>
                ))}
              </>
            )}
            <button className='confirmButton order' onClick={() => setOpen(false)}>
              ثبت
            </button>
          </Box>
        </SwipeableDrawer>
        <Modal open={infoModal} setOpen={setInfoModal}>
          <i className="close-button" onClick={() => setInfoModal(false)}></i>
          <p className='fontWeight400 marginBottom10'>توضیحات {(curParent || parent).title}</p>
          <section className='infoModal'>
            {(curParent || parent).attributes.map((attribute, index) =>
            <div className='infoRow'>
              <span className='fontWeight400'>{attribute.title}</span>
              <span>{attribute.description}</span>
            </div>
            )}
          </section>
        </Modal>
      </>
    );
  } else return null;
}
