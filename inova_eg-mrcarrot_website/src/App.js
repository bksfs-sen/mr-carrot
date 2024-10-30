import "./App.css";

import { authenticationRoutes, routes, verifyRoutes } from "./routes";

import { I18nextProvider } from "react-i18next";
import Layout from "./Components/Organisms/Layout/Layout";
import i18n from "./i18n";
import setAuthToken, { setLanguage } from "./Services/utils/HandelApi";
import { useAuth } from "./Hooks/useAuth";
import { Route, useRoutes } from "react-router";
import VerificationPage from "./Components/Pages/Verificationpage/Verification.page";
import { useEffect } from "react";
import axios from "axios";
// let Moyasar;

function App() {
  const { auth } = useAuth();
  let language = localStorage.getItem("i18nextLng");
  const appRoutes = useRoutes(routes);
  const authRoutes = useRoutes(authenticationRoutes);
  const verify = useRoutes(verifyRoutes);
  setAuthToken(localStorage.getItem("TOKEN"));
  setLanguage(language);
  return (
    <I18nextProvider i18n={i18n}>
      {verify}
      {window.location.pathname !== "/verify" &&
        (auth ? (
          <>
            {/* <Route path="/verify" element={<VerificationPage />} /> */}
            <Layout>{appRoutes}</Layout>
          </>
        ) : (
          authRoutes
        ))}
    </I18nextProvider>
  );
}

export default App;
