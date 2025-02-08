import { Box, CircularProgress } from '@mui/material';

const loadingPlaceholder = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress size="4rem" />
    </Box>
  );
};

export default loadingPlaceholder;
