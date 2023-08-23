import {Icon} from '@phosphor-icons/react';
import {Box, Typography} from '@mui/material';

export default function OrderItem({Icon, value}: {Icon: Icon; value: string}) {
  return (
    <Box display="flex" alignItems="flex-start" gap={0.75}>
      <Icon size={20} />
      <Typography variant="subtitle1" fontWeight={300} component="p">
        {value}
      </Typography>
    </Box>
  );
}
