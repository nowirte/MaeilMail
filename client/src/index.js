import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from './styles/GlobalStyles';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_ID}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <React.StrictMode>
          <GlobalStyles />
          <App />
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
);
