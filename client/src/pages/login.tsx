import { useAuth0 } from "@auth0/auth0-react";

export const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2
      style={{
        padding:"20px"
      }}>HEALTH CENTRE</h2>
      <button onClick={() => loginWithRedirect()}>Sign in</button>
      <p
      style={{
        padding:"20px"
      }}>
        NIIT UNIVERSITY
      </p>
    </div>
  );
};
