import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Family from "../pages/Family";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="family" element={<Family />} />
        <Route path="family/:id" element={<Family />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
