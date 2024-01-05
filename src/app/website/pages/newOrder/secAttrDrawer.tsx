import {useEffect, useRef, useState} from 'react';
import {Global} from '@emotion/react';
import {Selected} from './newOrder';
import {IService} from '../../../../services/types';
import {Button, Box, Skeleton, Typography, SwipeableDrawer} from '@mui/material';
import {HexColorPicker} from 'react-colorful';
import { Close } from '@mui/icons-material';

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  parentId: number | null;
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
  parentId,
  selected,
  setSelected,
}: Props) {
  const [color, setColor] = useState('#fff');
  const [pickingColor, setPickingColor] = useState<PickingColor>({
    attr: null,
    open: false,
  });
  const boxEl = useRef<Array<HTMLElement | null>>([]);

  const curParent = selected.service?.attributes?.filter(
    (attribute) => attribute.id === parentId,
  )[0];

  const toggleDrawer = (newOpen: boolean) => () => {
    const cond = curParent?.attributes?.some((secAttr) =>
      selected.attributes.includes(secAttr),
    );
    console.log('cond', cond);
    if (!cond) return;
    setOpen(newOpen);
  };

  const handleClickCard = (index: number, secAttr: IService) => {
    boxEl.current.map((el, i) =>
      index === i ? el?.classList.add('selected') : el?.classList.remove('selected'),
    );

    if (secAttr.hasColor) {
      // PICK COLOR FIRST
      setPickingColor({attr: secAttr, open: true});
    } else {
      // NO COLOR - ADD TO ATTRIBUTES
      handleAddAttribute(secAttr, null);
    }
  };

  const handleAddAttribute = (secAttr: IService | null, color: string | null) => {
    if (!secAttr) return;
    const newAttr = {...secAttr};
    if (color) newAttr.color = color;

    setSelected((prev: Selected) => {
      const newSelectedAttrs = prev.attributes.filter((selected) => {
        return (
          curParent?.attributes?.findIndex(
            (curSecAttr) => curSecAttr.slug === selected.slug,
          ) === -1
        );
      });

      return {...prev, attributes: [...newSelectedAttrs, newAttr]};
    });

    setOpen(false);
    setPickingColor({attr: null, open: false});
  };

  const handlePrevStep = () => {
    setPickingColor({attr: null, open: false});
  };

  const handleCloseDrawer = () => {
    setOpen(false)
    
  }

  if (curParent) {
    return (
      <>
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: 'max-content',
              overflow: 'visible',
              minHeight: `60vh`,
              background:
                'linear-gradient(360deg, rgba(252, 197, 218, 1), rgba(252, 228, 198, 1))',
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
            <Box sx={{position: 'absolute', right: 14}}>
              <Close onClick={handleCloseDrawer} />
            </Box>
            {pickingColor.open ? (
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <HexColorPicker
                  style={{width: '100%'}}
                  color={color}
                  onChange={setColor}
                />
                <Box sx={{width: '50%', height: 40, backgroundColor: color, mb: 2}}></Box>
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
                    onClick={handlePrevStep}
                  >
                    تغییر سرویس
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="body1" component="h3" mb={1}>
                    {curParent.title}
                  </Typography>
                </Box>
                <Typography variant="caption" component="p" mb={1}>
                  یک یا چند مورد را انتخاب کنید
                </Typography>
                {curParent?.attributes?.map((secAttr, index) => (
                  <Box
                    key={secAttr.slug}
                    className={`attr-box ${
                      selected.attributes.includes(secAttr) ? 'selected' : null
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
                    </Typography>
                    <Box component="span" sx={{fontWeight: '800', ml: 'auto'}}>
                      {secAttr.price}
                    </Box>
                    <Box component="span" ml={0.5} sx={{fontWeight: '300'}}>
                      هزارتومان
                    </Box>
                  </Box>
                ))}
              </>
            )}
          </Box>
        </SwipeableDrawer>
      </>
    );
  } else return null;
}
