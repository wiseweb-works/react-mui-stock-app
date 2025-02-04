import { Avatar, Grid2, Box, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import image from '../assets/hero.png';
import { Link, useNavigate } from 'react-router';
import AuthHeader from '../components/AuthHeader';
import AuthImage from '../components/AuthImage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LoginForm from '../components/LoginForm';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/reducer/authReducer';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, 'Kullanıcı adı 5 karakterden küçük olamaz')
      .max(50, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Password 8 kararkterden az değildir')
      .matches(/[a-z]/, 'Şifre küçük harf içerir')
      .matches(/[A-Z]/, 'Şifre büyük harf içerir')
      .matches(/\d+/, 'Şifre sayısal karakter içerir.')
      .matches(/[@$?!%&*_-]+/, 'Özel karakter içerir(@$?!%&*_-)'),
  });

  return (
    <div style={{ height: '100vh' }}>
      <AuthHeader />
      <Grid2
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        direction="row"
        sx={{
          p: 2,
        }}
      >
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Avatar
            sx={{
              backgroundColor: 'secondary.main',
              m: 'auto',
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography variant="h4" align="center" mb={4} color="secondary.main">
            SIGN IN
          </Typography>

          {/* /* -------------------------------------------------------------------------- */}
          {/* FORMİK YAPISI */}
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log(values);
              dispatch(loginUser(values));
            }}
            component={(props) => <LoginForm {...props} />}
          />
          {/* /* -------------------------------------------------------------------------- */}

          <Box sx={{ textAlign: 'center', mt: 2, color: 'secondary.main' }}>
            <Link to="/register">{`Don't have an account? Sign Up`}</Link>
          </Box>
        </Grid2>
        <AuthImage image={image} />
      </Grid2>
    </div>
  );
};

export default Login;
