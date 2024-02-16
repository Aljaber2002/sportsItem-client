import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store.ts";
import { RouterProvider } from "react-router-dom";
import Router from "./Routes/routes.tsx";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";

// import router from "./Routes/routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={Router}></RouterProvider>
      </PersistGate>
    </Provider>
    <Toaster position="top-center"></Toaster>
  </React.StrictMode>
);
