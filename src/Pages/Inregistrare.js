import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Inregistrare = () => {
  const [username, setUsername] = useState("");
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [rparola, setRparola] = useState("");
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { username, nume, prenume, email, parola };
      if (parola === rparola) {
        const response = await fetch("http://localhost:5000/Inregistrare", {
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
      } else {
        alert("Parolele introduse trebuie sa fie identice");
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
      <form onSubmit={onSubmitForm}>
        <div
          style={{
            padding: "15px",
          }}
        >
          <h2>Inregistrare</h2>
          {/* <input
            style={myStyle}
            type="text"
            required
            placeholder={"Pavel" + Math.floor(Math.random() * 10000)}
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input> */}
          <TextField
            type="text"
            id="username"
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          {/* <input
            style={myStyle}
            type="text"
            required
            placeholder="Luca"
            pattern="[A-Z][a-z]+([-\.][A-Z][a-z]+)?"
            name="nume"
            value={nume}
            onChange={(e) => setNume(e.target.value)}
          ></input> */}
          <TextField
            type="text"
            id="nume"
            label="Nume"
            margin="normal"
            pattern="[A-Z][a-z]+([-\.][A-Z][a-z]+)?"
            value={nume}
            onChange={(e) => setNume(e.target.value)}
            required
          />
          <br />
          {/* <input
            style={myStyle}
            type="text"
            required
            placeholder="Pavel"
            pattern="[A-Z][a-z]+([-\.][A-Z][a-z]+)?"
            name="prenume"
            value={prenume}
            onChange={(e) => setPrenume(e.target.value)}
          ></input> */}
          <TextField
            type="text"
            id="prenume"
            label="Prenume"
            margin="normal"
            pattern="[A-Z][a-z]+([-\.][A-Z][a-z]+)?"
            value={prenume}
            onChange={(e) => setPrenume(e.target.value)}
            required
          />
          <br />
          {/* <input
            style={myStyle}
            type="text"
            required
            placeholder="exemplu007@gmail.com"
            size="50"
            pattern="[A-Za-z0-9]+([-._A-Za-z0-9]+?)+@+[a-z]+.+[a-z]"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input> */}
          <TextField
            type="text"
            id="email"
            label="Email"
            margin="normal"
            pattern="[A-Z][a-z]+([-\.][A-Z][a-z]+)?"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          {/* <input
            style={myStyle}
            type="password"
            required
            pattern="[A-Z]+[a-z]+[0-9]{3,}[.]"
            name="parola"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
          ></input>{" "} */}
          <TextField
            type="password"
            id="parola"
            label="Parola"
            margin="normal"
            pattern="[A-Z][a-z]+([-\.][A-Z][a-z]+)?"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
            required
          />
          <br />
          {/* <input
            style={myStyle}
            type="password"
            required
            name="rparola"
            value={rparola}
            onChange={(e) => setRparola(e.target.value)}
          ></input> */}
          <TextField
            type="password"
            id="rparola"
            label="Reintroduceti parola"
            margin="normal"
            pattern="[A-Z][a-z]+([-\.][A-Z][a-z]+)?"
            value={rparola}
            onChange={(e) => setRparola(e.target.value)}
            required
          />
          <br />
          <p>
            Parola trebuie sa respecte formatul "Aa123." (Minim o litera mare, o
            litera mica, 3 cifre si caracterul punct)
          </p>
          <Button
            variant="contained"
            style={{ backgroundColor: "crimson" }}
            type="submit"
          >
            Inregistrare
          </Button>
          <p>
            Aveti deja un cont? <a href="/Logare">Logare</a>
          </p>
        </div>
      </form>
    </>
  );
};

export default Inregistrare;
