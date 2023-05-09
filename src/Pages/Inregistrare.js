import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Button } from "@mui/material";
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
          localStorage.setItem("utilizator", JSON.stringify(data.utilizator));
          localStorage.setItem("username", username);
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
      <Header />
      <form onSubmit={onSubmitForm}>
        <div
          style={{
            padding: "10px",
          }}
        >
          <h2>Inregistrare</h2>
          <label>Username</label>
          <br />
          <input
            style={myStyle}
            type="text"
            required
            placeholder={"Pavel" + Math.floor(Math.random() * 10000)}
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <br />
          <label>Nume</label>
          <br />
          <input
            style={myStyle}
            type="text"
            required
            placeholder="Luca"
            pattern="[A-Z][a-z]+([-\.][A-Z][a-z]+)?"
            name="nume"
            value={nume}
            onChange={(e) => setNume(e.target.value)}
          ></input>
          <br />
          <label>Prenume</label>
          <br />
          <input
            style={myStyle}
            type="text"
            required
            placeholder="Pavel"
            pattern="[A-Z][a-z]+([-\.][A-Z][a-z]+)?"
            name="prenume"
            value={prenume}
            onChange={(e) => setPrenume(e.target.value)}
          ></input>
          <br />
          <label>Email</label>
          <br />
          <input
            style={myStyle}
            type="text"
            required
            placeholder="exemplu007@gmail.com"
            size="50"
            pattern="[A-Za-z0-9]+([-._A-Za-z0-9]+?)+@+[a-z]+.+[a-z]"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br />
          <label>Parola</label>
          <br />
          <input
            style={myStyle}
            type="password"
            required
            pattern="[A-Z]+[a-z]+[0-9]{3,}[.]"
            name="parola"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
          ></input>{" "}
          <br />
          <label>Reintroduceti parola</label>
          <br />
          <input
            style={myStyle}
            type="password"
            required
            name="rparola"
            value={rparola}
            onChange={(e) => setRparola(e.target.value)}
          ></input>
          <br />
          <p>
            Parola trebuie sa respecte formatul "Aa123." (Minim o litera mare, o
            litera mica, 3 cifre si caracterul punct)
          </p>
          <Button
            style={{ backgroundColor: "lightblue", color: "black" }}
            type="submit"
          >
            Inregistrare
          </Button>
          <p>
            Aveti deja un cont? <a href="/Logare">Logare</a>
          </p>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default Inregistrare;
