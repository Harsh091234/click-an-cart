// GoogleProviderWrapper.jsx
import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useUserStore } from "../../../client/src/store/useUserStore";

export default function GoogleProviderWrapper({ children }) {
 

  

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
}
