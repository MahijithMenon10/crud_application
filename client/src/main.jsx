// Main.jsx is the entry point of the application. It renders the App component wrapped in a Provider component from react-redux.
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
