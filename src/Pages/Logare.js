import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Logare = () => {
  const [username, setUsername] = useState("");
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const navigate = useNavigate();

  const logareUtilizator = async (e) => {
    try {
      e.preventDefault();
      const body = { username, nume, prenume, email, parola };

      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.loggedIn) {
        localStorage.setItem("utilizator", JSON.stringify(data.user));
        localStorage.setItem("username", username);
        localStorage.setItem("nume", data.user.nume);
        localStorage.setItem("prenume", data.user.prenume);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("rol", data.user.rol);
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
      <form onSubmit={logareUtilizator} action="/login">
        <div
          style={{
            padding: "15px",
          }}
        >
          <h2>Login</h2>
          {/* <input
            style={myStyle}
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input> */}

          <TextField
            type="text"
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />

          {/* <input
            style={myStyle}
            type="password"
            required
            value={parola}
            onChange={(e) => setParola(e.target.value)}
          ></input> */}
          <TextField
            type="password"
            label="Password"
            margin="normal"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
            required
          />

          <br />
          <Button
            style={{ backgroundColor: "crimson" }}
            variant="contained"
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
    </>
  );
};

export default Logare;
