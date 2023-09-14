import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Add from "./pages/Add";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./pages/Error";

function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={Error}>
        <BrowserRouter>
          <Routes>
            <Route path="/edit/:id" Component={Edit} />
            <Route path="/book/:id" Component={Detail} />
            <Route path="/add" Component={Add} />
            <Route path="/signin" Component={Signin} />
            <Route path="/" Component={Home} />
            <Route Component={NotFound} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
