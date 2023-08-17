import {Box, Button, Typography} from '@mui/material';
import {useForm, FieldValues} from 'react-hook-form';
import TextInput from '../../components/textInput';

// type Data = {
//   title: string;
//   file: FileList;
// };

export default function NewService() {
  const {register, handleSubmit, control} = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    const formData = new FormData();
    formData.append('file', data.file[0]);
    // ...
  };
  return (
    <>
      <Typography variant="h5" component="h1">
        افزودن خدمت جدید
      </Typography>
      <Box
        component="form"
        sx={{display: 'flex', flexDirection: 'column', gap: 3}}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput name="title" label="عنوان" control={control} defaultValue="" />
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
      </Box>
    </>
  );
}
