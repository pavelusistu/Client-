import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Logare = () => {
  const [username, setUsername] = useState("");
  const [parola, setParola] = useState("");
  const navigate = useNavigate();

  const logareUtilizator = async (e) => {
    e.preventDefault();

    try {
      const body = { username, parola };

      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.loggedIn) {
        localStorage.setItem("utilizator", JSON.stringify(data.utilizator));
        localStorage.setItem("username", username);
        navigate("/");
        alert(`Te-ai logat cu username-ul de ${username}`);
        window.location.reload();
      } else {
        alert(data.status);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const myStyle = {
    borderRadius: "5px",
    borderWidth: "1px",
    marginBottom: "10px",
  };

  return (
    <>
      <Header />
      <form onSubmit={logareUtilizator} action="/login">
        <div
          style={{
            padding: "10px",
          }}
        >
          <h2>Login</h2>
          <label>Username</label>
          <br />
          <input
            style={myStyle}
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <br />
          <label>Parola</label>
          <br />
          <input
            style={myStyle}
            type="password"
            required
            value={parola}
            onChange={(e) => setParola(e.target.value)}
          ></input>
          <br />
          <Button
            style={{ backgroundColor: "lightblue", color: "black" }}
            type="submit"
            value="Login"
          >
            Login
          </Button>
          <p>
            Nu aveti inca un cont? <a href="/Inregistrare">Inregistrare</a>
          </p>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default Logare;
