import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useAuth2 } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useEffect } from 'react';
import { loginTelegram } from '../../../lib/User/User.thunks'
import {
  useDispatch,
  useSelector
} from '../../../lib/redux'
import { selectUserIsAuthorized, selectUserRequsetStatus } from '../../../lib/User/User.selector';

const Page = () => {
  const router = useRouter();
  const auth2 = useAuth2();
  
  console.log("Page LOGIN start");

  const [method, setMethod] = useState('email');
  const formik = useFormik({
    initialValues: {
      email: 'demo@devias.io',
      password: 'Password123!',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        //.email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signIn(values.email, values.password);
        router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const formikTelegram = useFormik({
    initialValues: {
      telegramUser: 'Sergei_Smogliuk',
      submit: null
    },
    validationSchema: Yup.object({
      telegramUser: Yup
        .string()
        .max(255)
        .required('Telegram user is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        auth2.loginTelegram(values.telegramUser);
        console.log("window.location.pathname = ",window.location.pathname);
        if(window.location.pathname != '/')
          router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  const handleSkip = useCallback(
    () => {
      auth.skip();
      console.log("window.location.pathname = ",window.location.pathname);
      router.push('/');
    },
    //[auth, router]
    [auth2.isAuthenticated, router]
  );
  
  useEffect(()=>{
    if(auth2.isAuthorized)
    {
      console.log("window.location.pathname = ",window.location.pathname);
      router.push('/');
    }
  },[auth2.isAuthorized])

  return (
    <>
      <Head>
        <title>
          Login | Dashboard
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Login
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Don&apos;t have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>
            <Tabs
              onChange={handleMethodChange}
              sx={{ mb: 3 }}
              value={method}
            >
              <Tab
                label="Email"
                value="email"
              />
              <Tab
                label="Telegram User"
                value="telegramUser"
              />
            </Tabs>
            {method === 'email' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText>
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={handleSkip}
                >
                  Skip authentication
                </Button>
                <Alert
                  color="primary"
                  severity="info"
                  sx={{ mt: 3 }}
                >
                  <div>
                    You can use <b>demo@devias.io</b> and password <b>Password123!</b>
                  </div>
                </Alert>
              </form>
            )}
            {method === 'telegramUser' && (
              <form
              noValidate
              onSubmit={formikTelegram.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formikTelegram.touched.telegramUser && formik.errors.telegramUser)}
                    fullWidth
                    helperText={formikTelegram.touched.telegramUser && formik.errors.telegramUser}
                    label="Telegram User"
                    name="telegramUser"
                    onBlur={formikTelegram.handleBlur}
                    onChange={formikTelegram.handleChange}
                    type="text"
                    value={formikTelegram.values.telegramUser}
                  />
                </Stack>
                <FormHelperText sx={{ mt: 1 }}>
                  Optionally you can skip.
                </FormHelperText>
                {formikTelegram.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formikTelegram.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={handleSkip}
                >
                  Skip authentication
                </Button>
                <Alert
                  color="primary"
                  severity="info"
                  sx={{ mt: 3 }}
                >
                  <div>
                    You can use <b>Sergei_Smogliuk</b>
                  </div>
                </Alert>
              </form>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
