import React from "react";

import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes/Route";
import { ToastContainer } from "react-toastify";
import Loader from "./comp/loader/Loader";
import ContextProvider from "./Context";
import AuthRoute from "./AuthRoute";
import Login from "./pages/login/Login";

function App() {
  return (
    <>
      <div class="app">
        <BrowserRouter>
          <ContextProvider>
            <ToastContainer />

            <Routes>
              {routes.map((item, index) => (
                <Route
                  path={item.path}
                  element={
                    <AuthRoute>
                      <item.component />
                    </AuthRoute>
                  }
                  key={index}
                />
              ))}
              <Route path="/login" element={<Login/>} />
            </Routes>
          </ContextProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
