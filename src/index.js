import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {BrowserRouter, Router, Route, Routes} from "react-router-dom";
import Categories from "./pages/Categories";
import Footer from "./components/Footer";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <Navbar />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/categories" element={<Categories />} />
              </Routes>
              <Footer/>
          </Provider>
      </BrowserRouter>
  </React.StrictMode>
);

