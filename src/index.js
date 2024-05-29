import App from './App';
// style + assets
import './assets/scss/style.scss';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// third party
import { BrowserRouter } from 'react-router-dom';
// project imports
import * as serviceWorkerRegistration  from './serviceWorkerRegistration';
import { store } from './store';




// ==============================|| REACT DOM RENDER  ||============================== //
// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//     <Provider store={store}>
//     <BrowserRouter>
//     <App />
// </BrowserRouter>
// </Provider>
// )

 ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA 

  serviceWorkerRegistration.register();
