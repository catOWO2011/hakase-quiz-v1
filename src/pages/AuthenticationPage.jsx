import React from "react";
import { signInWithGooglePopup } from "../utils/firebase.utils";

export default function AuthenticationPage() {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  };
  return (
    <div>
      <button onClick={logGoogleUser}>
        Sign in with Google Popup
      </button>
    </div>
  );
};