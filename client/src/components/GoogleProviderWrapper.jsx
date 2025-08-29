// GoogleProviderWrapper.jsx
import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useUserStore } from "../../../client/src/store/useUserStore";

export default function GoogleProviderWrapper({ children }) {
  const {clientId, setClientId} = useUserStore();

  useEffect(() => {
    setClientId();
  }, []);

  if (!clientId) {
    return <p>Loading Google OAuth...</p>; 
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
