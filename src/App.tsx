// import { useState } from 'react'

import './App.css'
import ToDoWrapper from './components/ToDoWrapper'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import './App.css'

function App() {
  

  return (
    <>
    <div className="App">
      <ToDoWrapper />
      <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      toastStyle={{
        background: "#283cd2",
        color: "#fff",
        fontSize: "20px",
        marginTop: "50px",
        border: "1px solid black", 
        boxShadow: "0 4px 5px rgba(0, 0, 0, 0.2)",
        
      }}
      />


    </div>

    </>
  )
}

export default App
