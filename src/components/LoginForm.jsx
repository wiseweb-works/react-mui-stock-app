import { Button, TextField } from '@mui/material';

const LoginForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="username"
        label="Username"
        variant="outlined"
        fullWidth
        value={values.username}
        onChange={handleChange}
        error={touched.username && errors.username}
        helperText={touched.username && errors.username}
        onBlur={handleBlur}
        margin="normal"
      />
      <TextField
        name="password"
        label="Password"
        variant="outlined"
        fullWidth
        value={values.password}
        onChange={handleChange}
        error={touched.password && errors.password}
        helperText={touched.password && errors.password}
        onBlur={handleBlur}
        margin="normal"
        type="password"
      />
      <Button variant="contained" fullWidth type="submit">
        SUBMIT
      </Button>
    </form>
  );
};

export default LoginForm;
