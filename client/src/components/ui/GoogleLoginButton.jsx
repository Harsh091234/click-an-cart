import React from 'react'
import { useGoogleLogin } from "@react-oauth/google";
import { useUserStore } from '../../store/useUserStore'

const GoogleLoginButton = ({styles}) => {
    const { googleLogin,} = useUserStore();
     const loginWithGoogle = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      if (credentialResponse?.access_token) {
        // Send access_token to backend

        const success = await googleLogin(credentialResponse.access_token);

        if (success) {
          if (success.isVerified === false) navigate("/verify-email");
          else navigate("/");
        }
      }
    },
    onError: () => {
      console.error("Google Login Failed");
    },
  });

  return (
    <button
            onClick={loginWithGoogle}
           className={styles}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-4 w-4"
            />
            Login with Google
          </button>
  )
}

export default GoogleLoginButton