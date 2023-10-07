

import {useRef, useState} from 'react';
import { Global } from '@emotion/react';
import {Selected} from './newOrder';
import {IService} from '../../../../services/types';
import { Button, Box, Skeleton, Typography, SwipeableDrawer } from '@mui/material'

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  parentId: number | null;
  selected: Selected;
  setSelected: (value: (prev: Selected) => Selected) => void;
}

export default function SecAttrDrawer({open, setOpen, parentId, selected, setSelected}: Props) {
  const boxEl = useRef<Array<HTMLElement | null>>([]);

  const toggleDrawer = (newOpen: boolean) => () => {
    const cond = curParent?.attributes?.some((secAttr) => selected.attributes.includes(secAttr))
    if (!cond) return;
    setOpen(newOpen);
  };

  const handleClickCard = (index: number, secAttr: IService) => {
    if (selected.attributes.includes(secAttr)) {
      // Remove from Selected
      setSelected((prev: Selected) => {
        const newSelectedAttrs = prev.attributes.filter(
          (selected) => selected.slug !== secAttr.slug,
        );
        return {...prev, attributes: newSelectedAttrs};
      });
    } else {
      // Add to selected
      setSelected((prev: Selected) => ({
        ...prev,
        attributes: [...prev.attributes, secAttr],
      }));
    }
    boxEl.current[index]?.classList.toggle('selected')
  }

  const curParent = selected.service?.attributes?.filter((attribute) => attribute.id === parentId)[0];

  if (curParent) {
    return (
      <>
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: '100%',
              overflow: 'visible',
              maxHeight: `calc(100% - 140px)`
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
          <Box display='flex' flexDirection='column' gap={0.75} p={2} overflow='auto' className='attr-drawer-content'>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
              <Typography variant='body1' component='h3' mb={1}>{curParent.title}</Typography>
              <Button onClick={toggleDrawer(false)} variant='contained' sx={{backgroundColor: 'var(--light-pink)', color: 'var(--light-black)'}}>ادامه</Button>
            </Box>
            <Typography variant='caption' component='p' mb={1}>یک یا چند مورد را انتخاب کنید</Typography>
            {curParent?.attributes?.map((secAttr, index) => (
              <Box key={secAttr.slug} className={`attr-box ${selected.attributes.includes(secAttr) ? 'selected' : null}`} ref={(el: HTMLElement) => (boxEl.current[index] = el)} onClick={() => handleClickCard(index, secAttr)} sx={{backgroundColor: 'var(--white-pink)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, px: 1}}>
                <Typography variant='body1' component='h4' sx={{color: 'var(--light-black)'}}>{secAttr.title}</Typography>
                <Box component='span' sx={{fontWeight: '800', ml: 'auto'}}>{secAttr.price}</Box>
                <Box component='span' ml={0.5} sx={{fontWeight: '300'}}>هزارتومان</Box>
              </Box>
            ))}
          </Box>
        </SwipeableDrawer>
      </>
    );
  } else return null
}
