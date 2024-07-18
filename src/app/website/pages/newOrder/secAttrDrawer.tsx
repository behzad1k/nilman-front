import { attributes } from 'js-cookie';
import React, {useEffect, useRef, useState} from 'react';
import {Global} from '@emotion/react';
import { toast } from 'react-toastify';
import { Modal, TextInput } from '../../../../components';
import { services } from '../../../../services/redux/reducers/serviceSlice.ts';
import { useAppSelector } from '../../../../services/redux/store.ts';
import { formatPrice } from '../../../../utils/utils.ts';
import {Selected} from './newOrder';
import {IService} from '../../../../services/types';
import { Button, Box, Skeleton, Typography, SwipeableDrawer, TextField } from '@mui/material';
import {HexColorPicker} from 'react-colorful';
import { ArrowBack, Close } from '@mui/icons-material';

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  parent: IService;
  selected: Selected;
  setSelected: (value: (prev: Selected) => Selected) => void;
  setIsNextStepAllowed: any
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
  setIsNextStepAllowed
}: Props) {
  const colors = useAppSelector(state => state.globalReducer.colors)
  const services = useAppSelector(state => state.serviceReducer);
  const [color, setColor] = useState('#fff');
  const [curParent, setCurParent] = useState(parent)
  const [pickingColor, setPickingColor] = useState<PickingColor>({
    attr: null,
    open: false,
  });
  const [page, setPage] = useState(1);
  const [pickMedia, setPickMedia] = useState<boolean>(false);
  const [currentAttribute, setCurrentAttriubte] = useState<IService>();
  const [infoModal, setInfoModal] = useState(false);
  const [media, setMedia] = useState({
    preview: null,
    data: null
  });
  const boxEl = useRef<Array<HTMLElement | null>>([]);
  const toggleDrawer = (newOpen: boolean) => () => {
    const cond = curParent?.attributes?.some((secAttr) =>
      selected.attributes.includes(secAttr),
    );
    setPage(1);
    setCurParent(undefined)
    // if (!cond) return;
    setOpen(newOpen);
  };
  const handleClickCard = (index: number, secAttr: IService) => {
    setCurrentAttriubte(secAttr)
    if(secAttr.hasMedia) {
      setPickMedia(true)
    }
    if (secAttr.hasColor) {
      // PICK COLOR FIRST
      setPickingColor({attr: secAttr, open: true});
    } else {
      if (secAttr.attributes?.length > 0){
        setCurParent(secAttr);
        setPage(prev => prev + 1)
      }else {
        handleAddAttribute(secAttr, null);
      }
      // NO COLOR - ADD TO ATTRIBUTES
    }
  };

  const handleAddAttribute = (secAttr: IService | null, color: string | null) => {
    if (!secAttr) return;
    const newAttr = {...secAttr};
    if (color) newAttr.color = color;
    if (!selected.attributes?.find(e => e.id == newAttr.id) && !(curParent || parent).isMulti && selected.attributes.find(e => e.parent?.id == (curParent || parent).id)){
      toast(`انتخاب بیش از یک خدمت در ${(curParent || parent).title} مجاز نمی باشد`, {type: 'error'})
      return;
    }
    // setCurParent(undefined)
    setIsNextStepAllowed(true)
    setSelected((prev: Selected) => {
      return {...prev, attributes: prev.attributes?.find(e => e.id == newAttr.id) ? prev.attributes?.filter(e => e.id != newAttr.id) : [...prev.attributes, newAttr] };
    });
    if (!color) {
      setSelected(prev => {
        const cp = { ...prev };
        if (cp.options[newAttr.id]) {
          delete cp.options[newAttr.id];
        } else {
          cp.options[newAttr.id] = {
            colors: [],
            media: undefined,
            pinterest: ''
          };
        }
        return cp;
      });
    }


    setPickingColor({attr: null, open: false});
  };
  const handleCloseDrawer = () => {
    setOpen(false)
    setPickingColor({attr: null, open: false})
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
          // disableSwipeToOpen={false}
          ModalProps={{
            // keepMounted: true,
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap={0.75}
            p={2}
            overflow="auto"
            className="attr-drawer-content"
            sx={{ paddingBottom: '65px'}}
          >
            <Box sx={{ display: 'flex', position: 'absolute', right: 24, alignItems: 'center', gap: 2}}>
              <span className='moreInfo' onClick={() => setInfoModal(true)}>
                <span>توضیحات</span>
                <i className='infoIcon'></i>
              </span>
              {page > 1 && <ArrowBack onClick={() => {
                setPage(prev => prev - 1);
                setCurParent(prev => services.allServices.find(e => e.id == prev.parent?.id));
              }} />}
              <Close onClick={handleCloseDrawer} />
            </Box>
            {pickingColor.open ? (
              <Box display="flex" flexDirection="column" alignItems="center" padding='0 10px' gap={2}>
                <p className='marginLeftAuto'> انتخاب رنگ</p>
                <div className='colorContainer'>
                  {colors.map((color) =>
                    <div className={`colorRow ${selected.options[pickingColor.attr.slug]?.colors?.includes(color.slug) ? 'selected' : ''}`} key={color.slug} onClick={() => setSelected(prev => {
                      const cp = {...prev}

                      if (!cp.options[currentAttribute?.id]){
                        cp.options[currentAttribute?.id] = {
                          colors: [],
                          media: undefined,
                          pinterest: ''
                        }
                      }

                      cp.options[currentAttribute?.id].colors = cp.options[currentAttribute?.id].colors?.includes(color.slug) ? cp.options[currentAttribute?.id].colors.filter(e => color.slug != e) : [...cp.options[currentAttribute?.id].colors, color.slug]
                      if (cp.options[currentAttribute?.id].colors?.length == 0){
                        delete cp.options[currentAttribute?.id]
                      }

                      return cp;
                    })}>
                      <span>
                        {color.title}
                        {selected.options[currentAttribute?.id]?.colors?.includes(color.slug) ? <i className={'selectedServiceIcon'}></i> : ''}
                      </span>
                      <span className='colorSpan' style={{ backgroundColor: color.code}}></span>
                    </div>
                  )}
                </div>
                <Box display="flex" width="100%" gap={2}>
                  <Button
                    size="large"
                    sx={{flex: 1, backgroundColor: '#4b794b', color: '#FFF'}}
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
                  >بازگشت</Button>
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
                {[...(curParent || parent)?.attributes]?.sort((a, b) => (a?.sort || 1000) - (b?.sort || 1000)).map((secAttr, index) => (
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
                      sx={{color: 'var(--light-black)', mr: 'auto'}}
                    >
                      {secAttr.title}
                      {selected?.attributes?.find(e => e.id == secAttr.id) || selected.attributes.find(e => secAttr.attributes.map(j => j.id).includes(e.id)) ? <i className={'selectedServiceIcon'}></i> : ''}
                    </Typography>
                    {/* {secAttr.pricePlus && */}
                    {/*     <Box component="span" ml={0.5} sx={{fontWeight: '300', mr: '10px'}}> */}
                    {/*       {`(به علاوه ${formatPrice(secAttr.pricePlus)} تومان)`} */}
                    {/*     </Box> */}
                    {/* } */}
                      <Box component="span" sx={{fontWeight: '800'}}>
                        {formatPrice(secAttr.price * (selected.isUrgent ? 2 : 1))}
                      </Box>
                      <Box component="span" ml={0.5} sx={{fontWeight: '300'}}>
                        تومان
                      </Box>
                  </Box>
                ))}
              </>
            )}
            {!pickingColor.open &&
                <button className='confirmButton order' onClick={() => setOpen(false)}>
                    ثبت
                </button>
            }

          </Box>
        </SwipeableDrawer>
        <Modal open={infoModal} setOpen={setInfoModal}>
          <i className="close-button" onClick={() => setInfoModal(false)}></i>
          <p className='fontWeight400 marginBottom10'>توضیحات {(curParent || parent).title}</p>
          <section className='infoModal'>
            {[...(curParent || parent).attributes]?.sort((a, b) => (a?.sort || 1000) - (b?.sort || 1000)).map((attribute, index) =>
            <div className='infoRow'>
              <span className='fontWeight400'>{attribute.title}</span>
              <span className='infoModalDesc'>{attribute.description}</span>
            </div>
            )}
          </section>
        </Modal>
        <Modal open={pickMedia} setOpen={setPickMedia}>
          <i className="close-button" onClick={() => setPickMedia(false)}></i>
          <p className='fontWeight400 marginBottom10'>اگر طرح خاصی برای خدمت انتخابی خود در نظر دارید عکس آن را در اینجا بارگزاری نمایید و یا لینک پینترست آن را وارد کنید</p>
          <section className='infoModal mediaModal'>
            <TextField
              size="medium"
              onChange={(input) => setSelected(prev => {
                const cp = {...prev}

                if (!cp.options[currentAttribute?.id]){
                  cp.options[currentAttribute?.id] = {
                    colors: [],
                    media: undefined,
                    pinterest: ''
                  }
                }

                cp.options[currentAttribute?.id].pinterest = input.target.value

                return cp;
              })}
              value={selected?.options[currentAttribute?.id]?.pinterest}
              fullWidth
              label={<span className='pinterestLogo'><i></i>Pinterest</span>}
              variant="outlined"
            />
            <label htmlFor='uploadPhoto' className='uploadPhotoButton'><i></i>بارگزاری تصویر</label>
            <input type='file' id='uploadPhoto' className='displayNone' onChange={(input) => setSelected(prev => {
              const cp = {...prev}

              if (!cp.options[currentAttribute?.id]){
                cp.options[currentAttribute?.id] = {
                  colors: [],
                  media: undefined,
                  pinterest: ''
                }
              }

              cp.options[currentAttribute?.id].media = {
                data: input.target.files[0],
                preview: URL.createObjectURL(input.target.files[0]),
              }

              return cp;
            })}/>
            {selected?.options[currentAttribute?.id]?.media?.preview && <img src={selected.options[currentAttribute?.id]?.media?.preview} />}
          </section>
          <Box display="flex" width="100%" gap={2}>
            <Button
              size="large"
              sx={{flex: 1, backgroundColor: '#4b794b', color: '#FFF'}}
              variant="contained"
              onClick={() => setPickMedia(false)}
            >
              تایید
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="secondary"
              onClick={() => setPickMedia(false)}
            >بازگشت</Button>
          </Box>
        </Modal>
      </>
    );
  } else return null;
}
