import {East} from '@mui/icons-material';
import {Box, Button, TextField, Typography, FormControl} from '@mui/material';
import {useForm, Controller} from 'react-hook-form';
import {Link} from 'react-router-dom';

export default function NewService() {
  const {register, handleSubmit, reset, control, setValue} = useForm();
  // @ts-ignore
  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append('file', data.file[0]);
    // ...
  };
  return (
    <Box
      component="main"
      paddingY={3}
      paddingX={1.5}
      display="flex"
      flexDirection="column"
      gap={3}
    >
      <Link to="..">
        <East fontSize="medium" color="action" />
      </Link>
      <Typography variant="h5" component="h1">
        افزودن خدمت جدید
      </Typography>
      <FormControl
        onSubmit={handleSubmit(onSubmit)}
        sx={{display: 'flex', flexDirection: 'column', gap: 3}}
      >
        <Controller
          name="title"
          control={control}
          render={({field: {onChange, value = ''}, fieldState: {error}, formState}) => (
            <TextField
              helperText={error ? error.message : null}
              size="small"
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth
              label="عنوان"
              variant="outlined"
            />
          )}
        />
        <Box display="flex" flexDirection="column" gap={1}>
          <label htmlFor="file">آپلود تصویر</label>
          <input id="file" type="file" {...register('file')} />
        </Box>

        <Box display="flex" flexDirection="column" gap={1}>
          <Button variant="contained" color="success" type="submit" fullWidth>
            افزودن
          </Button>
          <Button variant="outlined" color="error" type="reset" fullWidth>
            بیخیال
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
}
