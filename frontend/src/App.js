import './App.css';
import React, { useState, useEffect } from "react";
import axiosInstance from "../src/axios";
import Application from './components/application/application.';

function App() {


  const [mounted, setMounted] = useState(false);
  const [productsList, setproductsList] = useState('');
  // if (!mounted) {

  //   axiosInstance.get('products/').then((res) => {
  //     setproductsList(res.data);
  //   }).catch((error) => {
  //     if (error.response?.status === 401) {
  //       console.log(error.response.data);
  //     }
  //     console.log(error.response);
  //   });
  // }

  // useEffect(() => {
  //   setMounted(true)
  // }, [])

  return (

    <div className="App">
      <div>
        <Application />
      </div> 
    </div>
  );
}

export default App;