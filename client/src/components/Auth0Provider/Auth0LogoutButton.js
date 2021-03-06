import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Auth0LogoutButton = () => {
  const { logout } = useAuth0();

  return <button className="Auth0Button myButton" onClick={() => logout()}>Log Out</button>;
};

export default Auth0LogoutButton;