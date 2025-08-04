import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const AuthHeader = () => {
  return (
    <Grid size={12} m={5}>
      <Typography variant="h3" color="primary" align="center">
        Stock Management App
      </Typography>
    </Grid>
  );
};

export default AuthHeader;
