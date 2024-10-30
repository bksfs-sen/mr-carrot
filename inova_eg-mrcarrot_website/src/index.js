import "./index.css";
import "./Assets/Fonts/AraHamah1964.otf";
import "./Assets/Fonts/AraHamahBold.ttf";
import "./Assets/Fonts/AraHamahSahet.ttf";
import "react-toastify/dist/ReactToastify.min.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import firebaseConfig from "./firebase";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import reportWebVitals from "./reportWebVitals";
import { store } from "./Services/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        {localStorage.getItem("language") === "ar" ? (
          <ToastContainer rtl position={toast.POSITION.TOP_RIGHT} />
        ) : (
          <ToastContainer
            // rtl
            position={toast.POSITION.TOP_RIGHT}
          />
        )}

        <App />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
