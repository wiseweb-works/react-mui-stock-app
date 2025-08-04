import Grid from "@mui/material/Grid";

const AuthImage = ({ image }) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
      <img src={image} alt="img" style={{ width: 'auto', maxHeight: '80vh' }} />
    </Grid>
  );
};

export default AuthImage;
