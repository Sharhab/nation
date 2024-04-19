import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer'; // Make sure this import is correct
import thunk from 'redux-thunk';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer, // Make sure this points to your combined or root reducer
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export { store };





// import { configureStore } from '@reduxjs/toolkit';
// import reducer from './reducer';
// import thunk from 'redux-thunk';

// // ==============================|| REDUX - MAIN STORE ||============================== //

// const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
//   devTools: process.env.NODE_ENV !== 'production',
// });

// const persister = 'Free';

// export { store, persister };
