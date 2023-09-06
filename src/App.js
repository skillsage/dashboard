import React from "react";
import { Route, Routes } from "react-router-dom";
import {Dashboard, Login} from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  );
};

export default App;
