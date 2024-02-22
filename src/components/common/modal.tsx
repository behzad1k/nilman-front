import {Modal as MUIModal, Backdrop, Fade, Box} from '@mui/material';

type Props = {
  open: boolean;
  setOpen: any
  children: React.ReactNode;
};

export function Modal({open, setOpen, children}: Props) {
  return (
    <MUIModal
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{backdrop: Backdrop}}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            maxWidth: '90vw',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {children}
        </Box>
      </Fade>
    </MUIModal>
  );
}
