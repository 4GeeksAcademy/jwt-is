import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Private from "./pages/Private.jsx";
import Demo from "./pages/Demo.jsx";
import Single from "./pages/Single.jsx";
import { BackendURL } from './components/BackendURL';

import { StoreProvider } from "./hooks/useGlobalReducer.jsx";

const Main = () => {

  if (! import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL == "") return (
    <React.StrictMode>
      <BackendURL />
    </React.StrictMode>
  );
  return (
    <React.StrictMode>
      {/* Provide global state to all components */}
      <StoreProvider>
        {/* Set up routing for the application */}
        <RouterProvider router={router}>
        </RouterProvider>
      </StoreProvider>
    </React.StrictMode>
  );
}

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="private" element={<Private />} />
          <Route path="demo" element={<Demo />} />
          <Route path="single/:id" element={<Single />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider>
    <MainRoutes />
  </StoreProvider>
);
