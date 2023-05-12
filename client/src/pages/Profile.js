import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Card } from "antd";

function Profile() {
  const { user } = useAuth0();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Card style={{ width: 300 }}>
        <img src={user.picture} alt={user.name} />
        <h2 style={{ padding: "7px" }}>{user.name}</h2>
        <p>{user.email}</p>
      </Card>
    </div>
  );
}

export default Profile;

