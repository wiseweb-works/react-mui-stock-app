import { Grid2 } from '@mui/material/';

const AuthImage = ({ image }) => {
  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
      <img src={image} alt="img" style={{ width: 'auto', maxHeight: '80vh' }} />
    </Grid2>
  );
};

export default AuthImage;
