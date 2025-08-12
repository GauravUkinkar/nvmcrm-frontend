import React from "react";

import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes/Route";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div class="app">
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            {routes.map((item, index) => (
              <Route
                path={item.path}
                element={<item.component />}
                key={index}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
