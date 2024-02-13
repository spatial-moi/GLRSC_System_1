import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store'
import { Provider } from 'react-redux'
import { ErrorBoundary} from "react-error-boundary";
import  Account  from './Account/Account'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
       <Provider store={store}>
           <ErrorBoundary FallbackComponent={Account}>
         <App></App>
           </ErrorBoundary>
        </Provider>

     </React.StrictMode>
);

// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
