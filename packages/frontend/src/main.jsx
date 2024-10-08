import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Loader from "./components/common/loader.jsx";

import "./index.css";
import "./global.css";

import Routes from "./components/routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <RouterProvider router={Routes} />
      </Provider>
    </Suspense>
  </StrictMode>
);
