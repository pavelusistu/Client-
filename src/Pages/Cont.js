import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

const Cont = () => {
  const navigate = useNavigate();

  const delogareCont = async () => {
    const response = await fetch("/Delogare");
    if (response.ok) {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    } else {
      alert("Delogare esuata");
    }
  };

  return (
    <>
      <Grid container style={{ padding: "15px" }}>
        <Grid item xs={4}>
          <h1>Contul meu</h1>
          <p>Username: {localStorage.getItem("username")}</p>
          <p>Nume: {localStorage.getItem("nume")}</p>
          <p>Prenume: {localStorage.getItem("prenume")}</p>
          <p>Email: {localStorage.getItem("email")}</p>
        </Grid>
        <Grid item xs={8}>
          <Button
            style={{
              marginTop: "1rem",
              width: "30%",
              color: "crimson",
              borderColor: "crimson",
            }}
            variant="outlined"
            color="primary"
            href="/IstoricComenzi"
          >
            Comenzile mele
          </Button>
          <br />
          <Button
            style={{
              marginTop: "1rem",
              width: "30%",
              backgroundColor: "crimson",
            }}
            variant="contained"
            color="primary"
            onClick={delogareCont}
          >
            Delogare
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Cont;
