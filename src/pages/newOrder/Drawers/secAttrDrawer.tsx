import { ArrowBack, Close } from '@mui/icons-material';
import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useDrawer } from '../../../components/layers/Drawer/DrawerContext';
import { useAppSelector } from '../../../services/redux/store';
import globalType from '../../../types/globalType';
import orderType from '../../../types/orderType';
import AddOnDrawer from '../Drawers/AddOnDrawer';
import InfoDrawer from '../Drawers/InfoDrawer';
import PickColorDrawer from '../Drawers/PickColorDrawer';
import ServiceDrawer from '../Drawers/ServiceDrawer';
import MediaDrawer from './MediaDrawer';

export default function SecAttrDrawer({
                                        parent,
                                        form,
                                        setForm,
                                        setIsNextStepAllowed
                                      }: any) {
  const colors = useAppSelector(state => state.globalReducer.colors);
  const services = useAppSelector(state => state.serviceReducer);
  const [shouldPickAddOns, setShouldPickAddOns] = useState(false);
  const [color, setColor] = useState('#fff');
  const [curParent, setCurParent] = useState(parent);
  const [pickingColor, setPickingColor] = useState<orderType.PickingColor>({
    attr: null,
    open: false,
  });
  const [page, setPage] = useState(1);
  const [pickMedia, setPickMedia] = useState<boolean>(false);
  const [currentAttribute, setCurrentAttriubte] = useState<globalType.Service>();
  const [selectedAddOn, setSelectedAddOn] = useState<globalType.Service>(null);
  const [infoModal, setInfoModal] = useState(false);
  const [selected, setSelected] = useState(form);
  const boxEl = useRef<Array<HTMLElement | null>>([]);

  const { closeDrawer } = useDrawer();

  const toggleDrawer = (newOpen: boolean) => () => {
    setPage(1);
    setCurParent(undefined);
    if (!newOpen) {
      closeDrawer();
    }
  };
  const handleClickCard = (index: number, secAttr: globalType.Service) => {
    setCurrentAttriubte(secAttr);
    if (secAttr.hasMedia) {
      setPickMedia(true);
    }
    if (secAttr.hasColor) {
      // PICK COLOR FIRST
      setPickingColor({
        attr: secAttr,
        open: true
      });
    } else {
      if (secAttr.attributes?.length > 0) {
        setCurParent(secAttr);
        setPage(prev => prev + 1);
      } else {
        if (secAttr.addOns.length > 0) {
          // if (Object.keys(selected.options).includes(secAttr.id.toString())) {
          //   console.log('me1');
          //   handleAddAttribute(secAttr, null);
          //   handleAddAttribute(secAttr?.addOns?.find(e => Object.keys(selected.options)?.includes(e.id.toString())), null);
          // } else {
          setShouldPickAddOns(true);
          // }
        } else {
          handleAddAttribute(secAttr, null);
        }
      }
      // NO COLOR - ADD TO ATTRIBUTES
    }
  };
  const handleAddAttribute = (secAttr: globalType.Service | null, color: string | null, isAddOn = false) => {
    if (!secAttr) return;
    const newAttr = { ...secAttr };
    if (color) newAttr.color = color;
    if (!selected.isMulti && !isAddOn && !Object.keys(selected.options)?.find(e => e == newAttr.id.toString()) && !(curParent || parent).isMulti && Object.keys(selected.options).find(e => services.allServices.find(j => e == j.id.toString()).parent.id == (curParent || parent).id)) {
      toast(`انتخاب بیش از یک خدمت در ${(curParent || parent).title} مجاز نمی باشد`, { type: 'error' });
      return;
    }
    if (Object.keys(selected.options).includes(secAttr.id.toString())) {
      setSelected((prev: globalType.Form) => {
        const cp = { ...prev };

        delete cp.options[newAttr.id];

        return cp;
      });
      return;
    }
    setCurParent(undefined);
    setIsNextStepAllowed(true);
    setSelected((prev: globalType.Form) => {
      const cp = { ...prev };
      cp.options[newAttr.id] = {
        count: 1
      };
      return cp;
    });
    // if (!color) {
    //   setSelected(prev => {
    //     const cp = { ...prev };
    //     cp.options[newAttr.id] = {
    //       colors: [],
    //       media: undefined,
    //       pinterest: '',
    //       count: 1
    //     };
    //     return cp;
    //   });
    // }

    setPickingColor({
      attr: null,
      open: false
    });
  };

  const deleteAttribute = (attrId: number) => {
    setSelected((prev: globalType.Form) => {
      const cp = { ...prev };
      if (cp.options[attrId]) {
        delete cp.options[attrId];
      }
      return cp;
    });
    setSelected((prev: globalType.Form) => {
      return {
        ...prev,
        attributes: prev.attributes?.filter(e => e.id != attrId)
      };
    });
  };

  const content = () => {
    if (pickingColor.open) {
      return <PickColorDrawer colors={colors} color={color} selected={selected} setSelected={setSelected} currentAttribute={currentAttribute} pickingColor={pickingColor} setPickingColor={setPickingColor}
                              handleAddAttribute={handleAddAttribute}/>;
    } else if (shouldPickAddOns) {
      return <AddOnDrawer setSelected={setSelected} selected={selected} parent={curParent || parent} currentAttribute={currentAttribute} setShouldPickAddOns={setShouldPickAddOns} setPickingColor={setPickingColor}/>;
    } else {
      return <ServiceDrawer curParent={curParent} parent={parent} selected={selected} setSelected={setSelected} handleClickCard={handleClickCard} deleteAttribute={deleteAttribute} toggleDrawer={toggleDrawer}
                            boxEl={boxEl}/>;
    }
  };

  const handleCloseDrawer = () => {
    setCurParent(undefined);
    setPage(1);
    setShouldPickAddOns(false);
    setPickingColor({
      attr: null,
      open: false
    });

    closeDrawer();
  };

  useEffect(() => {
    setSelectedAddOn(currentAttribute?.addOns?.find(e => Object.keys(selected.options)?.includes(e.id.toString())));
  }, [currentAttribute]);

  useEffect(() => {
    setForm(selected);
  }, [selected]);

  if (selected && (curParent || parent)) {
    return (
      <>
        <Box
          display="flex"
          flexDirection="column"
          gap={0.75}
          p={2}
          overflow="auto"
          className="attr-drawer-content"
          sx={{ paddingBottom: '65px' }}
        >
          <Box sx={{
            display: 'flex',
            position: 'absolute',
            right: 24,
            alignItems: 'center',
            gap: 2
          }}>
              <span className="moreInfo" onClick={() => setInfoModal(true)}>
                <span>توضیحات</span>
                <i className="infoIcon"></i>
              </span>
            {page > 1 && <ArrowBack onClick={() => {
              setPage(prev => prev - 1);
              setCurParent(prev => services.allServices.find(e => e.id == prev.parent?.id));
            }}/>}
            {shouldPickAddOns && <ArrowBack onClick={() => {
              setSelectedAddOn(null);
              setShouldPickAddOns(false);
            }}/>}
            <Close onClick={handleCloseDrawer}/>
          </Box>
          {content()}
        </Box>
        <InfoDrawer infoModal={infoModal} setInfoModal={setInfoModal} curParent={curParent} parent={parent}/>
        <MediaDrawer pickMedia={pickMedia} setPickMedia={setPickMedia} selected={selected} setSelected={setSelected} currentAttribute={currentAttribute}/>
      </>
    );
  } else return <></>;
}
