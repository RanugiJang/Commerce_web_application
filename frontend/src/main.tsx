import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")!).render( //Rendering the main App component wrapped with BrowserRouter for routing, AuthProvider for authentication context, and GoogleOAuthProvider for Google OAuth integration. The clientId for Google OAuth is provided as a prop to the GoogleOAuthProvider.
  <React.StrictMode>
  <GoogleOAuthProvider clientId= "76238837715-oatei54cjvrd8g1fqk9el3ffgq02djil.apps.googleusercontent.com" >
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode> 
);
