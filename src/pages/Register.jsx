import LockIcon from '@mui/icons-material/Lock';
import image from '../assets/regi.avif';
import { Link, useNavigate } from 'react-router';
import { Box, Typography, Avatar, Grid2 } from '@mui/material';
import AuthHeader from '../components/AuthHeader';
import AuthImage from '../components/AuthImage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import RegisterForm from '../components/RegisterForm';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/reducer/authReducer';
import { useSelector } from 'react-redux';

const Register = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, 'Kullanıcı adı 5 karakterden küçük olamaz')
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
    email: Yup.string().email('Invalid email').required('Bu alan zorunludur'),
    password: Yup.string()
      .min(8, 'Password 8 kararkterden az olamaz')
      .matches(/[a-z]/, 'Şifre küçük harf içermelidir')
      .matches(/[A-Z]/, 'Şifre büyük harf içermelidir')
      .matches(/\d+/, 'Şifre sayısal karakter içermelidir.')
      .matches(/[@$?!%&*_-]+/, 'Özel karakter içermelidir(@$?!%&*_-)'),
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

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

          {/* /* -------------------------------------------------------------------------- */}
          {/* FORMİK YAPISI */}
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
          {/* /* -------------------------------------------------------------------------- */}

          <Box sx={{ textAlign: 'center', mt: 2, color: 'secondary.main' }}>
            <Link to="/">Already have an account? Sign in</Link>
          </Box>
        </Grid2>
        <AuthImage image={image} />
      </Grid2>
    </div>
  );
};

export default Register;
