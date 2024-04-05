import Head from 'next/head';
import { Providers } from '../../lib/providers';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useNProgress } from '../hooks/use-nprogress';
import { createTheme } from '../theme';
import { createEmotionCache } from '../utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import { AuthReduxProvider, AuthReduxConsumer } from '../contexts/AuthReduxContext';
import Spinner from '../components/Spinner/Spinner';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => <Spinner/>;

const App = (props: any) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  console.log("Start render App");
  useNProgress();

  const getLayout = Component.getLayout ?? ((page: JSX.Element) => {
    console.log("Page =", page);
    return page;
  });

  const theme = createTheme();
  
  return (
    <Providers>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>
            Dashboard
          </title>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width"
          />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthReduxProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AuthReduxConsumer>
                {(auth: any) => {
                  console.log("test auth");
                  if (auth.isAuthorizedStatus == 3) {
                    return <SplashScreen />;
                  }

                  const v = getLayout(<Component {...pageProps} />);
                  return v;
                }}
              </AuthReduxConsumer>
            </ThemeProvider>
          </AuthReduxProvider>
        </LocalizationProvider>
      </CacheProvider>
    </Providers>
  );
};

export default App;

/*
 return (
    <Providers>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>
            Dashboard
          </title>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width"
          />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthReduxProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AuthReduxConsumer>
                {(auth: any) => {
                  console.log("test auth");
                  if (auth.isAuthorizedStatus == 3) {
                    return <SplashScreen />;
                  }

                  const v = getLayout(<Component {...pageProps} />);
                  return v;
                }}
              </AuthReduxConsumer>
            </ThemeProvider>
          </AuthReduxProvider>
        </LocalizationProvider>
      </CacheProvider>
    </Providers>
  );
*/
