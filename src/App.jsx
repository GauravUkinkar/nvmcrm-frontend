import React from "react";

import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes/Route";

function App() {
  return (
    <>
      <div class="app">
        <BrowserRouter>
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
