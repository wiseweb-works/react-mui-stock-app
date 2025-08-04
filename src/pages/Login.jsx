import { Avatar, Grid, Box, Typography } from '@mui/material';
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
  const { user } = useSelector((state) => state.auth);
  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, 'Username cannot be less than 5 characters')
      .max(50, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Password is not less than 8 characters')
      .matches(/[a-z]/, 'Password contains lowercase letters')
      .matches(/[A-Z]/, 'Password contains uppercase letters')
      .matches(/\d+/, 'The password contains numeric characters.')
      .matches(/[@$?!%&*_-]+/, 'Contains special character(@$?!%&*_-)'),
  });

  useEffect(() => {
    if (user) {
      navigate('/stock');
    }
  }, [user, navigate]);

  return (
    <div style={{ height: '100vh' }}>
      <AuthHeader />
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        direction="row"
        sx={{
          p: 2,
        }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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

          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              dispatch(loginUser(values));
            }}
            component={(props) => <LoginForm {...props} />}
          />

          <Box sx={{ textAlign: 'center', mt: 2, color: 'secondary.main' }}>
            <Link to="/register">{`Don't have an account? Sign Up`}</Link>
          </Box>
        </Grid>
        <AuthImage image={image} />
      </Grid>
    </div>
  );
};

export default Login;
