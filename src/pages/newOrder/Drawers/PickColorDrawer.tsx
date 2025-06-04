import { Box, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const PickColorDrawer = ({
                           colors,
                           selected,
                           setSelected,
                           currentAttribute,
                           pickingColor,
                           setPickingColor,
                           handleAddAttribute,
                           color
                         }) => {

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding="0 10px" gap={2}>
      <p className="marginLeftAuto"> انتخاب رنگ</p>
      <div className="colorContainer">
        {colors.map((color) =>
          <div className={`colorRow ${selected.options[currentAttribute?.id]?.colors?.includes(color.slug) ? 'selected' : ''}`} key={color.slug} onClick={() => setSelected(prev => {
            const cp = { ...prev };

            if (!cp.options[currentAttribute?.id]) {
              cp.options[currentAttribute?.id] = {};
            }
            if (!cp.options[currentAttribute?.id]?.colors) {
              cp.options[currentAttribute?.id].colors = [];
            }

            if (cp.options[currentAttribute?.id].colors?.includes(color.slug)){
              cp.options[currentAttribute?.id].colors = cp.options[currentAttribute?.id].colors.filter(e => color.slug != e)
            } else {
              if (selected.options[currentAttribute?.id]?.colors?.length > 3) {
                cp.options[currentAttribute?.id].colors = cp.options[currentAttribute?.id].colors.filter((e, index) => index != 0);
              }
              cp.options[currentAttribute?.id].colors = [...cp.options[currentAttribute?.id].colors, color.slug]

            }

            return cp;
          })}>
            <span>
              {color.title}
              {selected.options[currentAttribute?.id]?.colors?.includes(color.slug) ? <i className={'selectedServiceIcon'}></i> : ''}
            </span>
            <span className="colorSpan" style={{ backgroundColor: color.code }}></span>
          </div>
        )}
      </div>
      <Box display="flex" width="100%" gap={2}>
        <Button
          size="large"
          sx={{
            flex: 1,
            backgroundColor: '#4b794b',
            color: '#FFF'
          }}
          variant="contained"
          onClick={() => {
            if (Array.isArray(selected.options[currentAttribute?.id]?.colors)) {
              if (selected.options[currentAttribute?.id].colors.length > 0) {
                setPickingColor({
                  attr: null,
                  open: false
                });
                return;
              }
            }
            toast('لطفا حداقل یک رنگ را انتخاب کنید', { type: 'error' });
          }}
        >
          تایید
        </Button>
        <Button
          variant="outlined"
          size="large"
          color="secondary"
          onClick={() => setPickingColor({
            attr: null,
            open: false
          })}
        >بازگشت</Button>
      </Box>
    </Box>
  );
};

export default PickColorDrawer;
