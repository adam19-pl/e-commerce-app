import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import Register from './components/register/register';
import Login from './components/login/login';
import Logout from './components/logout/logout';

const routing = (
  <Router>
    <React.StrictMode>
      <Routes>
        <Route exact path="*" element={<App />} />
        {/* <Route path="create" element={<CreateProject />} />
        </Route> */}

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </React.StrictMode>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();