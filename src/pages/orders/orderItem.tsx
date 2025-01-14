import { Box, Typography } from '@mui/material';
import { Icon } from '@phosphor-icons/react';

export default function OrderItem({
                                    Icon,
                                    value
                                  }: ) {
  return (
    <Box display="flex" alignItems="flex-start" gap={0.75}>
      <Icon size={20}/>
      <Typography variant="subtitle1" fontWeight={300} component="p">
        {value}
      </Typography>
    </Box>
  );
}
