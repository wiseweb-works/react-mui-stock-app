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
        helperText={touched.username && errors.username} //validationda verdiğimiz kalıba uymazsa rengi errora çevirmesi için error attribute ı benden false/true degeri bekliyor ondan dolayı daha sağlıklı olması için boolean deger döndürüyoruz.
        // touched da kullanıcının inputa tıklayıp tıklamadığını yakalıyor
        onBlur={handleBlur} // kullanıcının input alanından ayrıldığını yaklayan event
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
        helperText={touched.password && errors.password} //validationda verdiğimiz kalıba uymazsa rengi errora çevirmesi için error attribute ı benden false/true degeri bekliyor ondan dolayı daha sağlıklı olması için boolean deger döndürüyoruz.
        // touched da kullanıcının inputa tıklayıp tıklamadığını yakalıyor
        onBlur={handleBlur} // kullanıcının input alanından ayrıldığını yaklayan event
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
