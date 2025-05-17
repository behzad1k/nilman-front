import { Box, Button, SwipeableDrawer, TextField } from '@mui/material';
import React from 'react';

const MediaDrawer = ({ pickMedia, setPickMedia, selected, setSelected, currentAttribute }) => {
  return (
    <SwipeableDrawer
      anchor="bottom"
      onClose={() => setPickMedia(false)}
      onOpen={() => setPickMedia(true)}
      open={pickMedia}
      sx={{
        zIndex: 1301
      }}
    >
      <section className='infoModal mediaModal'>
        <p className='fontWeight400 marginBottom10'>اگر طرح خاصی برای خدمت انتخابی خود در نظر دارید عکس آن را در اینجا بارگزاری نمایید و یا لینک پینترست آن را وارد کنید</p>

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
        {<img className='previewImage' src={selected?.options[currentAttribute?.id]?.media?.preview ? selected.options[currentAttribute?.id]?.media?.preview : '/img/placeholder400.png'} />}
        <Box width="100%">
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
        </Box>
      </section>

    </SwipeableDrawer>
  );
};

export default MediaDrawer;
