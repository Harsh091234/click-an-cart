// GoogleProviderWrapper.jsx
import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useUserStore } from "../../../client/src/store/useUserStore";

export default function GoogleProviderWrapper({ children }) {
  const {clientId, setClientId} = useUserStore();

  useEffect(() => {
    setClientId();
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}
