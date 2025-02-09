import { Button, TextField } from '@mui/material';

const RegisterForm = ({
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
        name="firstName"
        label="First Name"
        variant="outlined"
        fullWidth
        value={values.firstName}
        onChange={handleChange}
        error={touched.firstName && errors.firstName}
        helperText={touched.firstName && errors.firstName}
        onBlur={handleBlur}
        margin="normal"
      />
      <TextField
        name="lastName"
        label="Last Name"
        variant="outlined"
        fullWidth
        value={values.lastName}
        onChange={handleChange}
        error={touched.lastName && errors.lastName}
        helperText={touched.lastName && errors.lastName}
        onBlur={handleBlur}
        margin="normal"
      />
      <TextField
        name="email"
        label="E-Mail"
        variant="outlined"
        fullWidth
        value={values.email}
        onChange={handleChange}
        error={touched.email && errors.email}
        helperText={touched.email && errors.email}
        onBlur={handleBlur}
        margin="normal"
        type="email"
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

export default RegisterForm;
