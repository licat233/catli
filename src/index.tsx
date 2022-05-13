import React from 'react';
import ReactDOM from 'react-dom/client';
import Gallery from './gallery';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// const body = ReactDOM.createRoot(document.body as HTMLElement)
root.render(
  <React.StrictMode>
    <Gallery />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
