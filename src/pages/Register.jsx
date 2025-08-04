import LockIcon from '@mui/icons-material/Lock';
import image from '../assets/regi.avif';
import { Link, useNavigate } from 'react-router';
import { Box, Typography, Avatar, Grid } from '@mui/material';
import AuthHeader from '../components/AuthHeader';
import AuthImage from '../components/AuthImage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RegisterForm from '../components/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../redux/reducer/authReducer';
import { useEffect } from 'react';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, 'Username cannot be less than 5 characters')
      .max(50, 'Too Long!')
      .required('Required'),
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('This field is required'),
    password: Yup.string()
      .min(8, 'Password cannot be less than 8 characters')
      .matches(/[a-z]/, 'Password must contain lowercase letters')
      .matches(/[A-Z]/, 'Password must contain uppercase letters')
      .matches(/\d+/, 'The password must contain numeric characters.')
      .matches(/[@$?!%&*_-]+/, 'Must contain special characters (@$?!%&*_-)'),
  });

  useEffect(() => {
    if (user) {
      navigate('/');
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
              backgroundColor: 'secondary.light',
              m: 'auto',
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={2}
            color="secondary.light"
          >
            Register
          </Typography>
          <Formik
            initialValues={{
              username: '',
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              dispatch(createUser(values));
            }}
            component={(props) => <RegisterForm {...props} />}
          />
          <Box sx={{ textAlign: 'center', mt: 2, color: 'secondary.main' }}>
            <Link to="/">Already have an account? Sign in</Link>
          </Box>
        </Grid>
        <AuthImage image={image} />
      </Grid>
    </div>
  );
};

export default Register;
