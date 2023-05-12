import React from 'react';
import { Card } from 'antd';

function Welcome() {
  return (
    <Card
      className="welcome-card"
      style={{ 
        margin: "60px 0 0 150px",
        width: "80%",
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)"
      }}
    >
      <h1>WELCOME TO NU HEALTH CARE!</h1>
    </Card>
  )
}

export default Welcome;
