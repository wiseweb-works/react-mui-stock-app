import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppRouter from './router/AppRouter';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#454F5B',
      },
      secondary: {
        main: '#454F5B',
        second: '#161C24',
      },
    },
  });
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
        <ToastContainer />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
