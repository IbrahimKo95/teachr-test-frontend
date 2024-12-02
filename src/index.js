import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import {Provider} from "react-redux";
import {store} from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <Navbar />
          <Home />
      </Provider>
  </React.StrictMode>
);

